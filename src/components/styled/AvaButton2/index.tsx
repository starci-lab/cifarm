import React, { ElementType, FC } from "react"
import { Image } from "../Image"
import { ArrowDown } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

type AvaButton2Props = {
  imageUrl: string
  onClick?: () => void
  as?: ElementType
  classNames?: {
    base?: string
  }
}

export const AvaButton2: FC<AvaButton2Props> = ({
    imageUrl,
    onClick,
    as: Component = "button",
    classNames = {},
}) => {
    return (
        <Component
            onClick={onClick}
            className={cn("rounded-lg w-10 h-10 relative", classNames?.base)}
        >
            <Image
                src={imageUrl}
                alt="avatar"
                className="rounded-full object-cover w-full h-full"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-content-2 rounded-full grid place-items-center">
                <ArrowDown className="w-3 h-3 text-secondary" />
            </div>
        </Component>
    )
}
