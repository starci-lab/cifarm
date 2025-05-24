import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    SendConvertSolanaMetaplexNFTsTransactionResponse,
    MutationSendConvertSolanaMetaplexNFTsTransactionParams,
    mutationSendConvertSolanaMetaplexNFTsTransaction,
} from "@/modules/apollo"

export type UseGraphQLSendConvertSolanaMetaplexNFTsTransactionMutationArgs =
  MutationSendConvertSolanaMetaplexNFTsTransactionParams;

export const useGraphQLMutationSendConvertSolanaMetaplexNFTsTransactionSwrMutation =
  (): UseSWRMutation<
    SendConvertSolanaMetaplexNFTsTransactionResponse,
    UseGraphQLSendConvertSolanaMetaplexNFTsTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLSendConvertSolanaMetaplexNFTsTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationSendConvertSolanaMetaplexNFTsTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from send convert solana metaplex nfts transaction mutation"
                  )
              }
              return result.data.sendConvertSolanaMetaplexNFTsTransaction
          }
      )

      return {
          swrMutation,
      }
  }
