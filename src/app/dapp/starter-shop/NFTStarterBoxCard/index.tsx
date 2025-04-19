import { PressableCard } from "@/components"
import React, { FC } from "react"
import { useGraphQLMutationPurchaseSolanaNFTStarterBoxSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_MUTATION_PURCHASE_SOLANA_NFT_STARTER_BOX_SWR_MUTATION, SIGN_TRANSACTION_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"
import { setSignTransactionModal, TransactionType, useAppDispatch } from "@/redux"

export const NFTStarterBoxCard: FC = () => {
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationPurchaseSolanaNFTStarterBoxSwrMutation>
  >(GRAPHQL_MUTATION_PURCHASE_SOLANA_NFT_STARTER_BOX_SWR_MUTATION)
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(SIGN_TRANSACTION_DISCLOSURE)
    const dispatch = useAppDispatch()
    return (
        <PressableCard
            className="flex flex-col gap-2"
            onClick={async () => {
                open()
                const { data } = await swrMutation.trigger({})
                if (!data) throw new Error("Failed to purchase NFT Starter Box")
                dispatch(setSignTransactionModal({
                    type: TransactionType.PurchaseSolanaNFTStarterBox,
                    data: {
                        serializedTx: data.serializedTx
                    }
                }))
            }}
        >
            <div className="font-bold">NFT Starter Box</div>
            <div className="text-xs text-muted-foreground">Buy and sell NFTs</div>
            <div className="flex items-center justify-between gap-2">0.1 USDC</div>
        </PressableCard>
    )
}
