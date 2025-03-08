import { SessionDbKey, sessionDb } from "@/modules/dexie"
import { deserialize } from "@/modules/serialization"
import { setSignTransactionModal, TransactionFrom, useAppDispatch } from "@/redux"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z, ZodType } from "zod"
import { serialize } from "@/modules/serialization"
import { API_MINT_OFFCHAIN_TOKENS_SWR_MUTATION, SIGN_TRANSACTION_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "@heroui/react"
import { useApiMintOffchainTokensSwrMutation } from "../swr"
import { TxResponse } from "@/modules/honeycomb"

export interface MintOffchainTokensRhfInputs {
  amount: number
}

const Schema: ZodType<MintOffchainTokensRhfInputs> = z.object({
    amount: z.coerce
        .number()
        .int()
        .min(1, "Amount must be at least 1")
})

export const useMintOffchainTokensRhf = () => {
    const form = useForm<MintOffchainTokensRhfInputs>({
        resolver: zodResolver(Schema), 
    })
    const { swrMutation } = useSingletonHook<
            ReturnType<typeof useApiMintOffchainTokensSwrMutation>
          >(API_MINT_OFFCHAIN_TOKENS_SWR_MUTATION)
    const dispatch = useAppDispatch()
    const signTransactionDiscloresure = useSingletonHook<ReturnType<typeof useDisclosure>
    >(SIGN_TRANSACTION_DISCLOSURE)

    const onSubmit: SubmitHandler<MintOffchainTokensRhfInputs> = async (inputs) => {
        // check if transaction is exist
        let tx: TxResponse
        const transaction = await sessionDb.keyValueStore.get(SessionDbKey.HoneycombMintOffchainTokensTransaction)
        if (!transaction) {
            const { data } = await swrMutation.trigger({
                request: {
                    amount: inputs.amount
                }
            })
            await sessionDb.keyValueStore.put({
                key: SessionDbKey.HoneycombDailyRewardTransaction,
                value: serialize(data)
            })
            tx = data
        } else {
            tx = deserialize(transaction.value)
        }
        dispatch(setSignTransactionModal({
            serializedTx: tx.transaction,
            transactionFrom: TransactionFrom.Honeycomb,
            data: tx,
            extraAction: async () => {
                // remove the transaction
                await sessionDb.keyValueStore.delete(SessionDbKey.HoneycombMintOffchainTokensTransaction)
            }
        }))
        // call the sign modal
        //fetch data
        signTransactionDiscloresure.onOpen()   
    }

    return {
        form,
        onSubmit,
    }
}