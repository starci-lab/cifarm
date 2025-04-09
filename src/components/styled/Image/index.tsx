import { cn } from "@/lib/utils"
import React, { FC } from "react"
import { v4 } from "uuid"
export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  className?: string;
  src: string
}

export const Image: FC<ImageProps> = ({ src, alt = v4(), className }) => {
    return <img src={src} alt={alt} className={className} />
}

export type ItemImageProps = ImageProps

export const ItemImage: FC<ItemImageProps> = (props) => {
    return <img {...props} className={cn("scale-50 w-fit min-w-fit", props.className)} />
}