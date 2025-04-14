"use client"

import {
    Container,
    Header,
    Image,
    PressableAction,
    NFTRarityBadge,
    Spacer,
    List,
    Title,
} from "@/components"
import {
    toast,
    useGraphQLMutationFreezeSolanaMetaplexNFTSwrMutation,
    useGraphQLMutationValidateSolanaMetaplexNFTFrozenSwrMutation,
    useTransferNFTFormik,
} from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import {
    setSignTransactionModal,
    setTransferTab,
    TransactionType,
    TransferTab,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import {
    SendHorizonalIcon,
    PackageIcon,
    PackageOpenIcon,
    WandSparklesIcon,
    EyeIcon,
    CircleCheckBigIcon,
} from "lucide-react"
import React, { FC } from "react"
import {
    MUTATION_GRAPHQL_FREEZE_SOLANA_METAPLEX_NFT_SWR_MUTATION,
    MUTATION_GRAPHQL_VALIDATE_SOLANA_METAPLEX_NFT_FROZEN_SWR_MUTATION,
    SIGN_TRANSACTION_DISCLOSURE,
    TRANSFER_NFT_FORMIK,
    TRANSFER_NFT_DISCLOSURE,
} from "../constants"
import { WrappedBadge } from "@/components"
import {
    NFTRarityEnum,
    AttributeName,
    explorerUrl,
    StatsAttributeName,
    statsAttributeNameMap,
} from "@/modules/blockchain"
import { useDisclosure } from "react-use-disclosure"

const Page: FC = () => {
    const collectionSwrs = useAppSelector(
        (state) => state.sessionReducer.nftCollectionsSwrs
    )
    const nftAddress = useAppSelector((state) => state.sessionReducer.nftAddress)
    const collectionKey = useAppSelector(
        (state) => state.sessionReducer.collectionKey
    )
    const collectionSwr = collectionSwrs[collectionKey]
    const nft = collectionSwr.data?.nfts.find(
        (nft) => nft.nftAddress === nftAddress
    )
    const dispatch = useAppDispatch()
    const network = useAppSelector((state) => state.sessionReducer.network)
    const formik =
    useSingletonHook2<ReturnType<typeof useTransferNFTFormik>>(
        TRANSFER_NFT_FORMIK
    )
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const collections = useAppSelector(
        (state) => state.sessionReducer.nftCollections
    )
    const { swrMutation: freezeSolanaMetaplexNFTSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationFreezeSolanaMetaplexNFTSwrMutation>
  >(MUTATION_GRAPHQL_FREEZE_SOLANA_METAPLEX_NFT_SWR_MUTATION)
    const { swrMutation: validateSolanaMetaplexNFTFrozenSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationValidateSolanaMetaplexNFTFrozenSwrMutation
      >
    >(MUTATION_GRAPHQL_VALIDATE_SOLANA_METAPLEX_NFT_FROZEN_SWR_MUTATION)
    const { open: openSignTransactionModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SIGN_TRANSACTION_DISCLOSURE)

    const { open: openTransferNFTModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(TRANSFER_NFT_DISCLOSURE)

    if (!nft) {
    // return skeleton
        return null
    }
    const rarity = nft.attributes.find(
        (attribute) => attribute.key === AttributeName.Rarity
    )?.value as NFTRarityEnum
    return (
        <Container hasPadding>
            <div className="h-full">
                <Header title={nft?.name ?? ""} />
                <Spacer y={6} />
                <div className="border rounded-md p-2 max-w-[300px]">
                    <Image
                        src={nft.imageUrl}
                        className="w-full aspect-square object-contain"
                    />
                </div>
                <Spacer y={4} />
                <div className="flex gap-2">
                    <NFTRarityBadge rarity={rarity} />
                    {nft.wrapped && <WrappedBadge />}
                </div>
                <Spacer y={4} />
                <div className="grid grid-cols-4 gap-2">
                    {nft.wrapped ? (
                        <PressableAction
                            icon={<PackageOpenIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            name="Unwrap"
                        />
                    ) : (
                        <PressableAction
                            icon={<PackageIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            isLoading={freezeSolanaMetaplexNFTSwrMutation.isMutating}
                            onClick={async () => {
                                if (!nft?.nftAddress) {
                                    throw new Error("NFT address is required")
                                }

                                const { data } =
                  await freezeSolanaMetaplexNFTSwrMutation.trigger({
                      request: {
                          nftAddress: nft.nftAddress,
                          collectionAddress:
                        collections[collectionKey]?.collectionAddress,
                      },
                  })
                                if (!data) {
                                    toast({
                                        title: "Error",
                                        description: "Failed to wrap NFT",
                                        variant: "destructive",
                                    })
                                    return
                                }
                                dispatch(
                                    setSignTransactionModal({
                                        type: TransactionType.FreezeSolanaMetaplexNFT,
                                        data: {
                                            serializedTx: data.serializedTx,
                                        },
                                    })
                                )
                                openSignTransactionModal()
                            }}
                            name="Wrap"
                        />
                    )}
                    <PressableAction
                        isLoading={validateSolanaMetaplexNFTFrozenSwrMutation.isMutating}
                        icon={<CircleCheckBigIcon className="w-5 h-5 min-w-5 min-h-5" />}
                        onClick={async () => {
                            const { data } =
                await validateSolanaMetaplexNFTFrozenSwrMutation.trigger({
                    request: {
                        nftAddress: nft.nftAddress,
                    },
                })
                            if (!data) {
                                throw new Error("Failed to verify NFT")
                            }
                            toast({
                                title: "Success",
                                description: "Validated successfully",
                            })
                        }}
                        name="Validate"
                    />
                    <PressableAction
                        disabled={nft.wrapped}
                        icon={<SendHorizonalIcon className="w-5 h-5 min-w-5 min-h-5" />}
                        onClick={() => {
                            dispatch(setTransferTab(TransferTab.NFT))
                            formik.setFieldValue("collectionKey", collectionKey)
                            formik.setFieldValue("nft", nft)
                            openTransferNFTModal()
                        }}
                        name="Transfer"
                    />
                    <PressableAction
                        icon={<WandSparklesIcon className="w-5 h-5 min-w-5 min-h-5" />}
                        onClick={() => {
                            console.log("Receive")
                        }}
                        name="Enchant"
                    />
                    <PressableAction
                        icon={<EyeIcon className="w-5 h-5 min-w-5 min-h-5" />}
                        onClick={() => {
                            window.open(
                                explorerUrl({
                                    type: "address",
                                    value: nftAddress,
                                    chainKey,
                                    network,
                                }),
                                "_blank"
                            )
                        }}
                        name="View"
                    />
                </div>
                <Spacer y={12} />
                <Title
                    title="Stats"
                    tooltipString="Stats are the attributes of the NFT. They are used to determine the rarity of the NFT."
                />
                <Spacer y={4} />
                <List
                    enableScroll={false}
                    items={Object.values(StatsAttributeName)}
                    contentCallback={(name) => {
                        const attribute = nft.attributes.find(
                            (attribute) => attribute.key === name
                        )
                        return (
                            <div className="px-3 py-2">
                                <div className="flex gap-2 items-center justify-between w-full">
                                    <Title
                                        title={statsAttributeNameMap[name].name}
                                        tooltipString={statsAttributeNameMap[name].tooltip}
                                        classNames={{
                                            title: "text-sm",
                                            tooltip: "w-[14px] h-[14px]",
                                        }}
                                    />
                                    <div className="text-sm">{Number(attribute?.value ?? 0)}</div>
                                </div>
                            </div>
                        )
                    }}
                />
            </div>
        </Container>
    )
}

export default Page
