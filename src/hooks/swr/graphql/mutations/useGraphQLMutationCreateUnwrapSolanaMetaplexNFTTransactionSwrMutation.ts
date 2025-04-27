import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationCreateUnwrapSolanaMetaplexNFTTransactionParams,
    CreateUnwrapSolanaMetaplexNFTTransactionResponse,
    mutationCreateUnwrapSolanaMetaplexNFTTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreateUnwrapSolanaMetaplexNFTTransactionMutationArgs =
  MutationCreateUnwrapSolanaMetaplexNFTTransactionParams;

export const useGraphQLMutationCreateUnwrapSolanaMetaplexNFTTransactionSwrMutation =
  (): UseSWRMutation<
    CreateUnwrapSolanaMetaplexNFTTransactionResponse,
        UseGraphQLCreateUnwrapSolanaMetaplexNFTTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreateUnwrapSolanaMetaplexNFTTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreateUnwrapSolanaMetaplexNFTTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create unwrap solana metaplex nft transaction mutation"
                  )
              }
              return result.data.createUnwrapSolanaMetaplexNFTTransaction
          }
      )

      return {
          swrMutation,
      }
  }
