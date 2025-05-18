import { cn } from "@/lib/utils"
import React, { FC } from "react"

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  className?: string;
  src: string;
  scale?: number;
}

export const Image: FC<ImageProps> = ({ src, className }) => {
    return <img src={src} className={className} />
}

export type ScaledImageProps = ImageProps;

export const ScaledImage: FC<ScaledImageProps> = (props) => {
    const baseCoefficient = 2.5
    return (
        <img
            {...props}
            className={cn("w-fit h-fit min-w-fit min-h-fit", props.className)}
            srcSet={`${props.src} ${(1 / (props.scale ?? 1)) * baseCoefficient}x`}
        />
    )
}
