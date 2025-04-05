import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationFreezeSolanaMetaplexNFTParams,
    FreezeSolanaMetaplexNFTResponse,
    mutationFreezeSolanaMetaplexNFT,
} from "@/modules/apollo"

export type UseGraphQLFreezeSolanaMetaplexMutationArgs =
  MutationFreezeSolanaMetaplexNFTParams;

export const useGraphQLMutationFreezeSolanaMetaplexNFTSwrMutation =
  (): UseSWRMutation<
    FreezeSolanaMetaplexNFTResponse,
    UseGraphQLFreezeSolanaMetaplexMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLFreezeSolanaMetaplexMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationFreezeSolanaMetaplexNFT(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from freeze solana metaplex mutation"
                  )
              }
              return result.data.freezeSolanaMetaplexNFT
          }
      )

      return {
          swrMutation,
      }
  }
