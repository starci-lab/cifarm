import { useFormik } from "formik"
import * as Yup from "yup"
//import { useSingletonHook } from "@/singleton"
// import { sessionDb, SessionDbKey } from "@/modules/dexie"
// import { TxResponse } from "@/modules/honeycomb"
// import { deserialize } from "@/modules/serialization"
// import { serialize } from "@/modules/serialization"

export interface MintOffchainFormikValues {
    amount: number;
}

export const initialValues: MintOffchainFormikValues = {
    amount: 0
}

const validationSchema = Yup.object().shape({
    amount: Yup.number().required("Amount is required"),
})


export const useMintOffchainFormik = () => {
    // const { onOpenChange } = useSingletonHook<ReturnType<typeof useDisclosure>>(SIGN_TRANSACTION_DISCLOSURE)     
    // const { swrMutation } = useSingletonHook<
    //           ReturnType<typeof useGraphQLMutationMintOffchainTokensSwrMutation>
    //  >(GRAPHQL_MUTATION_MINT_OFFCHAIN_TOKENS_SWR_MUTATION)
    return useFormik({
        initialValues,
        validationSchema, // Pass Yup validation schema directly
        onSubmit: async (
            // { amount }
        ) => {
        //     //check if transaction is exist
        //     let tx: TxResponse
        //     const transaction = await sessionDb.keyValueStore.get(SessionDbKey.HoneycombMintOffchainTokensTransaction)
        //     if (!transaction) {
        //         const txResponse = await swrMutation.trigger({
        //             request: {
        //                 amount: amount
        //             }
        //         })
        //         await sessionDb.keyValueStore.put({
        //             key: SessionDbKey.HoneycombMintOffchainTokensTransaction,
        //             value: serialize(txResponse)
        //         })
        //         tx = txResponse
        //     } else {
        //         tx = deserialize(transaction.value)
        //     }
        //     // dispatch(setSignTransactionModal({
        //     //     type: TransactionType.TransferToken,
        //     //     data: tx,
        //     // }))
        //     // call the sign modal
        //     onOpenChange(true)
        // },
        }
    })
}
