import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    mutationSendWrapSolanaMetaplexNFTTransaction,
    MutationSendWrapSolanaMetaplexNFTTransactionParams,
    SendWrapSolanaMetaplexNFTTransactionResponse,
} from "@/modules/apollo"

export type UseGraphQLSendWrapSolanaMetaplexNFTTransactionMutationArgs =
  MutationSendWrapSolanaMetaplexNFTTransactionParams;

export const useGraphQLMutationSendWrapSolanaMetaplexNFTTransactionSwrMutation =
  (): UseSWRMutation<
    SendWrapSolanaMetaplexNFTTransactionResponse,
    UseGraphQLSendWrapSolanaMetaplexNFTTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLSendWrapSolanaMetaplexNFTTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationSendWrapSolanaMetaplexNFTTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from send wrap solana metaplex nft transaction mutation"
                  )
              }
              return result.data.sendWrapSolanaMetaplexNFTTransaction
          }
      )

      return {
          swrMutation,
      }
  }
