import React, { FC } from "react"
import { Image } from "@/components"
import { cn } from "@/utils"

interface HoverImageProps {
  imageUrl: string;
  hoverIcon?: React.ReactNode;
  classNames?: {
    container?: string;
    image?: string;
    hoverIcon?: string;
  };
  onClick?: () => void;
}

export const HoverImage: FC<HoverImageProps> = ({
    imageUrl,
    hoverIcon,
    classNames,
    onClick,
}) => {
    return (
        <div className={cn("relative group", classNames?.container)} onClick={onClick}>
            <div className="absolute top-0 left-0 w-full h-full grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                {hoverIcon && (
                    <div
                        className={cn("rounded-full bg-white p-2", classNames?.hoverIcon)}
                    >
                        {hoverIcon}
                    </div>
                )}
            </div>
            <Image
                src={imageUrl}
                alt="hover image"
                className={cn("rounded-lg aspect-video", classNames?.image)}
            />
        </div>
    )
}
