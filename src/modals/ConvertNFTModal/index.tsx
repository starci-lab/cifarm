"use client"
import {
    CONVERT_NFT_MODAL_DISCLOSURE,
    GRAPHQL_MUTATION_CREATE_CONVERT_SOLANA_METAPLEX_NFTS_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_CONVERT_SOLANA_METAPLEX_NFTS_TRANSACTION_SWR_MUTATION,
    SELECT_NFT_COLLECTION_MODAL_DISCLOSURE,
    SIGN_TRANSACTION_MODAL_DISCLOSURE,
} from "@/singleton"
import { useSingletonHook } from "@/singleton"
import React, { FC, useEffect } from "react"
import {
    Card,
    CardBody,
    ExtendedButton,
    Image,
    ModalHeader,
} from "@/components"
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import {
    useGraphQLMutationCreateConvertSolanaMetaplexNFTsTransactionSwrMutation,
    useGraphQLMutationSendConvertSolanaMetaplexNFTsTransactionSwrMutation,
    useGlobalAccountAddress,
    toast,
} from "@/hooks"
import {
    useAppSelector,
    setSelectedNFTCollectionKey,
    useAppDispatch,
    setSignTransactionModalContent,
    TransactionType,
} from "@/redux"
import { ArrowDown, CaretDown, CaretUp } from "@phosphor-icons/react"
import { envConfig } from "@/env"
import { NFTCollectionKey } from "@/modules/entities"
import {
    sessionDb,
    SessionDbKey,
    SolanaTransactionType,
} from "@/modules/dexie"
import { useIsMobileDevice } from "@/hooks"

export const NFTConversionModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        CONVERT_NFT_MODAL_DISCLOSURE
    )

    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const nftCollectionKey = useAppSelector(
        (state) => state.convertReducer.nftCollectionKey
    )
    const nftAddresses = useAppSelector(
        (state) => state.convertReducer.nftAddresses
    )
    const conversionRate = staticData?.nftConversion.conversionRate || 1
    const nftsGet = nftAddresses.length / conversionRate
    const selectedNFTCollectionKey = useAppSelector(
        (state) => state.convertReducer.selectedNFTCollectionKey
    )
    const network = envConfig().network
    const { isOpen: isNFTCollectionModalOpen, open: openNFTCollectionModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(
        SELECT_NFT_COLLECTION_MODAL_DISCLOSURE
    )
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (nftCollectionKey === selectedNFTCollectionKey) {
            const nextNFTCollectionKey = Object.values(NFTCollectionKey).find(
                (nftCollectionKey) => nftCollectionKey !== selectedNFTCollectionKey
            ) as NFTCollectionKey
            dispatch(setSelectedNFTCollectionKey(nextNFTCollectionKey))
        }
    }, [selectedNFTCollectionKey, nftCollectionKey])
    const { swrMutation: createConvertSolanaMetaplexNFTsSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationCreateConvertSolanaMetaplexNFTsTransactionSwrMutation
      >
    >(
        GRAPHQL_MUTATION_CREATE_CONVERT_SOLANA_METAPLEX_NFTS_TRANSACTION_SWR_MUTATION
    )
    const { swrMutation: sendConvertSolanaMetaplexNFTsSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendConvertSolanaMetaplexNFTsTransactionSwrMutation
      >
    >(
        GRAPHQL_MUTATION_SEND_CONVERT_SOLANA_METAPLEX_NFTS_TRANSACTION_SWR_MUTATION
    )
    const { open: openSignTransactionModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SIGN_TRANSACTION_MODAL_DISCLOSURE)
    const isMobileDevice = useIsMobileDevice()
    const { accountAddress } = useGlobalAccountAddress()
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Convert NFTs" />
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-4 items-center">
                        <Card className="w-full relative">
                            <CardBody className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <Image
                                        className="w-6 h-6"
                                        src={
                                            staticData?.nftCollections?.[nftCollectionKey]?.[network]
                                                ?.imageUrl || ""
                                        }
                                    />
                                    {
                                        staticData?.nftCollections?.[nftCollectionKey]?.[network]
                                            ?.name
                                    }
                                    <CaretDown className="w-4 h-4" />
                                </div>
                                <div className="text-4xl">{nftAddresses.length}</div>
                            </CardBody>
                        </Card>
                        <div className="rounded-full bg-content-2 h-10 w-10 grid place-items-center">
                            <ArrowDown />
                        </div>
                        <Card className="w-full relative">
                            <CardBody className="flex items-center justify-between">
                                <div
                                    className="flex items-center gap-1"
                                    onClick={openNFTCollectionModal}
                                >
                                    <Image
                                        className="w-6 h-6"
                                        src={
                                            staticData?.nftCollections?.[selectedNFTCollectionKey]?.[
                                                network
                                            ]?.imageUrl || ""
                                        }
                                    />
                                    {
                                        staticData?.nftCollections?.[selectedNFTCollectionKey]?.[
                                            network
                                        ]?.name
                                    }
                                    {isNFTCollectionModalOpen ? (
                                        <CaretUp className="w-4 h-4" />
                                    ) : (
                                        <CaretDown className="w-4 h-4" />
                                    )}
                                </div>
                                <div className="text-4xl">{nftsGet}</div>
                            </CardBody>
                        </Card>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        color="primary"
                        className="w-full"
                        isLoading={createConvertSolanaMetaplexNFTsSwrMutation.isMutating}
                        onClick={async () => {
                            if (!accountAddress) return
                            if (isMobileDevice) {
                                await sessionDb.keyValueStore.add({
                                    key: SessionDbKey.SolanaTransaction,
                                    value: SolanaTransactionType.ConvertMetaplexNFTs,
                                })
                            }
                            const { data } =
                await createConvertSolanaMetaplexNFTsSwrMutation.trigger({
                    request: {
                        convertNFTAddresses: nftAddresses,
                        accountAddress: accountAddress,
                        nftCollectionKey: selectedNFTCollectionKey,
                        burnNFTCollectionKey: nftCollectionKey,
                    },
                })
                            if (!data) {
                                toast({
                                    title: "Failed to convert NFTs",
                                    description: "Please try again",
                                    variant: "destructive",
                                })
                                return
                            }
                            dispatch(
                                setSignTransactionModalContent({
                                    type: TransactionType.SolanaRawTxs,
                                    data: {
                                        serializedTxs: data.serializedTxs,
                                    },
                                    postActionHook: async (
                                        signedSerializedTxs: string | Array<string>
                                    ) => {
                                        const { data } =
                      await sendConvertSolanaMetaplexNFTsSwrMutation.trigger({
                          request: {
                              serializedTxs: Array.isArray(signedSerializedTxs)
                                  ? signedSerializedTxs
                                  : [signedSerializedTxs],
                          },
                      })
                                        if (!data) {
                                            toast({
                                                title: "Failed to send transaction",
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
                    >
            Convert
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
