import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import {
    GraphQLResponse,
    mutationRefresh,
    MutationRefreshResponse,
    MutationRefreshParams,
} from "@/modules/apollo"

export type UseGraphQLMutationRefreshArgs =
  MutationRefreshParams;

export const useGraphQLMutationRefreshSwrMutation =
  (): UseSWRMutation<
    GraphQLResponse<MutationRefreshResponse>,
    UseGraphQLMutationRefreshArgs
  > => {
      const key: string = "REFRESH"
      const swrMutation = useSWRMutation(
          key,
          async (
              _,
              extraArgs: { arg: UseGraphQLMutationRefreshArgs }
          ) => {
              //first, we call the api to request the message
              const params = { ...extraArgs.arg }
              const result = await mutationRefresh(params)
              if (!result.data) {
                  throw new Error(
                      result.errors?.[0]?.message || "Failed to refresh token"
                  )
              }
              return result.data.refresh
          }
      )

      //return the state and the data
      return {
          swrMutation,
      }
  }
