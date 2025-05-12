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
                <div className="max-w-full w-full aspect-square grid place-items-center bg-content-2 rounded-lg p-3">
                    <Image src={imageUrl} className="object-contain w-full aspect-square" />
                </div>
            ) : (
                <Skeleton className="rounded-lg max-w-full w-full aspect-square grid place-items-center" />
            )}
        </>
    )
}


