import React, { FC, PropsWithChildren } from "react"
import { cn } from "@/utils"

interface ContainerProps extends PropsWithChildren {
  hasPadding?: boolean;
  centerContent?: boolean;
}

export const Container: FC<ContainerProps> = ({
    children,
    hasPadding,
    centerContent,
}: ContainerProps) => {
    return (
        <div
            className={
                cn(
                    "relative mx-auto overflow-x-hidden",
                    hasPadding ? "p-6" : "",
                    centerContent ? "grid place-items-center" : "",
                    "min-h-screen grid w-screen"
                )
            }
        >
            {children}
        </div>
    )
}
