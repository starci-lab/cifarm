import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    mutationSendShipSolanaTransaction,
    MutationSendShipSolanaTransactionParams,
    SendShipSolanaTransactionResponse,
} from "@/modules/apollo"

export type UseGraphQLSendShipSolanaTransactionMutationArgs =
  MutationSendShipSolanaTransactionParams;

export const useGraphQLMutationSendShipSolanaTransactionSwrMutation =
  (): UseSWRMutation<
    SendShipSolanaTransactionResponse,
    UseGraphQLSendShipSolanaTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLSendShipSolanaTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationSendShipSolanaTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from send ship solana transaction mutation"
                  )
              }
              return result.data.sendShipSolanaTransaction
          }
      )

      return {
          swrMutation,
      }
  }
