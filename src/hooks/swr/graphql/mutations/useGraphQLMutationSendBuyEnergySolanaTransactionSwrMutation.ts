import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationSendBuyEnergySolanaTransactionParams,
    SendBuyEnergySolanaTransactionResponse,
    mutationSendBuyEnergySolanaTransaction,
} from "@/modules/apollo"

export type UseGraphQLSendBuyEnergySolanaTransactionMutationArgs =
  MutationSendBuyEnergySolanaTransactionParams;

export const useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation =
  (): UseSWRMutation<
    SendBuyEnergySolanaTransactionResponse,
    UseGraphQLSendBuyEnergySolanaTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLSendBuyEnergySolanaTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationSendBuyEnergySolanaTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from send buy energy solana transaction mutation"
                  )
              }
              return result.data.sendBuyEnergySolanaTransaction
          }
      )

      return {
          swrMutation,
      }
  }
