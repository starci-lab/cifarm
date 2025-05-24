import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    CreateBuyEnergySolanaTransactionResponse,
    MutationCreateBuyEnergySolanaTransactionParams,
    mutationCreateBuyEnergySolanaTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreateBuyEnergySolanaTransactionMutationArgs =
  MutationCreateBuyEnergySolanaTransactionParams;

export const useGraphQLMutationCreateBuyEnergySolanaTransactionSwrMutation =
  (): UseSWRMutation<
    CreateBuyEnergySolanaTransactionResponse,
    UseGraphQLCreateBuyEnergySolanaTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreateBuyEnergySolanaTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreateBuyEnergySolanaTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create buy energy solana transaction mutation"
                  )
              }
              return result.data.createBuyEnergySolanaTransaction
          }
      )

      return {
          swrMutation,
      }
  }
