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
    useGraphQLMutationCreateUnwrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLMutationCreateWrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLMutationSendUnwrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLMutationSendWrapSolanaMetaplexNFTTransactionSwrMutation,
    useGraphQLQueryStaticSwr,
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
} from "lucide-react"
import React, { FC } from "react"
import {
    SIGN_TRANSACTION_DISCLOSURE,
    TRANSFER_NFT_FORMIK,
    TRANSFER_NFT_DISCLOSURE,
    QUERY_STATIC_SWR_MUTATION,
    GRAPHQL_MUTATION_CREATE_WRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_WRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_CREATE_UNWRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_UNWRAP_SOLANA_METAPLEX_NFT_TRANSACTION_SWR_MUTATION,
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
import { getNFTImage } from "../utils"


const Page: FC = () => {
    const collectionSwrs = useAppSelector(
        (state) => state.sessionReducer.nftCollectionSwrs
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
    const { open: openSignTransactionModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SIGN_TRANSACTION_DISCLOSURE)

    const { open: openTransferNFTModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(TRANSFER_NFT_DISCLOSURE)

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    if (!nft || !staticSwr.data) {
    // return skeleton
        return null
    }
    const nftImage = getNFTImage({
        collectionKey,
        nft,
        collections,
        staticData: staticSwr.data.data,
    })
    const rarity = nft.attributes.find(
        (attribute) => attribute.key === AttributeName.Rarity
    )?.value as NFTRarityEnum
    return (
        <Container hasPadding>
            <div className="h-full">
                <Header title={nft?.name ?? ""} />
                <Spacer y={6} />
                <div className="rounded-md bg-card p-2 max-w-[300px] relative">
                    <Image
                        src={nftImage}
                        className="w-full aspect-square object-contain"
                    />
                    <div className="absolute top-3 left-3">
                        <NFTRarityBadge rarity={rarity} />
                    </div>
                </div>
                <Spacer y={4} />
                <div className="flex gap-2 items-center">
                    {nft.wrapped && <WrappedBadge />}
                </div>
                <Spacer y={6} />
                <div className="grid grid-cols-4 gap-2">
                    {nft.wrapped ? (
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
                                        collectionAddress: collections[collectionKey]?.address,
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
                                        type: TransactionType.UnwrapSolanaMetaplexNFT,
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
                        collections[collectionKey]?.address,
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
                                        type: TransactionType.WrapSolanaMetaplexNFT,
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
                <Spacer y={6} />
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
