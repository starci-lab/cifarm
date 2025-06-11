import React from "react"
import { ModalHeader, NFTCollection, ScrollArea } from "@/components"
import { GRAPHQL_QUERY_BLOCKCHAIN_COLLECTIONS_SWR, GRAPHQL_QUERY_STATIC_SWR, SELECT_NFT_COLLECTION_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { NFTType } from "@/modules/entities"
import { setSelectedNFTType, useAppDispatch, useAppSelector } from "@/redux"
import { useGraphQLQueryStaticSwr, useGraphQLQueryBlockchainCollectionsSwr } from "@/hooks"
import { envConfig } from "@/env"

export const SelectNFTCollectionModal = () => {
    const { isOpen, toggle, close } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SELECT_NFT_COLLECTION_DISCLOSURE)
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(GRAPHQL_QUERY_STATIC_SWR)
    const nftCollections = staticSwr.data?.data.nftCollections || {}
    const { swr: blockchainCollectionsSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryBlockchainCollectionsSwr>>(GRAPHQL_QUERY_BLOCKCHAIN_COLLECTIONS_SWR)
    const network = envConfig().network
    const selectedNFTType = useAppSelector((state) => state.convertReducer.selectedNFTType)
    const nftCollectionData = nftCollections?.[selectedNFTType]?.[network]
    const originalNFTType = useAppSelector((state) => state.convertReducer.nftType)
    const dispatch = useAppDispatch()
    if (!nftCollectionData) return null
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Select NFT Collection" />
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <ScrollArea className="h-[400px]">
                        <div className="grid md:grid-cols-2 gap-4">
                            {Object.values(NFTType).map((nftType) => {
                                const collection = nftCollections?.[nftType]?.[network]
                                if (!collection) return null
                                return (
                                    <NFTCollection
                                        disabled={nftType === originalNFTType}
                                        key={nftType}
                                        collection={collection}
                                        nfts={blockchainCollectionsSwr.data?.data.blockchainCollections.collections.find((collection) => collection.nftType === nftType)?.nfts || []}
                                        onClick={() => {
                                            dispatch(setSelectedNFTType(nftType))
                                            close()
                                        }}
                                    />  
                                )
                            })}
                        </div>
                    </ScrollArea>
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
