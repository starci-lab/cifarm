import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationCreateSignedUrlParams,
    mutationCreateSignedUrl,
    MutationCreateSignedUrlResponse,
    GraphQLResponse
} from "@/modules/apollo"

export type UseGraphQLCreateSignedUrlMutationArgs =
  MutationCreateSignedUrlParams;

export const useGraphQLMutationCreateSignedUrlSwrMutation = (): UseSWRMutation<
  GraphQLResponse<MutationCreateSignedUrlResponse>,
  UseGraphQLCreateSignedUrlMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLCreateSignedUrlMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            const result = await mutationCreateSignedUrl(params)
            if (!result.data) {
                throw new Error("No data returned from create signed url mutation")
            }
            return result.data.createSignedUrl
        }
    )

    return {
        swrMutation,
    }
}
