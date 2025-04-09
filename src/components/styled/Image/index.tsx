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

export type ScaledImageProps = ImageProps

export const ScaledImage: FC<ScaledImageProps> = (props) => {
    return <img {...props} className={cn("w-fit h-fit min-w-fit min-h-fit",props.className)} srcSet={`${props.src} 2x`}/>
}