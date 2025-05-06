import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import {
    GraphQLResponse,
    mutationValidateGoogleToken,
    MutationValidateGoogleTokenParams,
    ValidateGoogleTokenResponse,
} from "@/modules/apollo"

export type UseGraphQLMutationValidateGoogleTokenArgs =
  MutationValidateGoogleTokenParams;

export const useGraphQLMutationValidateGoogleTokenSwrMutation =
  (): UseSWRMutation<
    GraphQLResponse<ValidateGoogleTokenResponse>,
    UseGraphQLMutationValidateGoogleTokenArgs
  > => {
      const key: string = "VALIDATE_GOOGLE_TOKEN"
      const swrMutation = useSWRMutation(
          key,
          async (
              _,
              extraArgs: { arg: UseGraphQLMutationValidateGoogleTokenArgs }
          ) => {
              //first, we call the api to request the message
              const params = { ...extraArgs.arg }
              const result = await mutationValidateGoogleToken(params)
              if (!result.data) {
                  throw new Error(
                      result.errors?.[0]?.message || "Failed to validate google token"
                  )
              }
              return result.data.validateGoogleToken
          }
      )

      //return the state and the data
      return {
          swrMutation,
      }
  }
