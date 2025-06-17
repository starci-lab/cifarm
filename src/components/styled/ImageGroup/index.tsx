import React, { FC } from "react"
import { Image } from "../Image"
import { cn } from "@/utils"

export interface ImageGroupProps {
  images: Array<string>;
  classNames?: {
    image?: string;
    imageWrapper?: string;
  };
}

export const ImageGroup: FC<ImageGroupProps> = ({ images, classNames = {} }) => {
    return (
        <div className="flex items-center -gap-4">
            {images.map((image, index) => (
                <div
                    className={cn(
                        "bg-content-2 rounded-full w-8 h-8",
                        `rounded-full ${index !== 0 ? "-ml-4" : ""}`,
                        "grid place-items-center",
                        classNames?.imageWrapper
                    )}
                    key={index}
                >
                    <Image src={image} alt="Logo" className={cn("w-6 h-6", classNames?.image)} />
                </div>
            ))}
        </div>
    )
}
