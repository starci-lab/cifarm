import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationUseAnimalMedicineParams, mutationUseAnimalMedicine } from "@/modules/apollo"

export type UseGraphQLUseAnimalMedicineMutationArgs = MutationUseAnimalMedicineParams

export const useGraphQLMutationUseAnimalMedicineSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLUseAnimalMedicineMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLUseAnimalMedicineMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationUseAnimalMedicine(params)
        }
    )

    return {
        swrMutation,
    }
} 