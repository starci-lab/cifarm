import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationSendPurchaseSolanaNFTStarterBoxTransactionParams,
    SendPurchaseSolanaNFTStarterBoxTransactionResponse,
    mutationSendPurchaseSolanaNFTStarterBoxTransaction,
} from "@/modules/apollo"

export type UseGraphQLSendPurchaseSolanaNFTStarterBoxTransactionMutationArgs =
  MutationSendPurchaseSolanaNFTStarterBoxTransactionParams;

export const useGraphQLMutationSendPurchaseSolanaNFTStarterBoxTransactionSwrMutation =
  (): UseSWRMutation<
    SendPurchaseSolanaNFTStarterBoxTransactionResponse,
    UseGraphQLSendPurchaseSolanaNFTStarterBoxTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLSendPurchaseSolanaNFTStarterBoxTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationSendPurchaseSolanaNFTStarterBoxTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from send purchase solana nft starter box transaction mutation"
                  )
              }
              return result.data.sendPurchaseSolanaNFTStarterBoxTransaction
          }
      )

      return {
          swrMutation,
      }
  }
