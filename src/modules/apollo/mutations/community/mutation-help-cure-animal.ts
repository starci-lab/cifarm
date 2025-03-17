import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HelpCureAnimal($request: HelpCureAnimalRequest!) {
        helpCureAnimal(request: $request)
    }
`

export enum MutationHelpCureAnimal {
    Mutation1 = "mutation1",
}

export interface HelpCureAnimalRequest {
    placedItemAnimalId: string
}

const mutationMap: Record<MutationHelpCureAnimal, DocumentNode> = {
    [MutationHelpCureAnimal.Mutation1]: mutation1,
}

export type MutationHelpCureAnimalParams = MutationParams<MutationHelpCureAnimal, HelpCureAnimalRequest>

export const mutationHelpCureAnimal = async ({
    mutation = MutationHelpCureAnimal.Mutation1,
    request
}: MutationHelpCureAnimalParams) => {
    if (!request) {
        throw new Error("Request is required for help cure animal mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { helpCureAnimal: null },
        MutationVariables<HelpCureAnimalRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 