// component to fetch the balance of a token via SWR
import React, { useEffect } from "react"
import { useNFTCollectionsSwr } from "./useNFTCollectionsSwr"
import { removeNftCollectionsSwr, setNftCollectionsSwr } from "@/redux"
import { useAppDispatch } from "@/redux"
import { NFTType } from "@/modules/entities"

interface CollectionComponentProps {
  collectionKey: NFTType;
}

export const CollectionComponent = ({
    collectionKey,
}: CollectionComponentProps) => {
    const dispatch = useAppDispatch()
    
    const { swr } = useNFTCollectionsSwr({
        collectionKey,
    })

    useEffect(() => {
        dispatch(
            setNftCollectionsSwr({
                collectionKey,
                swr,
            })
        )
    }, [swr])

    useEffect(() => {
        return () => {
            dispatch(removeNftCollectionsSwr(collectionKey))
        }
    }, [])

    return <></>
}
