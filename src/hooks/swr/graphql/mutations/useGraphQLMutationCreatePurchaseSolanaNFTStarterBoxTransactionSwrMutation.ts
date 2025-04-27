import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationCreatePurchaseSolanaNFTStarterBoxTransactionParams,
    CreatePurchaseSolanaNFTStarterBoxTransactionResponse,
    mutationCreatePurchaseSolanaNFTStarterBoxTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreatePurchaseSolanaNFTStarterBoxTransactionMutationArgs =
  MutationCreatePurchaseSolanaNFTStarterBoxTransactionParams;

export const useGraphQLMutationCreatePurchaseSolanaNFTStarterBoxTransactionSwrMutation =
  (): UseSWRMutation<
    CreatePurchaseSolanaNFTStarterBoxTransactionResponse,
    UseGraphQLCreatePurchaseSolanaNFTStarterBoxTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreatePurchaseSolanaNFTStarterBoxTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreatePurchaseSolanaNFTStarterBoxTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create purchase solana nft starter box transaction mutation"
                  )
              }
              return result.data.createPurchaseSolanaNFTStarterBoxTransaction
          }
      )

      return {
          swrMutation,
      }
  }
