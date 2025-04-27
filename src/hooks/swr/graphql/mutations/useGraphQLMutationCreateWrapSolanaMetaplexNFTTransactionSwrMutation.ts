import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationCreateWrapSolanaMetaplexNFTTransactionParams,
    CreateWrapSolanaMetaplexNFTTransactionResponse,
    mutationCreateWrapSolanaMetaplexNFTTransaction,
} from "@/modules/apollo"

export type UseGraphQLCreateWrapSolanaMetaplexNFTTransactionMutationArgs =
  MutationCreateWrapSolanaMetaplexNFTTransactionParams;

export const useGraphQLMutationCreateWrapSolanaMetaplexNFTTransactionSwrMutation =
  (): UseSWRMutation<
    CreateWrapSolanaMetaplexNFTTransactionResponse,
        UseGraphQLCreateWrapSolanaMetaplexNFTTransactionMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLCreateWrapSolanaMetaplexNFTTransactionMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationCreateWrapSolanaMetaplexNFTTransaction(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from create wrap solana metaplex nft transaction mutation"
                  )
              }
              return result.data.createWrapSolanaMetaplexNFTTransaction
          }
      )

      return {
          swrMutation,
      }
  }
