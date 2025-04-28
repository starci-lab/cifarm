import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    CreateBuyGoldsSolanaTransactionResponse,
    MutationCreateBuyGoldsSolanaTransactionParams,
    mutationCreateBuyGoldsSolanaTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreateBuyGoldsSolanaTransactionMutationArgs =
  MutationCreateBuyGoldsSolanaTransactionParams;

export const useGraphQLMutationCreateBuyGoldsSolanaTransactionSwrMutation =
  (): UseSWRMutation<
    CreateBuyGoldsSolanaTransactionResponse,
        UseGraphQLCreateBuyGoldsSolanaTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreateBuyGoldsSolanaTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreateBuyGoldsSolanaTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create buy golds solana transaction mutation"
                  )
              }
              return result.data.createBuyGoldsSolanaTransaction
          }
      )

      return {
          swrMutation,
      }
  }
