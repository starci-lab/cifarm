import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z, ZodType } from "zod"
import { SIGN_TRANSACTION_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "@/hooks"
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
    // const { swrMutation } = useSingletonHook<
    //         ReturnType<typeof useGraphQLMutationMintOffchainTokensSwrMutation>
    //       >(GRAPHQL_MUTATION_MINT_OFFCHAIN_TOKENS_SWR_MUTATION)
    // const dispatch = useAppDispatch()
    const signTransactionDiscloresure = useSingletonHook<ReturnType<typeof useDisclosure>
    >(SIGN_TRANSACTION_DISCLOSURE)

    const onSubmit: SubmitHandler<MintOffchainTokensRhfInputs> = async () => {
        // check if transaction is exist
        // let tx: TxResponse
        // const transaction = await sessionDb.keyValueStore.get(SessionDbKey.HoneycombMintOffchainTokensTransaction)
        // if (!transaction) {
        //     const txResponse = await swrMutation.trigger({
        //         request: {
        //             amount: inputs.amount
        //         }
        //     })
        //     await sessionDb.keyValueStore.put({
        //         key: SessionDbKey.HoneycombDailyRewardTransaction,
        //         value: serialize(txResponse)
        //     })
        //     tx = txResponse
        // } else {
        //     tx = deserialize(transaction.value)
        // }
        // dispatch(setSignTransactionModal({
        //     serializedTx: tx.transaction,
        //     transactionFrom: TransactionType.Honeycomb,
        //     data: tx,
        //     extraAction: async () => {
        //         // remove the transaction
        //         await sessionDb.keyValueStore.delete(SessionDbKey.HoneycombMintOffchainTokensTransaction)
        //     }
        // }))
        // call the sign modal
        //fetch data
        signTransactionDiscloresure.onOpen()   
    }

    return {
        form,
        onSubmit,
    }
}