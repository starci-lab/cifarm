import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams } from "../../types"
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

export type MutationSpinParams = MutationParams<MutationSpin>

export const mutateSpin = async ({
    mutation = MutationSpin.Mutation1,
}: MutationSpinParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { spin: MutationSpinResponse }
  >({
      mutation: mutationDocument
  })
} 