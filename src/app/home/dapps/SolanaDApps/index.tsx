"use client"
import { PaymentIcon } from "@/components"
import React, { FC } from "react"
import { DAppCard } from "../DAppCard"
import { setNFTClaimedModal, setSignTransactionModal, TransactionType, useAppDispatch } from "@/redux"
import { GRAPHQL_MUTATION_CREATE_PURCHASE_SOLANA_NFT_STARTER_BOX_TRANSACTION_SWR_MUTATION, GRAPHQL_MUTATION_SEND_PURCHASE_SOLANA_NFT_STARTER_BOX_TRANSACTION_SWR_MUTATION, NFT_CLAIMED_DISCLOSURE, QUERY_STATIC_SWR_MUTATION, SIGN_TRANSACTION_DISCLOSURE, SHEET_WHOLSALE_MARKET_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLMutationCreatePurchaseSolanaNFTBoxTransactionSwrMutation, useGraphQLMutationSendPurchaseSolanaNFTBoxTransactionSwrMutation, useGraphQLQueryStaticSwr, useGlobalAccountAddress } from "@/hooks"
import { assetIconMap, AssetIconId } from "@/modules/assets"
import { useDisclosure } from "react-use-disclosure"
import { PaymentKind } from "@/modules/entities"

export const SolanaDApps: FC = () => {
    const { open: openWholesaleMarketSheet } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_WHOLSALE_MARKET_DISCLOSURE
    )
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

    const { open: openNFTClaimedModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        NFT_CLAIMED_DISCLOSURE
    )

    const { accountAddress } = useGlobalAccountAddress()
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DAppCard
                title="NFT Box"
                isLoading={createPurchaseSolanaNFTBoxTransactionSwrMutation.isMutating}
                description="Get your NFT Box and begin collecting unique digital assets."
                content={
                    <div className="flex items-center gap-1">
                        <PaymentIcon
                            paymentKind={
                                staticSwr.data?.data.nftBoxInfo.paymentKind ||
                    PaymentKind.Token
                            }
                            className="w-5 h-5"
                        />
                        <div className="text-primary">
                            {staticSwr.data?.data.nftBoxInfo.boxPrice}
                        </div>
                    </div>
                }
                imageUrl={assetIconMap[AssetIconId.NFTBox].base.assetUrl}
                onClick={async () => {
                    if (!accountAddress) {
                        throw new Error("Account address is required")
                    }
                    const { data } =
                await createPurchaseSolanaNFTBoxTransactionSwrMutation.trigger(
                    {
                        request: {
                            accountAddress,
                        }
                    }
                )
                    if (!data) throw new Error("Failed to purchase NFT Starter Box")
                    dispatch(
                        setSignTransactionModal({
                            type: TransactionType.SolanaRawTx,
                            data: {
                                serializedTx: data.serializedTx,
                            },
                            extraAction: async () => {
                                openNFTClaimedModal()
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
                                dispatch(
                                    setNFTClaimedModal({
                                        nftType: data.nftType,
                                        rarity: data.rarity,
                                        nftName: data.nftName,
                                    })
                                )
                                return data.txHash
                            },
                        })
                    )
                    open()
                }
                }
            />
            <DAppCard
                title="Wholesale Market"
                description="Trade goods in bulk and earn tokens for each successful delivery."
                imageUrl={assetIconMap[AssetIconId.WholesaleMarket].base.assetUrl}
                onClick={openWholesaleMarketSheet}
            />
            <DAppCard
                title="NFT Marketplace"
                description="Trade NFTs with other players."
                imageUrl={assetIconMap[AssetIconId.NFTMarketplace].base.assetUrl}
                onClick={() => {}}
                content={
                    <div className="text-primary">
                        Coming soon
                    </div>
                }
            />
            <DAppCard
                title="$CIFARM Staking"
                description="Stake $CIFARM to earn rewards."
                imageUrl={""}
                onClick={() => {}}
                content={
                    <div className="text-primary">
                        Coming soon
                    </div>
                }
            />
        </div>
    )
}