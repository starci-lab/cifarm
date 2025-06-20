import { useIsMobileDevice } from "@/hooks"
import {
    useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation,
    useGraphQLMutationSendBuyGoldsSolanaTransactionSwrMutation,
    TRANSACTION_SUBMITTING_MOBILE_MODAL_DISCLOSURE,
    useGraphQLMutationSendExpandLandLimitSolanaTransactionSwrMutation,
    useGraphQLMutationSendPurchaseSolanaNFTBoxesTransactionSwrMutation,
    useGraphQLMutationSendWrapSolanaMetaplexNFTTransactionSwrMutation,
    GRAPHQL_MUTATION_SEND_WRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_UNWRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    useGraphQLMutationSendUnwrapSolanaMetaplexNFTTransactionSwrMutation,
    GRAPHQL_MUTATION_SEND_CONVERT_SOLANA_METAPLEX_NFTS_TRANSACTION_SWR_MUTATION,
    useGraphQLMutationSendConvertSolanaMetaplexNFTsTransactionSwrMutation,
    GRAPHQL_MUTATION_SEND_EXPAND_LAND_LIMIT_SOLANA_TRANSACTION_SWR_MUTATION,
} from "@/singleton"
import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import {
    sessionDb,
    SessionDbKey,
    SolanaTransactionType,
} from "@/modules/dexie"
import { useSingletonHook } from "@/singleton"
import {
    GRAPHQL_MUTATION_SEND_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_BUY_GOLDS_SOLANA_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_PURCHASE_SOLANA_NFT_BOXES_TRANSACTION_SWR_MUTATION,
} from "@/singleton"
import { setSolanaWallet, useAppDispatch, useAppSelector } from "@/redux"
import { ChainKey } from "@/modules/blockchain"
import { addErrorToast, addTxHashToast } from "@/components"
import { envConfig } from "@/env"
import { useDisclosure } from "react-use-disclosure"

export const useMobileCallbacks = () => {
    const isMobileDevice = useIsMobileDevice()
    const searchParams = useSearchParams()
    const signedTransactions = useAppSelector(
        (state) => state.walletReducer.solanaWallet.signedTransactions
    )
    const dispatch = useAppDispatch()
    const { swrMutation: buyEnergySolanaTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_SEND_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION)

    const { swrMutation: buyGoldsSolanaTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendBuyGoldsSolanaTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_SEND_BUY_GOLDS_SOLANA_TRANSACTION_SWR_MUTATION)

    const { swrMutation: sendExpandLandLimitSolanaTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendExpandLandLimitSolanaTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_SEND_EXPAND_LAND_LIMIT_SOLANA_TRANSACTION_SWR_MUTATION)

    const { swrMutation: sendPurchaseSolanaNftBoxesTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendPurchaseSolanaNFTBoxesTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_SEND_PURCHASE_SOLANA_NFT_BOXES_TRANSACTION_SWR_MUTATION)

    const { swrMutation: wrapMetaplexNftTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendWrapSolanaMetaplexNFTTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_SEND_WRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION)

    const { swrMutation: unwrapMetaplexNftTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendUnwrapSolanaMetaplexNFTTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_SEND_UNWRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION)

    const { swrMutation: sendConvertSolanaMetaplexNftTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendConvertSolanaMetaplexNFTsTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_SEND_CONVERT_SOLANA_METAPLEX_NFTS_TRANSACTION_SWR_MUTATION)

    const { open, close } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        TRANSACTION_SUBMITTING_MOBILE_MODAL_DISCLOSURE
    )
    //const router = useRouterWithSearchParams()
    // handle transaction submitting
    const doneRef = useRef(false)
    useEffect(() => {
        if (doneRef.current) return
        if (!isMobileDevice) return
        const action = searchParams.get("action")
        // reset the path param
        if (!action) return
        if (!signedTransactions?.length) return
        doneRef.current = true
        const handleEffect = async () => {
            open()
            //router.replace(window.location.pathname)
            try {
                const data = await sessionDb.keyValueStore.get({
                    key: SessionDbKey.SolanaTransaction,
                })
                let txHash = ""
                switch (data?.value) {
                case SolanaTransactionType.BuyEnergy: {
                    const serializedTx = signedTransactions.at(0) ?? ""
                    const { data } =
              await buyEnergySolanaTransactionSwrMutation.trigger({
                  request: {
                      serializedTx,
                  },
              })

                    txHash = data?.txHash ?? ""
                    break
                }
                case SolanaTransactionType.BuyGolds: {
                    const serializedTx = signedTransactions.at(0) ?? ""
                    const { data } = await buyGoldsSolanaTransactionSwrMutation.trigger(
                        {
                            request: {
                                serializedTx,
                            },
                        }
                    )
                    txHash = data?.txHash ?? ""
                    break
                }
                case SolanaTransactionType.ExpandLandLimit:
                {
                    const serializedTx = signedTransactions.at(0) ?? ""
                    const { data } = await sendExpandLandLimitSolanaTransactionSwrMutation.trigger(
                        {
                            request: {
                                serializedTx,
                            },
                        }
                    )
                    txHash = data?.txHash ?? ""
                    break
                }
                case SolanaTransactionType.PurchaseSolanaNFTBoxes:
                {
                    const { data } = await sendPurchaseSolanaNftBoxesTransactionSwrMutation.trigger(
                        {
                            request: {
                                serializedTxs: signedTransactions,
                            },
                        }
                    )
                    txHash = data?.txHash ?? ""
                    break
                }
                case SolanaTransactionType.WrapMetaplexNFT:
                {
                    const { data } = await wrapMetaplexNftTransactionSwrMutation.trigger(
                        {
                            request: {
                                serializedTx: signedTransactions.at(0) ?? "",
                            },
                        }
                    )
                    txHash = data?.txHash ?? ""
                    break
                }
                case SolanaTransactionType.UnwrapMetaplexNFT:
                {
                    const { data } = await unwrapMetaplexNftTransactionSwrMutation.trigger(
                        {
                            request: {
                                serializedTx: signedTransactions.at(0) ?? "",
                            },
                        }
                    )
                    txHash = data?.txHash ?? ""
                    break
                }
                case SolanaTransactionType.ConvertMetaplexNFTs:
                {
                    const { data } = await sendConvertSolanaMetaplexNftTransactionSwrMutation.trigger(
                        {
                            request: {
                                serializedTxs: signedTransactions,
                            },
                        }
                    )
                    txHash = data?.txHash ?? ""
                    break
                }
                // You can implement logic here in the future
                default:
                    throw new Error("Unknown SolanaTransactionType")
                }
                addTxHashToast({
                    txHash,
                    chainKey: ChainKey.Solana,
                    network: envConfig().network,
                })
            } catch (error) {
                console.error(error)
                addErrorToast({
                    errorMessage: "Failed to handle mobile callback: " + error,
                })
            } finally {
                close()
                await sessionDb.keyValueStore.delete(SessionDbKey.SolanaTransaction)
                dispatch(setSolanaWallet({
                    signedTransactions: [],
                }))
            }
        }
        handleEffect()
    }, [isMobileDevice, searchParams, signedTransactions])
}
