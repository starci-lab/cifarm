"use client"
import { Badge, ExtendedButton, Header, Image, List, Spacer, Title } from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import React, { FC } from "react"
import { useGraphQLMutationFreezeSolanaMetaplexNFTSwrMutation } from "@/hooks"
import { MUTATION_GRAPHQL_FREEZE_SOLANA_METAPLEX_NFT_SWR_MUTATION, SIGN_TRANSACTION_DISCLOSURE } from "@/app/constants"
import { setSignTransactionModal, TransactionType } from "@/redux"
import { useDisclosure } from "react-use-disclosure"

const Page: FC = () => {
    const { wrapNFTData } = useAppSelector((state) => state.wrapReducer)
    const { swrMutation: freezeSolanaMetaplexNFTSwrMutation } = useSingletonHook<ReturnType<typeof useGraphQLMutationFreezeSolanaMetaplexNFTSwrMutation>>(
        MUTATION_GRAPHQL_FREEZE_SOLANA_METAPLEX_NFT_SWR_MUTATION
    )
    const dispatch = useAppDispatch()
    const { open: openSignTransactionModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(SIGN_TRANSACTION_DISCLOSURE)
    const collections = useAppSelector((state) => state.sessionReducer.nftCollections)
    return (
        <>
            <div>
                <Header title="Wrap" description="Wrap your NFT into in-game items" />
                <Spacer y={6} />
                <div className="w-full border rounded-lg p-2 max-w-[300px]">
                    <Image src={wrapNFTData?.imageUrl} alt={wrapNFTData?.name} className="w-full aspect-square object-contain" />
                </div>
                <Spacer y={4} />
                <div className="text-xl font-bold">{wrapNFTData?.name}</div>
                <Spacer y={4} />
                <Badge>
                Wrapped
                </Badge>
                <Spacer y={6} />
                <Title title="Traits" tooltipString="Traits are the attributes of the NFT" />
                <Spacer y={4} />
                <List enableScroll={false} items={wrapNFTData?.traits ?? []} contentCallback={(item) => {
                    return (
                        <div className="flex justify-between px-3 py-2">
                            <div>{item.key}</div>
                            <div>{item.value}</div>
                        </div>
                    )
                }} />
            </div>
            <div className="flex items-center gap-2">
                <ExtendedButton className="flex-1" variant="outline">
                    Unwrap
                </ExtendedButton>
                <ExtendedButton
                    className="flex-1"
                    isLoading={freezeSolanaMetaplexNFTSwrMutation.isMutating}
                    onClick={async () => {
                        if (!wrapNFTData?.nftAddress) {
                            throw new Error("NFT address is required")
                        }

                        const { data } = await freezeSolanaMetaplexNFTSwrMutation.trigger({
                            request: {
                                nftAddress: wrapNFTData?.nftAddress,
                                collectionAddress: collections[wrapNFTData?.collectionKey]?.collectionAddress
                            }
                        })
                        if (!data) {
                            throw new Error("No data returned from wrap solana metaplex mutation")
                        }
                        dispatch(setSignTransactionModal({
                            type: TransactionType.FreezeSolanaMetaplexNFT,
                            data: {
                                serializedTx: data.serializedTx
                            }
                        }))
                        openSignTransactionModal()
                    }}>
                    Wrap
                </ExtendedButton>
            </div>
        </>
    )
}

export default Page
