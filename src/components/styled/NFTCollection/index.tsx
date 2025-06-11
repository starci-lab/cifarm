import { Card, CardBody, CardFooter, Image, Spacer } from "@/components"
import { NFTCollectionData } from "@/modules/entities"
import React, { FC } from "react"

interface NFTCollectionProps {
    collection: NFTCollectionData
    onClick: () => void
    disabled?: boolean
}

export const NFTCollection: FC<NFTCollectionProps> = ({ collection, onClick, disabled }) => {
    return (
        <Card className="relative" onClick={onClick} pressable disabled={disabled}>
            <CardBody>
                <Image src={collection.imageUrl} className="w-24 h-24 object-contain" />
                <Spacer y={4}/>
                <div className="text-secondary text-xl leading-none">{collection.name}</div>
            </CardBody>
            <CardFooter>
                <div className="text-muted-foreground line-clamp-3">
                    {collection.description}
                </div>
            </CardFooter>
        </Card>
    )
}
