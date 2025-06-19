import { useIsMobileDevice } from "@/hooks"
import {
    useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation,
    useGraphQLMutationSendBuyGoldsSolanaTransactionSwrMutation,
    TRANSACTION_SUBMITTING_MOBILE_MODAL_DISCLOSURE,
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
                case SolanaTransactionType.ConvertMetaplexNFTs:
                case SolanaTransactionType.PurchaseSolanaNFTBoxes:
                case SolanaTransactionType.WrapMetaplexNFT:
                    // You can implement logic here in the future
                    break
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
