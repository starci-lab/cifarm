import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationValidateSolanaMetaplexNFTFrozenParams,
    ValidateSolanaMetaplexNFTFrozenResponse,
    mutationValidateSolanaMetaplexNFTFrozen,
} from "@/modules/apollo"

export type UseGraphQLValidateSolanaMetaplexNFTFrozenMutationArgs =
  MutationValidateSolanaMetaplexNFTFrozenParams;

export const useGraphQLMutationValidateSolanaMetaplexNFTFrozenSwrMutation =
  (): UseSWRMutation<
    ValidateSolanaMetaplexNFTFrozenResponse,
    UseGraphQLValidateSolanaMetaplexNFTFrozenMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLValidateSolanaMetaplexNFTFrozenMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationValidateSolanaMetaplexNFTFrozen(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from validate solana metaplex nft frozen mutation"
                  )
              }
              return result.data.validateSolanaMetaplexNFTFrozen
          }
      )

      return {
          swrMutation,
      }
  }
