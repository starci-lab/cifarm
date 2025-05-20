import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_MUTATION_CREATE_PURCHASE_SOLANA_NFT_BOXES_TRANSACTION_SWR_MUTATION, GRAPHQL_MUTATION_SEND_PURCHASE_SOLANA_NFT_BOXES_TRANSACTION_SWR_MUTATION, NFTS_CLAIMED_DISCLOSURE, SIGN_TRANSACTION_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"
import {
    setNFTsClaimedModal,
    setSignTransactionModal,
    TransactionType,
    useAppDispatch,
} from "@/redux"
import { useGlobalAccountAddress } from "../useGlobalAccountAddress"
import { useGraphQLMutationCreatePurchaseSolanaNFTBoxesTransactionSwrMutation, useGraphQLMutationSendPurchaseSolanaNFTBoxesTransactionSwrMutation } from "../swr/graphql/mutations"

export interface PurchaseNFTBoxesFormikValues {
    quantity: number
    balance: number
    price: number
}

export const usePurchaseNFTBoxesFormik = (): FormikProps<PurchaseNFTBoxesFormikValues> => {
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SIGN_TRANSACTION_DISCLOSURE
    )
    const dispatch = useAppDispatch()
    const { accountAddress } = useGlobalAccountAddress()

    const initialValues: PurchaseNFTBoxesFormikValues = {
        quantity: 1,
        price: 0,
        balance: 0,
    }

    const validationSchema = Yup.object({
        quantity: Yup.number()
            .required("Quantity is required")
            .min(1, "Quantity must be greater than 0")
            .test(
                "is-less-than-balance",
                "Insufficient balance",
                function (value) {
                    const { balance, price } = this.parent
                    return value * price <= balance
                }
            ),
        balance: Yup.number().min(0, "Balance cannot be negative"),
        price: Yup.number().min(0, "Price cannot be negative"),
    })
    
    const { swrMutation: createPurchaseSolanaNFTBoxesTransactionSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationCreatePurchaseSolanaNFTBoxesTransactionSwrMutation>
    >(GRAPHQL_MUTATION_CREATE_PURCHASE_SOLANA_NFT_BOXES_TRANSACTION_SWR_MUTATION)

    const { swrMutation: sendPurchaseSolanaNFTBoxesTransactionSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationSendPurchaseSolanaNFTBoxesTransactionSwrMutation>
    >(GRAPHQL_MUTATION_SEND_PURCHASE_SOLANA_NFT_BOXES_TRANSACTION_SWR_MUTATION)

    const { open: openNFTsClaimedModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        NFTS_CLAIMED_DISCLOSURE
    )
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async ({ quantity }) => {
            if (!accountAddress) {
                throw new Error("Account address is required")
            }

            const { data: createTxData } =
                await createPurchaseSolanaNFTBoxesTransactionSwrMutation.trigger({
                    request: {
                        accountAddress,
                        quantity,
                    },
                })

            if (!createTxData) {
                throw new Error("Failed to create NFT Starter Box transaction")
            }

            dispatch(
                setSignTransactionModal({
                    type: TransactionType.SolanaRawTxs,
                    data: {
                        serializedTxs: createTxData.serializedTxs,
                    },
                    extraAction: async () => {
                        open()
                    },
                    postActionHook: async (signedTxs: Array<string> | string) => {
                        const { data: sendTxData } =
                            await sendPurchaseSolanaNFTBoxesTransactionSwrMutation.trigger({
                                request: {
                                    serializedTxs: Array.isArray(signedTxs) ? signedTxs : [signedTxs],
                                },
                            })

                        if (!sendTxData) {
                            throw new Error(
                                "Failed to send NFT Starter Box transaction"
                            )
                        }

                        dispatch(
                            setNFTsClaimedModal({
                                nftItems: sendTxData.nftBoxes.map((nftBox) => ({
                                    nftType: nftBox.nftType,
                                    rarity: nftBox.rarity,
                                    nftName: nftBox.nftName,
                                })),
                            })
                        )
                        openNFTsClaimedModal()
                        return sendTxData.txHash
                    },
                })
            )

            open()
        },
    })

    return formik
}