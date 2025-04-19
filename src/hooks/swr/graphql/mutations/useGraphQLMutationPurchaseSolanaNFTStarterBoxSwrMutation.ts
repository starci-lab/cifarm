import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationPurchaseSolanaNFTStarterBoxParams,
    PurchaseSolanaNFTStarterBoxResponse,
    mutationPurchaseSolanaNFTStarterBox,
} from "@/modules/apollo"

export type UseGraphQLPurchaseSolanaNFTStarterBoxMutationArgs =
  MutationPurchaseSolanaNFTStarterBoxParams;

export const useGraphQLMutationPurchaseSolanaNFTStarterBoxSwrMutation =
  (): UseSWRMutation<
    PurchaseSolanaNFTStarterBoxResponse,
    UseGraphQLPurchaseSolanaNFTStarterBoxMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLPurchaseSolanaNFTStarterBoxMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              const result = await mutationPurchaseSolanaNFTStarterBox(params)
              if (!result.data) {
                  throw new Error(
                      "No data returned from purchase solana nft starter box mutation"
                  )
              }
              return result.data.purchaseSolanaNFTStarterBox
          }
      )

      return {
          swrMutation,
      }
  }
