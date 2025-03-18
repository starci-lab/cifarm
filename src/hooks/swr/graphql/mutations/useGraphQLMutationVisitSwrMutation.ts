import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationVisitParams,
    mutationVisit,
} from "@/modules/apollo"

export type UseGraphQLMutationVisitSwrMutationArgs = MutationVisitParams

export const useGraphQLMutationVisitSwrMutation =
  (): UseSWRMutation<void, UseGraphQLMutationVisitSwrMutationArgs> => {
      const swrMutation = useSWRMutation(v4(), async (
          _: string,
          extraArgs: { arg: UseGraphQLMutationVisitSwrMutationArgs }    
      ) => {
          const params = { ...extraArgs.arg }
          await mutationVisit(params)
      })
      
      return {
          swrMutation,
      }
  }
