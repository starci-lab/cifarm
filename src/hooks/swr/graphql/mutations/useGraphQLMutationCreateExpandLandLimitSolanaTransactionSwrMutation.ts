import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    CreateExpandLandLimitSolanaTransactionResponse,
    MutationCreateExpandLandLimitSolanaTransactionParams,
    mutationCreateExpandLandLimitSolanaTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreateExpandLandLimitSolanaTransactionMutationArgs =
  MutationCreateExpandLandLimitSolanaTransactionParams;

export const useGraphQLMutationCreateExpandLandLimitSolanaTransactionSwrMutation =
  (): UseSWRMutation<
    CreateExpandLandLimitSolanaTransactionResponse,
        UseGraphQLCreateExpandLandLimitSolanaTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreateExpandLandLimitSolanaTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreateExpandLandLimitSolanaTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create expand land limit solana transaction mutation"
                  )
              }
              return result.data.createExpandLandLimitSolanaTransaction
          }
      )

      return {
          swrMutation,
      }
  }
