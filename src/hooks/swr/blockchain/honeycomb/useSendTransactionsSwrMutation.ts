import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { sendTransactions } from "@honeycomb-protocol/edge-client/client/helpers"
import { edgeClient, TxResponses } from "@/modules/honeycomb"
import { useAppSelector } from "@/redux"
import { ChainKey } from "@/modules/blockchain"
import base58 from "bs58"
import { Keypair } from "@solana/web3.js"
import { TransactionBundleResponse } from "@honeycomb-protocol/edge-client"

export interface SendTransactionsParams {
    transactions: TxResponses
}

export const useHoneycombSendTransactionsSwrMutation = (): UseSWRMutation<
  Array<TransactionBundleResponse> | null,
  SendTransactionsParams
> => {
    const { accounts, activateAccountId } = useAppSelector((state) => state.sessionReducer.accounts)
    const account = accounts.find((account) => account.id === activateAccountId)
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey) 
    const network = useAppSelector((state) => state.sessionReducer.network)
    const swrMutation = useSWRMutation(
        JSON.stringify({ chainKey, account }),
        async (
            _: string,
            extraArgs: { arg: SendTransactionsParams }
        ) => {
            if (!account) return null
            if (chainKey !== ChainKey.Solana) return null
            const keypair = Keypair.fromSecretKey(base58.decode(account.privateKey))
            const { transactions } = { ...extraArgs.arg }
            console.log(keypair.publicKey.toBase58())
            //claim the daily reward
            return await sendTransactions(edgeClient(network), transactions, [keypair])
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
