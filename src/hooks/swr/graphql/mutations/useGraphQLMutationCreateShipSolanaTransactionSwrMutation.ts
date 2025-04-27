import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationCreateShipSolanaTransactionParams,
    CreateShipSolanaTransactionResponse,
    mutationCreateShipSolanaTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreateShipSolanaTransactionMutationArgs =
  MutationCreateShipSolanaTransactionParams;

export const useGraphQLMutationCreateShipSolanaTransactionSwrMutation =
  (): UseSWRMutation<
    CreateShipSolanaTransactionResponse,
    UseGraphQLCreateShipSolanaTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreateShipSolanaTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreateShipSolanaTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create ship solana transaction mutation"
                  )
              }
              return result.data.createShipSolanaTransaction
          }
      )

      return {
          swrMutation,
      }
  }
