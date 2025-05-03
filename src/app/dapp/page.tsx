"use client"
import { Container, Header, PaymentIcon, Spacer } from "@/components"
import React, { FC } from "react"
import { DAppCard } from "./DAppCard"
import { pathConstants } from "@/constants"
import {
    useGraphQLMutationCreatePurchaseSolanaNFTBoxTransactionSwrMutation,
    useGraphQLMutationSendPurchaseSolanaNFTBoxTransactionSwrMutation,
    useGraphQLQueryStaticSwr,
    useRouterWithSearchParams,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    setSignTransactionModal,
    TransactionType,
    useAppDispatch,
} from "@/redux"
import { useDisclosure } from "react-use-disclosure"
import {
    GRAPHQL_MUTATION_CREATE_PURCHASE_SOLANA_NFT_STARTER_BOX_TRANSACTION_SWR_MUTATION,
    QUERY_STATIC_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_PURCHASE_SOLANA_NFT_STARTER_BOX_TRANSACTION_SWR_MUTATION,
    SIGN_TRANSACTION_DISCLOSURE,
} from "../constants"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { PaymentKind } from "@/modules/entities"
const Page: FC = () => {
    const router = useRouterWithSearchParams()
    const { swrMutation: createPurchaseSolanaNFTBoxTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationCreatePurchaseSolanaNFTBoxTransactionSwrMutation
      >
    >(
        GRAPHQL_MUTATION_CREATE_PURCHASE_SOLANA_NFT_STARTER_BOX_TRANSACTION_SWR_MUTATION
    )

    const { swrMutation: sendPurchaseSolanaNFTBoxTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendPurchaseSolanaNFTBoxTransactionSwrMutation
      >
    >(
        GRAPHQL_MUTATION_SEND_PURCHASE_SOLANA_NFT_STARTER_BOX_TRANSACTION_SWR_MUTATION
    )

    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SIGN_TRANSACTION_DISCLOSURE
    )
    const dispatch = useAppDispatch()
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    return (
        <Container hasPadding>
            <div>
                <Header
                    title="DApps"
                    description="Discover and explore the best DApps on CiFarm"
                />
                <Spacer y={6} />
                <div className="flex flex-col gap-4">
                    <DAppCard
                        title="NFT Box"
                        isLoading={createPurchaseSolanaNFTBoxTransactionSwrMutation.isMutating}
                        description="Get your NFT Starter Box and begin collecting unique digital assets."
                        content={
                            <div className="flex items-center gap-1">
                                <PaymentIcon
                                    paymentKind={
                                        staticSwr.data?.data.nftBoxInfo.paymentKind ||
                    PaymentKind.Token
                                    }
                                    className="w-5 h-5"
                                />
                                <div className="text-sm">
                                    {staticSwr.data?.data.nftBoxInfo.boxPrice}
                                </div>
                            </div>
                        }
                        imageUrl={assetIconMap[AssetIconId.NFTBox].base.assetUrl}
                        onClick={async () => {
                            const { data } =
                await createPurchaseSolanaNFTBoxTransactionSwrMutation.trigger(
                    {}
                )
                            if (!data) throw new Error("Failed to purchase NFT Starter Box")
                            dispatch(
                                setSignTransactionModal({
                                    type: TransactionType.PurchaseSolanaNFTBox,
                                    data: {
                                        serializedTx: data.serializedTx,
                                    },
                                    postActionHook: async (signedTx: string) => {
                                        const { data } =
                      await sendPurchaseSolanaNFTBoxTransactionSwrMutation.trigger(
                          {
                              request: {
                                  serializedTx: signedTx,
                              },
                          }
                      )
                                        if (!data)
                                            throw new Error(
                                                "Failed to send purchase NFT Starter Box transaction"
                                            )
                                        return data.txHash
                                    },
                                })
                            )
                            open()
                        }}
                    />
                    <DAppCard
                        title="Wholesale Market"
                        description="Trade goods in bulk and earn tokens for each successful delivery."
                        imageUrl={assetIconMap[AssetIconId.WholesaleMarket].base.assetUrl}
                        onClick={() => router.push(pathConstants.dappWholesaleMarket)}
                    />
                </div>
            </div>
        </Container>
    )
}

export default Page
