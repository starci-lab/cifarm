import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationUsePesticideParams,
    mutationUsePesticide,
} from "@/modules/apollo"

export type UseGraphQLMutationUsePesticideSwrMutationArgs = MutationUsePesticideParams

export const useGraphQLMutationUsePesticideSwrMutation =
  (): UseSWRMutation<void, UseGraphQLMutationUsePesticideSwrMutationArgs> => {
      const swrMutation = useSWRMutation(v4(), async (
          _: string,
          extraArgs: { arg: UseGraphQLMutationUsePesticideSwrMutationArgs }    
      ) => {
          const params = { ...extraArgs.arg }
          await mutationUsePesticide(params)
      })
      
      return {
          swrMutation,
      }
  }
