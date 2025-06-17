import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationSendPurchaseSolanaNFTBoxesTransactionParams,
    SendPurchaseSolanaNFTBoxesTransactionResponse,
    mutationSendPurchaseSolanaNFTBoxesTransaction,
} from "@/modules/apollo"

export type UseGraphQLSendPurchaseSolanaNFTBoxesTransactionMutationArgs =
  MutationSendPurchaseSolanaNFTBoxesTransactionParams;

export const useGraphQLMutationSendPurchaseSolanaNFTBoxesTransactionSwrMutation =
  (): UseSWRMutation<
    SendPurchaseSolanaNFTBoxesTransactionResponse,
    UseGraphQLSendPurchaseSolanaNFTBoxesTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLSendPurchaseSolanaNFTBoxesTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationSendPurchaseSolanaNFTBoxesTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from send purchase solana nft boxes transaction mutation"
                  )
              }
              return result.data.sendPurchaseSolanaNFTBoxesTransaction
          }
      )

      return {
          swrMutation,
      }
  }
