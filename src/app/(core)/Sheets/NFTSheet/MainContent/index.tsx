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
    SheetBody,
    Image,
} from "@/components"
import React, { FC, useEffect } from "react"
import {
    toast,
    useGraphQLMutationCreateUnwrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLMutationCreateWrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLMutationSendUnwrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLMutationSendWrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLQueryStaticSwr,
    useGraphQLQueryUserSwrMutation,
    useTransferNFTFormik,
} from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import {
    QUERY_STATIC_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_WRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_CREATE_UNWRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_CREATE_WRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_UNWRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    SIGN_TRANSACTION_DISCLOSURE,
    TRANSFER_NFT_FORMIK,
    GRAPHQL_QUERY_USER_SWR_MUTATION,
} from "@/singleton"
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
import { useParams } from "next/navigation"
import { NFTCollectionKey, PlacedItemType } from "@/types"
import { envConfig } from "@/env"
import { Export, Package, PaperPlaneRight, Sparkle, Eye } from "@phosphor-icons/react"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { BlockchainNFTData } from "@/modules/apollo"

export const MainContent: FC = () => {
    const formik = useSingletonHook2<ReturnType<typeof useTransferNFTFormik>>(
        TRANSFER_NFT_FORMIK
    )

    const params = useParams()
    const collectionKey = params.collectionKey as NFTCollectionKey

    const dispatch = useAppDispatch()

    const nftAddress = useAppSelector(
        (state) => state.sheetReducer.nftSheet.nftAddress
    )

    const collectionSwrs = useAppSelector((state) => state.sessionReducer.nftCollectionSwrs)
    const collectionSwr = collectionSwrs[collectionKey]

    const nfts: Array<BlockchainNFTData> = collectionSwr?.data?.collection.nfts || []
    const nft = nfts.find(
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

    const { swrMutation: userSwrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLQueryUserSwrMutation>
    >(GRAPHQL_QUERY_USER_SWR_MUTATION)

    useEffect(() => {
        const handleEffect = async () => {
            const attribute = nft?.attributes.find(attribute => attribute.key === AttributeName.WrapperUserId)
            if (attribute) {
                await userSwrMutation.trigger({
                    request: attribute.value,
                })
            }
        }
        handleEffect()
    }, [nft])

    const renderProperties = () => {
        const collection = collections[collectionKey]
        const placedItemType = staticSwr.data?.data.placedItemTypes?.find(
            (placedItemType) =>
                placedItemType.id ===
                collection?.[network]?.placedItemTypeId
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
                        const attribute = nft?.attributes.find((attribute) => attribute.key === name)
                        return (
                            <div className="px-3 py-2 bg-content-2 rounded-lg">
                                <div className="flex gap-2 items-center justify-between w-full">
                                    <Title
                                        title={fruitPropertiesNameMap[name].name}
                                        tooltipString={fruitPropertiesNameMap[name].tooltip}
                                        classNames={{
                                            title: "text-base text-muted-foreground",
                                            tooltip: "w-4 h-4 text-muted-foreground",
                                        }}
                                    />
                                    <div className="text-sm">
                                        {Number(attribute?.value ?? "")}
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
                collection?.[network]?.placedItemTypeId
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
                        const attribute = nft?.attributes.find((attribute) => attribute.key === name)
                        return (
                            <div className="px-3 py-2 bg-content-2">
                                <div className="flex gap-2 items-center justify-between w-full">
                                    <Title
                                        title={statsAttributeNameMap[name].name}
                                        tooltipString={statsAttributeNameMap[name].tooltip}
                                        classNames={{
                                            title: "text-base text-muted-foreground",
                                            tooltip: "w-4 h-4 text-muted-foreground",
                                        }}
                                    />
                                    <div className="text-sm">
                                        {Number(attribute?.value ?? "")}
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
        <div className="h-full flex flex-col">
            <SheetHeader>
                <SheetTitle>{nft?.name}</SheetTitle>
            </SheetHeader>
            <SheetBody className="flex-1 flex flex-col">
                <ScrollArea className="w-full flex-1 overflow-y-auto" hideScrollBar={true}>
                    <PreviewImage imageUrl={nft?.imageUrl} />
                    <Spacer y={4} />
                    {nft ? (
                        <div className="flex gap-2 items-center">
                            <NFTRarityBadge
                                rarity={
                                    nft.attributes.find(
                                        (attribute) => attribute.key === AttributeName.Rarity
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
                    <div className="grid grid-cols-3 gap-2">
                        {nft?.wrapped ? (
                            <PressableAction
                                icon={<Export />}
                                isLoading={createUnwrapSolanaMetaplexNFTSwrMutation.isMutating}
                                onClick={async () => {
                                    if (!nft?.nftAddress) {
                                        throw new Error("NFT address is required")
                                    }
                                    const { data } = await createUnwrapSolanaMetaplexNFTSwrMutation.trigger({
                                        request: {
                                            nftAddress: nft.nftAddress,
                                            collectionAddress: collections[collectionKey]?.[network]?.collectionAddress,
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
                                            postActionHook: async (serializedTx) => {
                                                const { data } = await sendUnwrapSolanaMetaplexNFTSwrMutation.trigger({
                                                    request: {
                                                        serializedTx: Array.isArray(serializedTx) ? serializedTx[0] : serializedTx,
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
                                icon={<Package />}
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
                                                    collections[collectionKey]?.[network]?.collectionAddress ?? "",
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
                                            postActionHook: async (serializedTx) => {
                                                const { data } = await sendWrapSolanaMetaplexNFTSwrMutation.trigger({
                                                    request: {
                                                        serializedTx: Array.isArray(serializedTx) ? serializedTx[0] : serializedTx,
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
                            icon={<PaperPlaneRight />}
                            onClick={() => {
                                formik.setFieldValue("collectionKey", collectionKey)
                                formik.setFieldValue("nft", nft)
                                dispatch(setNFTSheetPage(NFTSheetPage.Transfer))
                            }}
                            name="Transfer"
                        />
                        <PressableAction
                            icon={<Sparkle />}
                            onClick={() => {
                                console.log("Receive")
                            }}
                            name="Enchant"
                        />
                        <PressableAction
                            icon={<Eye />}
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
                    {
                        nft?.wrapped && (
                            <div>
                                <Title title="Wrapper" tooltipString="The user that wrapped the NFT" />
                                <Spacer y={2} />
                                <div className="rounded-lg bg-content-2 p-3 flex items-center gap-2">
                                    <Image src={userSwrMutation.data?.data.user.avatarUrl || createJazziconBlobUrl(userSwrMutation.data?.data.user.id ?? "")} alt="Profile Picture" className="w-10 h-10 rounded-full" />
                                    <div>{userSwrMutation.data?.data.user.username}</div>
                                </div>
                                <Spacer y={6} />
                            </div>
                        )
                    }
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
            </SheetBody>
        </div>
    )
}
