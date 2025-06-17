import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationSendExpandLandLimitSolanaTransactionParams,
    SendExpandLandLimitSolanaTransactionResponse,
    mutationSendExpandLandLimitSolanaTransaction,
} from "@/modules/apollo"

export type UseGraphQLSendExpandLandLimitSolanaTransactionMutationArgs =
  MutationSendExpandLandLimitSolanaTransactionParams;

export const useGraphQLMutationSendExpandLandLimitSolanaTransactionSwrMutation =
  (): UseSWRMutation<
    SendExpandLandLimitSolanaTransactionResponse,
    UseGraphQLSendExpandLandLimitSolanaTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLSendExpandLandLimitSolanaTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationSendExpandLandLimitSolanaTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from send expand land limit solana transaction mutation"
                  )
              }
              return result.data.sendExpandLandLimitSolanaTransaction
          }
      )

      return {
          swrMutation,
      }
  }
