import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationUseHerbicideParams,
    mutationUseHerbicide,
} from "@/modules/apollo"

export type UseGraphQLMutationUseHerbicideSwrMutationArgs = MutationUseHerbicideParams

export const useGraphQLMutationUseHerbicideSwrMutation =
  (): UseSWRMutation<void, UseGraphQLMutationUseHerbicideSwrMutationArgs> => {
      const swrMutation = useSWRMutation(v4(), async (
          _: string,
          extraArgs: { arg: UseGraphQLMutationUseHerbicideSwrMutationArgs }    
      ) => {
          const params = { ...extraArgs.arg }
          await mutationUseHerbicide(params)
      })
      
      return {
          swrMutation,
      }
  }
