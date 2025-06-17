import React from "react"
import { ModalHeader, NFTCollection, ScrollArea } from "@/components"
import { SELECT_NFT_COLLECTION_MODAL_DISCLOSURE } from "@/singleton"
import { useSingletonHook } from "@/singleton"
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
import { envConfig } from "@/env"

export const SelectNFTCollectionModal = () => {
    const { isOpen, toggle, close } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SELECT_NFT_COLLECTION_MODAL_DISCLOSURE)
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const nftCollections = staticData?.nftCollections || {}
    const network = envConfig().network
    const selectedNFTCollectionKey = useAppSelector((state) => state.convertReducer.selectedNFTCollectionKey)
    const nftCollectionData = nftCollections?.[selectedNFTCollectionKey]?.[network]
    const originalNFTCollectionKey = useAppSelector((state) => state.convertReducer.nftCollectionKey)
    const dispatch = useAppDispatch()

    const collectionSwrs = useAppSelector((state) => state.swrsReducer.nftCollectionSwrs)
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
