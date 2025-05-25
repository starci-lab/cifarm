import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationCreatePurchaseSuiNFTBoxesTransactionParams,
    CreatePurchaseSuiNFTBoxesTransactionResponse,
    mutationCreatePurchaseSuiNFTBoxesTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreatePurchaseSuiNFTBoxesTransactionMutationArgs =
  MutationCreatePurchaseSuiNFTBoxesTransactionParams;

export const useGraphQLMutationCreatePurchaseSuiNFTBoxesTransactionSwrMutation =
  (): UseSWRMutation<
    CreatePurchaseSuiNFTBoxesTransactionResponse,
    UseGraphQLCreatePurchaseSuiNFTBoxesTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreatePurchaseSuiNFTBoxesTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreatePurchaseSuiNFTBoxesTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create purchase sui nft boxes transaction mutation"
                  )
              }
              return result.data.createPurchaseSuiNFTBoxesTransaction
          }
      )

      return {
          swrMutation,
      }
  }
