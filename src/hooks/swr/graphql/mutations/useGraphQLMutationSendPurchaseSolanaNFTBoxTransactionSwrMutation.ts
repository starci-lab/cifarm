import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationSendPurchaseSolanaNFTBoxTransactionParams,
    SendPurchaseSolanaNFTBoxTransactionResponse,
    mutationSendPurchaseSolanaNFTBoxTransaction,
} from "@/modules/apollo"

export type UseGraphQLSendPurchaseSolanaNFTBoxTransactionMutationArgs =
  MutationSendPurchaseSolanaNFTBoxTransactionParams;

export const useGraphQLMutationSendPurchaseSolanaNFTBoxTransactionSwrMutation =
  (): UseSWRMutation<
    SendPurchaseSolanaNFTBoxTransactionResponse,
    UseGraphQLSendPurchaseSolanaNFTBoxTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLSendPurchaseSolanaNFTBoxTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationSendPurchaseSolanaNFTBoxTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from send purchase solana nft starter box transaction mutation"
                  )
              }
              return result.data.sendPurchaseSolanaNFTBoxTransaction
          }
      )

      return {
          swrMutation,
      }
  }
