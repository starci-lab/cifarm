import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationMintOffchainTokensParams, mutationMintOffchainTokens, MintOffchainTokensResponse } from "@/modules/apollo"

export type UseGraphQLMintOffchainTokensMutationArgs = MutationMintOffchainTokensParams

export const useGraphQLMintOffchainTokensMutation = (): UseSWRMutation<
  MintOffchainTokensResponse,
  UseGraphQLMintOffchainTokensMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLMintOffchainTokensMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            const result = await mutationMintOffchainTokens(params)
            if (!result.data) {
                throw new Error("No data returned from mint offchain tokens mutation")
            }
            return result.data.mintOffchainTokens
        }
    )

    return {
        swrMutation,
    }
} 