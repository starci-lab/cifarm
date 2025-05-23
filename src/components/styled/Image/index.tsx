import { cn } from "@/lib/utils"
import React, { FC } from "react"

export enum ImageScale {
    Size1 = 40,
    Size2 = 60,
    Size3 = 20
}

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  className?: string;
  src: string;
  imageScale?: ImageScale;
}

export const Image: FC<ImageProps> = ({ src, className }) => {
    return <img src={src} className={className} />
}

export type ScaledImageProps = ImageProps;

export const ScaledImage: FC<ScaledImageProps> = (props) => {
    //const baseCoefficient = 2.5
    const scaleMap = {
        [ImageScale.Size1]: "scale-40",
        [ImageScale.Size2]: "scale-60",
        [ImageScale.Size3]: "scale-20"
    }
    return (
        <img
            {...props}
            className={cn("w-fit h-fit min-w-fit min-h-fit", scaleMap[props.imageScale || ImageScale.Size1], props.className)}
        />
    )
}
