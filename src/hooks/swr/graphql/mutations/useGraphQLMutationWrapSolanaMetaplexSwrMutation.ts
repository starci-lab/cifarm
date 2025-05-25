import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationWrapSolanaMetaplexNFTParams,
    mutationWrapSolanaMetaplexNFT,
    WrapSolanaMetaplexNFTResponse,
} from "@/modules/apollo"

export type UseGraphQLWrapSolanaMetaplexMutationArgs =
  MutationWrapSolanaMetaplexNFTParams;

export const useGraphQLMutationWrapSolanaMetaplexSwrMutation =
  (): UseSWRMutation<
    WrapSolanaMetaplexNFTResponse,
    UseGraphQLWrapSolanaMetaplexMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLWrapSolanaMetaplexMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationWrapSolanaMetaplexNFT(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from wrap solana metaplex mutation"
                  )
              }
              return result.data.wrapSolanaMetaplexNFT
          }
      )

      return {
          swrMutation,
      }
  }
