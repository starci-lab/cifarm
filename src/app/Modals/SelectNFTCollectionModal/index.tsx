import React from "react"
import { ModalHeader, NFTCollection, ScrollArea } from "@/components"
import { GRAPHQL_QUERY_STATIC_SWR, SELECT_NFT_COLLECTION_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { NFTCollectionKey } from "@/modules/entities"
import { setSelectedNFTCollectionKey, useAppDispatch, useAppSelector } from "@/redux"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { envConfig } from "@/env"

export const SelectNFTCollectionModal = () => {
    const { isOpen, toggle, close } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SELECT_NFT_COLLECTION_DISCLOSURE)
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(GRAPHQL_QUERY_STATIC_SWR)
    const nftCollections = staticSwr.data?.data.nftCollections || {}
    const network = envConfig().network
    const selectedNFTCollectionKey = useAppSelector((state) => state.convertReducer.selectedNFTCollectionKey)
    const nftCollectionData = nftCollections?.[selectedNFTCollectionKey]?.[network]
    const originalNFTCollectionKey = useAppSelector((state) => state.convertReducer.nftCollectionKey)
    const dispatch = useAppDispatch()

    const collectionSwrs = useAppSelector((state) => state.sessionReducer.nftCollectionSwrs)
    const collectionSwr = collectionSwrs[selectedNFTCollectionKey]

    if (!nftCollectionData || !collectionSwr || !collectionSwr.data) return null
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
                            {Object.values(NFTCollectionKey).map((nftCollectionKey) => {
                                const collection = nftCollections?.[nftCollectionKey]?.[network]
                                if (!collection) return null
                                return (
                                    <NFTCollection
                                        disabled={nftCollectionKey === originalNFTCollectionKey}
                                        key={nftCollectionKey}
                                        collection={collection}
                                        onClick={() => {
                                            dispatch(setSelectedNFTCollectionKey(nftCollectionKey))
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
