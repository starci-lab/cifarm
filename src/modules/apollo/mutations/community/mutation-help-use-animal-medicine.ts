import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
  mutation HelpCureAnimal($request: HelpCureAnimalRequest!) {
    helpCureAnimal(request: $request)
  }
`

export enum MutationHelpUseAnimalMedicine {
  Mutation1 = "mutation1",
}

export interface HelpUseAnimalMedicineRequest {
  placedItemAnimalId: string;
}

const mutationMap: Record<MutationHelpUseAnimalMedicine, DocumentNode> = {
    [MutationHelpUseAnimalMedicine.Mutation1]: mutation1,
}

export type MutationHelpUseAnimalMedicineParams = MutationParams<
  MutationHelpUseAnimalMedicine,
  HelpUseAnimalMedicineRequest
>;

export const mutationHelpUseAnimalMedicine = async ({
    mutation = MutationHelpUseAnimalMedicine.Mutation1,
    request,
}: MutationHelpUseAnimalMedicineParams) => {
    if (!request) {
        throw new Error(
            "Request is required for help use animal medicine mutation"
        )
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { helpUseAnimalMedicine: null },
    MutationVariables<HelpUseAnimalMedicineRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
