import React, { FC } from "react"
import { v4 } from "uuid"
export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  className?: string;
  src: string
}

export const Image: FC<ImageProps> = ({ src, alt = v4(), className }) => {
    return <img src={src} alt={alt} className={className} />
}
