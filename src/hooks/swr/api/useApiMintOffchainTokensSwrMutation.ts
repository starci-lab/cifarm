import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import {
    mintOffchainTokens,
    MintOffchainTokensRequest,
    MintOffchainTokensResponse,
} from "@/modules/axios"
import { v4 } from "uuid"
import { WithAxiosOptionsAndRequest } from "./types"
import { AxiosResponse } from "axios"

export type UseApiMintOffchainTokensSwrMutationArgs = WithAxiosOptionsAndRequest<MintOffchainTokensRequest>

export const useApiMintOffchainTokensSwrMutation = (): UseSWRMutation<
  AxiosResponse<MintOffchainTokensResponse>,
  UseApiMintOffchainTokensSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiMintOffchainTokensSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            // mint offchain tokens
            return await mintOffchainTokens(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
