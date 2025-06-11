"use client"
import { CONVERT_NFT_DISCLOSURE, GRAPHQL_MUTATION_CREATE_CONVERT_SOLANA_METAPLEX_NFTS_TRANSACTION_SWR_MUTATION, GRAPHQL_MUTATION_SEND_CONVERT_SOLANA_METAPLEX_NFTS_TRANSACTION_SWR_MUTATION, QUERY_STATIC_SWR_MUTATION, SELECT_NFT_COLLECTION_DISCLOSURE, SIGN_TRANSACTION_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC, useEffect } from "react"
import { Card, CardBody, ExtendedButton, Image, ModalHeader } from "@/components"
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { useGraphQLMutationCreateConvertSolanaMetaplexNFTsTransactionSwrMutation, useGraphQLMutationSendConvertSolanaMetaplexNFTsTransactionSwrMutation, useGlobalAccountAddress, useGraphQLQueryStaticSwr, toast } from "@/hooks"
import { useAppSelector, setSelectedNFTCollectionKey, useAppDispatch, setSignTransactionModal, TransactionType } from "@/redux"
import { ArrowDown, CaretDown, CaretUp } from "@phosphor-icons/react"
import { envConfig } from "@/env"
import { NFTCollectionKey } from "@/modules/entities"
export const NFTConversionModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<
        ReturnType<typeof useDisclosure>
    >(CONVERT_NFT_DISCLOSURE)

    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        QUERY_STATIC_SWR_MUTATION
    )
    const nftCollectionKey = useAppSelector((state) => state.convertReducer.nftCollectionKey)
    const nftAddresses = useAppSelector((state) => state.convertReducer.nftAddresses)
    const conversionRate = staticSwr.data?.data.nftConversion.conversionRate || 1
    const nftsGet = nftAddresses.length / conversionRate
    const selectedNFTCollectionKey = useAppSelector((state) => state.convertReducer.selectedNFTCollectionKey)
    const network = envConfig().network
    const { isOpen: isNFTCollectionModalOpen, open: openNFTCollectionModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SELECT_NFT_COLLECTION_DISCLOSURE
    )
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (nftCollectionKey === selectedNFTCollectionKey) {
            const nextNFTCollectionKey = Object.values(NFTCollectionKey).find((nftCollectionKey) => nftCollectionKey !== selectedNFTCollectionKey) as NFTCollectionKey
            dispatch(setSelectedNFTCollectionKey(nextNFTCollectionKey))
        }
    }, [selectedNFTCollectionKey, nftCollectionKey])
    const { swrMutation: createConvertSolanaMetaplexNFTsSwrMutation } = useSingletonHook<ReturnType<typeof useGraphQLMutationCreateConvertSolanaMetaplexNFTsTransactionSwrMutation>>(
        GRAPHQL_MUTATION_CREATE_CONVERT_SOLANA_METAPLEX_NFTS_TRANSACTION_SWR_MUTATION
    )
    const { swrMutation: sendConvertSolanaMetaplexNFTsSwrMutation } = useSingletonHook<ReturnType<typeof useGraphQLMutationSendConvertSolanaMetaplexNFTsTransactionSwrMutation>>(
        GRAPHQL_MUTATION_SEND_CONVERT_SOLANA_METAPLEX_NFTS_TRANSACTION_SWR_MUTATION
    )
    const { open: openSignTransactionModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SIGN_TRANSACTION_DISCLOSURE
    )
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
                                    <Image className="w-6 h-6" src={staticSwr.data?.data.nftCollections?.[nftCollectionKey]?.[network]?.imageUrl || ""} />
                                    {staticSwr.data?.data.nftCollections?.[nftCollectionKey]?.[network]?.name}
                                    <CaretDown className="w-4 h-4" />
                                </div>
                                <div className="text-4xl">
                                    {nftAddresses.length}
                                </div>
                            </CardBody>
                        </Card>
                        <div className="rounded-full bg-content-2 h-10 w-10 grid place-items-center">
                            <ArrowDown />
                        </div>
                        <Card className="w-full relative">
                            <CardBody className="flex items-center justify-between">
                                <div className="flex items-center gap-1" onClick={openNFTCollectionModal}>
                                    <Image className="w-6 h-6" src={staticSwr.data?.data.nftCollections?.[selectedNFTCollectionKey]?.[network]?.imageUrl || ""} />
                                    {staticSwr.data?.data.nftCollections?.[selectedNFTCollectionKey]?.[network]?.name}
                                    {isNFTCollectionModalOpen ? <CaretUp className="w-4 h-4" /> : <CaretDown className="w-4 h-4" />}
                                </div>
                                <div className="text-4xl">
                                    {nftsGet}
                                </div>
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
                            const { data } = await createConvertSolanaMetaplexNFTsSwrMutation.trigger({
                                request: {
                                    convertNFTAddresses: nftAddresses,
                                    accountAddress: accountAddress,
                                    nftCollectionKey: selectedNFTCollectionKey,
                                    burnNFTCollectionKey: nftCollectionKey,
                                }
                            })
                            if (!data) {
                                toast({
                                    title: "Failed to convert NFTs",
                                    description: "Please try again",
                                    variant: "destructive",
                                })
                                return
                            }
                            dispatch(setSignTransactionModal({
                                type: TransactionType.SolanaRawTxs,
                                data: {
                                    serializedTxs: data.serializedTxs,
                                },
                                postActionHook: async (signedSerializedTxs) => {
                                    const { data } = await sendConvertSolanaMetaplexNFTsSwrMutation.trigger({
                                        request: {
                                            serializedTxs: Array.isArray(signedSerializedTxs) ? signedSerializedTxs : [signedSerializedTxs],
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
                            }))
                            openSignTransactionModal()
                        }}
                    >Convert</ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
