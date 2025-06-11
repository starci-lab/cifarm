import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { NFTCollectionKey } from "@/modules/entities"
import { useLoadCollections } from "./useLoadCollections"

export const LoadCollections = () => {
    const params = useParams()
    const collectionKey = params.collectionKey as NFTCollectionKey
    const [collectionKeys, setCollectionKeys] = useState<Array<NFTCollectionKey>>([])

    useEffect(() => {
        if (!collectionKey) return
        setCollectionKeys([...collectionKeys, collectionKey])
    }, [collectionKey])

    return (
        collectionKeys.map((collectionKey) => (
            <LoadCollection key={collectionKey} collectionKey={collectionKey} />
        ))
    )
}

export const LoadCollection = ({ collectionKey }: { collectionKey: NFTCollectionKey }) => {
    useLoadCollections(collectionKey)
    return null
}