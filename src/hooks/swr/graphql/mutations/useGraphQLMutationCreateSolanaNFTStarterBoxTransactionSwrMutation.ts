import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationCreatePurchaseSolanaNFTStarterBoxTransactionParams,
    CreatePurchaseSolanaNFTStarterBoxTransactionResponse,
    mutationCreatePurchaseSolanaNFTStarterBoxTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreateSolanaNFTStarterBoxTransactionMutationArgs =
  MutationCreatePurchaseSolanaNFTStarterBoxTransactionParams;

export const useGraphQLMutationCreateSolanaNFTStarterBoxTransactionSwrMutation =
  (): UseSWRMutation<
    CreatePurchaseSolanaNFTStarterBoxTransactionResponse,
    UseGraphQLCreateSolanaNFTStarterBoxTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreateSolanaNFTStarterBoxTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreatePurchaseSolanaNFTStarterBoxTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create solana nft starter box transaction mutation"
                  )
              }
              return result.data.createPurchaseSolanaNFTStarterBoxTransaction
          }
      )

      return {
          swrMutation,
      }
  }
