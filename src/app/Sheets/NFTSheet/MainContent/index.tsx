import {
    SheetTitle,
    SheetHeader,
    Spacer,
    PressableAction,
    NFTRarityBadge,
    PreviewImage,
    Skeleton,
    Title,
    WrappedBadge,
    List,
    ScrollArea,
} from "@/components"
import React, { FC } from "react"
import {
    toast,
    useGraphQLMutationCreateUnwrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLMutationCreateWrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLMutationSendUnwrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLMutationSendWrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLQueryStaticSwr,
    useTransferNFTFormik,
} from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import {
    QUERY_STATIC_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_WRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_CREATE_UNWRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_CREATE_WRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_UNWRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    SIGN_TRANSACTION_DISCLOSURE,
    TRANSFER_NFT_FORMIK,
} from "@/app/constants"
import {
    NFTSheetPage,
    setNFTSheetPage,
    setSignTransactionModal,
    TransactionType,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import {
    AttributeName,
    explorerUrl,
    FruitPropertiesName,
    fruitPropertiesNameMap,
    NFTRarityEnum,
    StatsAttributeName,
    statsAttributeNameMap,
} from "@/modules/blockchain"
import {
    SendHorizonalIcon,
    EyeIcon,
    PackageOpenIcon,
    PackageIcon,
    WandSparklesIcon,
} from "lucide-react"
import { useParams } from "next/navigation"
import { NFTType, PlacedItemType } from "@/modules/entities"
import { envConfig } from "@/env"

export const MainContent: FC = () => {
    const formik = useSingletonHook2<ReturnType<typeof useTransferNFTFormik>>(
        TRANSFER_NFT_FORMIK
    )

    const params = useParams()
    const collectionKey = params.collectionKey as NFTType

    const dispatch = useAppDispatch()

    const nftAddress = useAppSelector(
        (state) => state.sheetReducer.nftSheet.nftAddress
    )

    const nftCollectionSwrs = useAppSelector(
        (state) => state.sessionReducer.nftCollectionSwrs
    )
    const nftCollectionSwr = nftCollectionSwrs[collectionKey]
    const nft = nftCollectionSwr?.data?.nfts.find(
        (nft) => nft.nftAddress === nftAddress
    )

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    const collections = staticSwr.data?.data.nftCollections || {}

    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)

    const { swrMutation: createWrapSolanaMetaplexNFTSwrMutation } = useSingletonHook<
  ReturnType<typeof useGraphQLMutationCreateWrapSolanaMetaplexNFTTransactionSwrMutation>
>(GRAPHQL_MUTATION_CREATE_WRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION)

    const { swrMutation: sendWrapSolanaMetaplexNFTSwrMutation } = useSingletonHook<
  ReturnType<typeof useGraphQLMutationSendWrapSolanaMetaplexNFTTransactionSwrMutation>
>(GRAPHQL_MUTATION_SEND_WRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION)

    const { swrMutation: createUnwrapSolanaMetaplexNFTSwrMutation } = useSingletonHook<
  ReturnType<typeof useGraphQLMutationCreateUnwrapSolanaMetaplexNFTTransactionSwrMutation>
>(GRAPHQL_MUTATION_CREATE_UNWRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION)

    const { swrMutation: sendUnwrapSolanaMetaplexNFTSwrMutation } = useSingletonHook<
  ReturnType<typeof useGraphQLMutationSendUnwrapSolanaMetaplexNFTTransactionSwrMutation>
>(GRAPHQL_MUTATION_SEND_UNWRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION)

    const renderProperties = () => {
        const collection = collections[collectionKey]
        const placedItemType = staticSwr.data?.data.placedItemTypes?.find(
            (placedItemType) =>
                placedItemType.id ===
        collection?.[chainKey]?.[network]?.placedItemTypeId
        )
        if (!placedItemType) {
            return null
        }
        switch (placedItemType.type) {
        case PlacedItemType.Fruit:
            return (
                <List
                    enableScroll={false}
                    items={Object.values(FruitPropertiesName)}
                    contentCallback={(name) => {
                        const attribute = nft?.attributes.find(
                            (attribute) => attribute.key === name
                        )
                        return (
                            <div className="px-3 py-2 bg-content2 rounded-lg">
                                <div className="flex gap-2 items-center justify-between w-full">
                                    <Title
                                        title={fruitPropertiesNameMap[name].name}
                                        tooltipString={fruitPropertiesNameMap[name].tooltip}
                                        classNames={{
                                            title: "text-base",
                                            tooltip: "w-4 h-4",
                                        }}
                                    />
                                    <div className="text-sm">
                                        {Number(attribute?.value ?? 0)}
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                />
            )
        }
    }

    const renderStats = () => {
        const collection = collections[collectionKey]
        const placedItemType = staticSwr.data?.data.placedItemTypes?.find(
            (placedItemType) =>
                placedItemType.id ===
        collection?.[chainKey]?.[network]?.placedItemTypeId
        )
        if (!placedItemType) {
            return null
        }
        switch (placedItemType.type) {
        case PlacedItemType.Fruit:
            return (
                <List
                    enableScroll={false}
                    items={Object.values(StatsAttributeName)}
                    contentCallback={(name) => {
                        const attribute = nft?.attributes.find(
                            (attribute) => attribute.key === name
                        )
                        return (
                            <div className="px-3 py-2 bg-content2 rounded-lg">
                                <div className="flex gap-2 items-center justify-between w-full">
                                    <Title
                                        title={statsAttributeNameMap[name].name}
                                        tooltipString={statsAttributeNameMap[name].tooltip}
                                        classNames={{
                                            title: "text-base",
                                            tooltip: "w-4 h-4",
                                        }}
                                    />
                                    <div className="text-sm">
                                        {Number(attribute?.value ?? 0)}
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                />
            )
        }
    }

    const network = envConfig().network

    const { open: openSignTransactionModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SIGN_TRANSACTION_DISCLOSURE)

    return (
        <div className="w-full h-full">
            <SheetHeader>
                <SheetTitle>{nft?.name}</SheetTitle>
            </SheetHeader>
            <Spacer y={6} />
            <ScrollArea className="w-full h-full overflow-y-auto" hideScrollBar={true}>
                <PreviewImage imageUrl={nft?.image} />
                <Spacer y={4} />
                {nft ? (
                    <div className="flex gap-2 items-center">
                        <NFTRarityBadge
                            rarity={
                  nft.attributes.find(
                      (rarity) => rarity.key === AttributeName.Rarity
                  )?.value as NFTRarityEnum
                            }
                        />
                        {nft?.wrapped && <WrappedBadge />}
                    </div>
                ) : (
                    <div className="flex gap-2 items-center">
                        <Skeleton className="w-[60px] h-6" />
                        <Skeleton className="w-[60px] h-6" />
                    </div>
                )}
                <Spacer y={6} />
                <div className="grid grid-cols-4 gap-2">
                    {nft?.wrapped ? (
                        <PressableAction
                            icon={<PackageOpenIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            isLoading={createUnwrapSolanaMetaplexNFTSwrMutation.isMutating}
                            onClick={async () => {
                                if (!nft?.nftAddress) {
                                    throw new Error("NFT address is required")
                                }
                                const { data } = await createUnwrapSolanaMetaplexNFTSwrMutation.trigger({
                                    request: {
                                        nftAddress: nft.nftAddress,
                                        collectionAddress: collections[collectionKey]?.[chainKey]?.[network]?.collectionAddress,
                                    },
                                })
                                if (!data) {
                                    toast({
                                        title: "Error",
                                        description: "Failed to create unwrap NFT transaction",
                                        variant: "destructive",
                                    })
                                    return ""
                                }
                                dispatch(
                                    setSignTransactionModal({
                                        type: TransactionType.SolanaRawTx,
                                        data: {
                                            serializedTx: data.serializedTx,
                                        },
                                        postActionHook: async (serializedTx: string) => {
                                            const { data } = await sendUnwrapSolanaMetaplexNFTSwrMutation.trigger({
                                                request: {
                                                    serializedTx,
                                                },
                                            })
                                            if (!data) {
                                                toast({
                                                    title: "Error",
                                                    description: "Failed to send unwrap NFT transaction",
                                                    variant: "destructive",
                                                })
                                                return ""
                                            }
                                            return data.txHash
                                        },
                                    })
                                )
                                openSignTransactionModal()
                            }}
                            name="Unwrap"
                        />
                    ) : (
                        <PressableAction
                            icon={<PackageIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            isLoading={createWrapSolanaMetaplexNFTSwrMutation.isMutating}
                            onClick={async () => {
                                if (!nft?.nftAddress) {
                                    throw new Error("NFT address is required")
                                }
                                const { data } =
                  await createWrapSolanaMetaplexNFTSwrMutation.trigger({
                      request: {
                          nftAddress: nft.nftAddress,
                          collectionAddress:
                        collections[collectionKey]?.[chainKey]?.[network]?.collectionAddress,
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
                                        type: TransactionType.SolanaRawTx,
                                        data: {
                                            serializedTx: data.serializedTx,
                                        },
                                        postActionHook: async (serializedTx: string) => {
                                            const { data } = await sendWrapSolanaMetaplexNFTSwrMutation.trigger({
                                                request: {
                                                    serializedTx,
                                                },
                                            })
                                            if (!data) {
                                                toast({
                                                    title: "Error",
                                                    description: "Failed to send wrap NFT transaction",
                                                    variant: "destructive",
                                                })
                                                return ""
                                            }
                                            return data.txHash
                                        },
                                    })
                                )
                                openSignTransactionModal()
                            }}
                            name="Wrap"
                        />
                    )}
                    <PressableAction
                        disabled={nft?.wrapped}
                        icon={<SendHorizonalIcon className="w-5 h-5 min-w-5 min-h-5" />}
                        onClick={() => {
                            formik.setFieldValue("collectionKey", collectionKey)
                            formik.setFieldValue("nft", nft)
                            dispatch(setNFTSheetPage(NFTSheetPage.Transfer))
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
                                    value: nft?.nftAddress ?? "",
                                    chainKey,
                                    network,
                                }),
                                "_blank"
                            )
                        }}
                        name="View"
                    />
                </div>  
                <Spacer y={6} />
                <div>
                    <Title title="Properties" />
                    <Spacer y={2} />
                    {renderProperties()}
                </div>
                <Spacer y={6} />
                <div>
                    <Title title="Stats" />
                    <Spacer y={2} />
                    {renderStats()}
                </div>
            </ScrollArea>
        </div>
    )
}
