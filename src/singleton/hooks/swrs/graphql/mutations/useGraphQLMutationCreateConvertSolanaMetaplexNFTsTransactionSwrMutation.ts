import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    CreateConvertSolanaMetaplexNFTsTransactionResponse,
    MutationCreateConvertSolanaMetaplexNFTsTransactionParams,
    mutationCreateConvertSolanaMetaplexNFTsTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreateConvertSolanaMetaplexNFTsTransactionMutationArgs =
  MutationCreateConvertSolanaMetaplexNFTsTransactionParams;

export const useGraphQLMutationCreateConvertSolanaMetaplexNFTsTransactionSwrMutation =
  (): UseSWRMutation<
    CreateConvertSolanaMetaplexNFTsTransactionResponse,
    UseGraphQLCreateConvertSolanaMetaplexNFTsTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreateConvertSolanaMetaplexNFTsTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreateConvertSolanaMetaplexNFTsTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create convert solana metaplex nfts transaction mutation"
                  )
              }
              return result.data.createConvertSolanaMetaplexNFTsTransaction
          }
      )

      return {
          swrMutation,
      }
  }
