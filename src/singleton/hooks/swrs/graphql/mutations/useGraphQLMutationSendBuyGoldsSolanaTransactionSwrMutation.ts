import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationSendBuyGoldsSolanaTransactionParams,
    SendBuyGoldsSolanaTransactionResponse,
    mutationSendBuyGoldsSolanaTransaction,
} from "@/modules/apollo"

export type UseGraphQLSendBuyGoldsSolanaTransactionMutationArgs =
  MutationSendBuyGoldsSolanaTransactionParams;

export const useGraphQLMutationSendBuyGoldsSolanaTransactionSwrMutation =
  (): UseSWRMutation<
    SendBuyGoldsSolanaTransactionResponse,
    UseGraphQLSendBuyGoldsSolanaTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLSendBuyGoldsSolanaTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationSendBuyGoldsSolanaTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from send buy golds solana transaction mutation"
                  )
              }
              return result.data.sendBuyGoldsSolanaTransaction
          }
      )

      return {
          swrMutation,
      }
  }
