import { 
    toast,
    useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation, 
    useIsMobileDevice, 
} from "@/hooks"

import { FC, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { sessionDb, SessionDbKey, SolanaTransactionType } from "@/modules/dexie"
import { useSingletonHook } from "@/modules/singleton-hook"
import { 
    GRAPHQL_MUTATION_SEND_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION, 
} from "../constants"
import { useAppSelector } from "@/redux"
import { ChainKey } from "@/modules/blockchain"
import { addTxHashToast } from "../utils"
import { envConfig } from "@/env"

export const MobileCallbacks: FC = () => {
    const isMobileDevice = useIsMobileDevice()
    const searchParams = useSearchParams()
    const transaction = useAppSelector((state) => state.walletReducer[ChainKey.Solana].signedTransaction)
    const transactions = useAppSelector((state) => state.walletReducer[ChainKey.Solana].signedTransactions)
    
    const { swrMutation: buyEnergySolanaTransactionSwrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation>
    >(GRAPHQL_MUTATION_SEND_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION)

    useEffect(() => {
        if (!isMobileDevice) return
        const action = searchParams.get("action")
        if (!action) return
        if (!transaction && !buyEnergySolanaTransactionSwrMutation) return
        const handleEffect = async () => {
            try {
                const data = await sessionDb.keyValueStore.get({
                    key: SessionDbKey.SolanaTransaction,
                })
                let txHash = ""
                switch (data?.value) {
                case SolanaTransactionType.BuyEnergy: {
                    if (!transaction) {
                        throw new Error("Transaction is not signed")
                    }

                    const { data } = await buyEnergySolanaTransactionSwrMutation.trigger({
                        request: {
                            serializedTx: transaction,
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
                toast({
                    title: "Error",
                    description: "Failed to handle mobile callback",
                    variant: "destructive",
                })
            } finally {
                await sessionDb.keyValueStore.delete(SessionDbKey.SolanaTransaction)
            }
        }

        handleEffect()
    }, [isMobileDevice, searchParams, transaction, transactions, buyEnergySolanaTransactionSwrMutation])

    return null
}