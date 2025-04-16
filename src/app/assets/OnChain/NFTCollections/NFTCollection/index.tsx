import { Image, PressableCard } from "@/components"
import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { setCollectionKey, useAppDispatch, useAppSelector } from "@/redux"
import React, { FC } from "react"

interface NFTCollectionProps {
  collectionKey: string;
}

export const NFTCollection: FC<NFTCollectionProps> = ({ collectionKey }) => {
    const collections = useAppSelector(
        (state) => state.sessionReducer.nftCollections
    )
    const collection = collections[collectionKey]
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()
    const collectionSwrs = useAppSelector(state => state.sessionReducer.nftCollectionSwrs)
    const collectionSwr = collectionSwrs[collectionKey]
    return (
        <PressableCard className="relative" onClick={() => {
            dispatch(setCollectionKey(collectionKey))
            router.push(pathConstants.collections)
        }}>
            <div className="grid place-items-center p-3 w-full">
                <Image src={collection.imageUrl} className="w-40 h-40 object-contain" />
                <div className="flex gap-2 absolute left-3 bottom-3 bg-background/50 text-muted-background rounded-md px-2 py-1.5">
                    <div className="text-sm font-bold">{collection.name}</div>
                    <div className="text-sm text-muted-foreground font-bold">{collectionSwr.data?.nfts.length}</div>
                </div>
            </div>
        </PressableCard>
    )
}
