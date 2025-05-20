import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationCreatePurchaseSolanaNFTBoxesTransactionParams,
    CreatePurchaseSolanaNFTBoxesTransactionResponse,
    mutationCreatePurchaseSolanaNFTBoxesTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreatePurchaseSolanaNFTBoxesTransactionMutationArgs =
  MutationCreatePurchaseSolanaNFTBoxesTransactionParams;

export const useGraphQLMutationCreatePurchaseSolanaNFTBoxesTransactionSwrMutation =
  (): UseSWRMutation<
    CreatePurchaseSolanaNFTBoxesTransactionResponse,
    UseGraphQLCreatePurchaseSolanaNFTBoxesTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreatePurchaseSolanaNFTBoxesTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreatePurchaseSolanaNFTBoxesTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create purchase solana nft boxes transaction mutation"
                  )
              }
              return result.data.createPurchaseSolanaNFTBoxesTransaction
          }
      )

      return {
          swrMutation,
      }
  }
