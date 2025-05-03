import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationCreatePurchaseSolanaNFTBoxTransactionParams,
    CreatePurchaseSolanaNFTBoxTransactionResponse,
    mutationCreatePurchaseSolanaNFTBoxTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreatePurchaseSolanaNFTBoxTransactionMutationArgs =
  MutationCreatePurchaseSolanaNFTBoxTransactionParams;

export const useGraphQLMutationCreatePurchaseSolanaNFTBoxTransactionSwrMutation =
  (): UseSWRMutation<
    CreatePurchaseSolanaNFTBoxTransactionResponse,
    UseGraphQLCreatePurchaseSolanaNFTBoxTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreatePurchaseSolanaNFTBoxTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreatePurchaseSolanaNFTBoxTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create purchase solana nft starter box transaction mutation"
                  )
              }
              return result.data.createPurchaseSolanaNFTBoxTransaction
          }
      )

      return {
          swrMutation,
      }
  }
