import { useIsMobileDevice } from "@/hooks"
import { useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation } from "@/singleton"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
    sessionDb,
    SessionDbKey,
    SolanaTransactionType,
} from "@/modules/dexie"
import { useSingletonHook } from "@/singleton"
import { GRAPHQL_MUTATION_SEND_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION } from "@/singleton"
import { useAppSelector } from "@/redux"
import { ChainKey } from "@/modules/blockchain"
import { addErrorToast, addTxHashToast } from "@/modules/toast"
import { envConfig } from "@/env"

export const useMobileCallbacks = () => {
    const isMobileDevice = useIsMobileDevice()
    const searchParams = useSearchParams()
    const transactions = useAppSelector(
        (state) => state.walletReducer.solanaWallet.signedTransactions
    )

    const { swrMutation: buyEnergySolanaTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_SEND_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION)

    useEffect(() => {
        if (!isMobileDevice) return
        const action = searchParams.get("action")
        if (!action) return
        if (!transactions && !buyEnergySolanaTransactionSwrMutation) return
        const handleEffect = async () => {
            try {
                const data = await sessionDb.keyValueStore.get({
                    key: SessionDbKey.SolanaTransaction,
                })
                let txHash = ""
                switch (data?.value) {
                case SolanaTransactionType.BuyEnergy: {
                    if (!transactions) {
                        throw new Error("Transaction is not signed")
                    }

                    const { data } =
              await buyEnergySolanaTransactionSwrMutation.trigger({
                  request: {
                      serializedTx: transactions[0],
                  },
              })

                    if (!data) {
                        throw new Error("Failed to buy energy")
                    }

                    txHash = data.txHash
                    break
                }

                case SolanaTransactionType.BuyGolds:
                case SolanaTransactionType.ConvertMetaplexNFTs:
                case SolanaTransactionType.PurchaseSolanaNFTBoxes:
                case SolanaTransactionType.WrapMetaplexNFT:
                    // You can implement logic here in the future
                    break

                default:
                    console.warn("Unknown SolanaTransactionType:", data?.value)
                }

                addTxHashToast({
                    txHash,
                    chainKey: ChainKey.Solana,
                    network: envConfig().network,
                })
            } catch (error) {
                console.error("Error handling mobile callback:", error)
                addErrorToast({
                    errorMessage: "Failed to handle mobile callback",
                })
            } finally {
                await sessionDb.keyValueStore.delete(SessionDbKey.SolanaTransaction)
            }
        }

        handleEffect()
    }, [
        isMobileDevice,
        searchParams,
        transactions,
        buyEnergySolanaTransactionSwrMutation,
    ])
}
