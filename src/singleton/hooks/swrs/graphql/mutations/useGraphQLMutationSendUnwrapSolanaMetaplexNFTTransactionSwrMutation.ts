import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationSendUnwrapSolanaMetaplexNFTTransactionParams,
    mutationSendUnwrapSolanaMetaplexNFTTransaction,
    SendUnwrapSolanaMetaplexNFTTransactionResponse,
} from "@/modules/apollo"

export type UseGraphQLSendUnwrapSolanaMetaplexNFTTransactionMutationArgs =
  MutationSendUnwrapSolanaMetaplexNFTTransactionParams;

export const useGraphQLMutationSendUnwrapSolanaMetaplexNFTTransactionSwrMutation =
  (): UseSWRMutation<
    SendUnwrapSolanaMetaplexNFTTransactionResponse,
    UseGraphQLSendUnwrapSolanaMetaplexNFTTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLSendUnwrapSolanaMetaplexNFTTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationSendUnwrapSolanaMetaplexNFTTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from send unwrap solana metaplex nft transaction mutation"
                  )
              }
              return result.data.sendUnwrapSolanaMetaplexNFTTransaction
          }
      )

      return {
          swrMutation,
      }
  }
