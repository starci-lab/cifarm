import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"

const mutation1 = gql`
  mutation Spin {
    spin {
      spinSlotId
    }
  }
`

export enum MutationSpin {
  Mutation1 = "mutation1",
}

export interface MutationSpinResponse {
  spinSlotId: string;
}

const mutationMap: Record<MutationSpin, DocumentNode> = {
    [MutationSpin.Mutation1]: mutation1,
}

export interface MutationSpinParams {
  query?: MutationSpin;
}

export const mutateSpin = async ({
    query = MutationSpin.Mutation1,
}: MutationSpinParams = {}) => {
    const mutationDocument = mutationMap[query]
    return await authClient.mutate<
    { spin: MutationSpinResponse }
  >({
      mutation: mutationDocument
  })
} 