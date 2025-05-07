import React, { FC } from "react"
import { Image } from "../Image"
import { cn } from "@/lib/utils"

export interface ImageGroupProps {
  images: Array<string>;
  className?: {
    image?: string;
    imageWrapper?: string;
  };
}

export const ImageGroup: FC<ImageGroupProps> = ({ images, className = {} }) => {
    return (
        <div className="flex items-center -gap-4">
            {images.map((image, index) => (
                <div
                    className={cn(
                        "bg-content1 rounded-full w-8 h-8",
                        `rounded-full w-8 h-8 ${index !== 0 ? "-ml-4" : ""}`,
                        "grid place-items-center",
                        className?.imageWrapper
                    )}
                    key={index}
                >
                    <Image src={image} alt="Logo" className={cn("w-6 h-6", className?.image)} />
                </div>
            ))}
        </div>
    )
}
