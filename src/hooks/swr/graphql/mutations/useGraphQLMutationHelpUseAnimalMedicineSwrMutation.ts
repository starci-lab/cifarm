import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHelpUseAnimalMedicineParams, mutationHelpUseAnimalMedicine } from "@/modules/apollo"

export type UseGraphQLHelpUseAnimalMedicineMutationArgs = MutationHelpUseAnimalMedicineParams

export const useGraphQLMutationHelpUseAnimalMedicineSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLHelpUseAnimalMedicineMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHelpUseAnimalMedicineMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHelpUseAnimalMedicine(params)
        }
    )

    return {
        swrMutation,
    }
} 