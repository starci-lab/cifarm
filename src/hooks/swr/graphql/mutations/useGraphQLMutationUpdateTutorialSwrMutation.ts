import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationUpdateTutorialParams,
    mutationUpdateTutorial,
} from "@/modules/apollo"

export type UseGraphQLMutationUpdateTutorialMutationArgs =
    MutationUpdateTutorialParams;

export const useGraphQLMutationUpdateTutorialSwrMutation =
  (): UseSWRMutation<void, UseGraphQLMutationUpdateTutorialMutationArgs> => {
      const swrMutation = useSWRMutation(v4(), async (
          _: string,
          extraArgs: { arg: UseGraphQLMutationUpdateTutorialMutationArgs }    
      ) => {
          const params = { ...extraArgs.arg }
          await mutationUpdateTutorial(params)
      })

      return {
          swrMutation,
      }
  }
