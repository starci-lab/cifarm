"use client"
import {
    BUY_GOLDS_MODAL_DISCLOSURE,
    GRAPHQL_MUTATION_CREATE_BUY_GOLDS_SOLANA_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_BUY_GOLDS_SOLANA_TRANSACTION_SWR_MUTATION,
    SIGN_TRANSACTION_MODAL_DISCLOSURE,
} from "@/singleton"
import { useSingletonHook } from "@/singleton"
import React, { FC, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    BuyCard,
    DialogBody,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { useGlobalAccountAddress, useIsMobileDevice } from "@/hooks"
import { addErrorToast } from "@/modules/toast"
import {
    useGraphQLMutationCreateBuyGoldsSolanaTransactionSwrMutation,
    useGraphQLMutationSendBuyGoldsSolanaTransactionSwrMutation,
} from "@/singleton"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import {
    setSignTransactionModalContent,
    TransactionType,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { formatNumber, NumberPattern } from "@/modules/common"
import { envConfig } from "@/env"
import { ChainKey } from "@/modules/blockchain"
import {
    sessionDb,
    SessionDbKey,
    SolanaTransactionType,
} from "@/modules/dexie"
export const BuyGoldsModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        BUY_GOLDS_MODAL_DISCLOSURE
    )
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const network = envConfig().network

    const iconMap: Record<number, string> = {
        0: assetIconMap[AssetIconId.Golds1].base.assetUrl,
        1: assetIconMap[AssetIconId.Golds2].base.assetUrl,
        2: assetIconMap[AssetIconId.Golds3].base.assetUrl,
    }

    const { swrMutation: createBuyGoldsSolanaTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationCreateBuyGoldsSolanaTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_CREATE_BUY_GOLDS_SOLANA_TRANSACTION_SWR_MUTATION)

    const { swrMutation: sendBuyGoldsSolanaTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendBuyGoldsSolanaTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_SEND_BUY_GOLDS_SOLANA_TRANSACTION_SWR_MUTATION)

    const { open: openSignTransactionModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SIGN_TRANSACTION_MODAL_DISCLOSURE)
    const dispatch = useAppDispatch()

    const { accountAddress } = useGlobalAccountAddress()

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>()
    const isMobileDevice = useIsMobileDevice()
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Buy Golds</DialogTitle>
                </DialogHeader>
                <DialogBody className="grid md:grid-cols-3 gap-2">
                    {staticData?.goldPurchases[network]?.options.map(
                        (goldPurchase, index) => {
                            if (!staticData?.tokens) return null
                            return (
                                <BuyCard
                                    key={index}
                                    title={`${formatNumber(
                                        goldPurchase.amount,
                                        NumberPattern.Second
                                    )}`}
                                    imageUrl={iconMap[index]}
                                    price={goldPurchase.price}
                                    tokenKey={goldPurchase.tokenKey}
                                    chainKey={ChainKey.Solana}
                                    network={network}
                                    tokens={staticData?.tokens}
                                    isLoading={
                                        selectedIndex === index &&
                    createBuyGoldsSolanaTransactionSwrMutation.isMutating
                                    }
                                    classNames={{
                                        container: "h-full",
                                    }}
                                    onClick={async () => {
                                        if (!accountAddress) {
                                            throw new Error("No account address")
                                        }
                                        setSelectedIndex(index)
                                        try {
                                            if (isMobileDevice) {
                                                await sessionDb.keyValueStore.add({
                                                    key: SessionDbKey.SolanaTransaction,
                                                    value: SolanaTransactionType.BuyGolds,
                                                })
                                            }
                                            const { data } =
                        await createBuyGoldsSolanaTransactionSwrMutation.trigger(
                            {
                                request: {
                                    selectionIndex: index,
                                    accountAddress,
                                },
                            }
                        )
                                           
                                            dispatch(
                                                setSignTransactionModalContent({
                                                    type: TransactionType.SolanaRawTx,
                                                    data: {
                                                        serializedTx: data?.serializedTx ?? "",
                                                    },
                                                    postActionHook: async (signedSerializedTx) => {
                                                        const { data } =
                              await sendBuyGoldsSolanaTransactionSwrMutation.trigger(
                                  {
                                      request: {
                                          serializedTx: Array.isArray(
                                              signedSerializedTx
                                          )
                                              ? signedSerializedTx[0]
                                              : signedSerializedTx,
                                      },
                                  }
                              )
                                                       
                                                        return data?.txHash ?? ""
                                                    },
                                                })
                                            )
                                            openSignTransactionModal()
                                        } catch (error) {
                                            addErrorToast({
                                                errorMessage: (error as Error).message,
                                            })
                                        } finally {
                                            setSelectedIndex(undefined)
                                        }
                                    }}
                                />
                            )
                        }
                    )}
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
