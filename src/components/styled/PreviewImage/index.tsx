import React, { FC } from "react"
import { Image } from "../Image"
import { Skeleton } from "../../ui"
interface PreviewImageProps {
    imageUrl?: string
}

export const PreviewImage: FC<PreviewImageProps> = ({ imageUrl }) => {
    return (
        <>
            {imageUrl ? (
                <div className="p-3 rounded-lg max-w-full w-40 aspect-square grid place-items-center bg-content1">
                    <Image src={imageUrl} className="object-contain w-full aspect-square" />
                </div>
            ) : (
                <Skeleton className="rounded-lg max-w-full w-40 aspect-square grid place-items-center" />
            )}
        </>
    )
}


