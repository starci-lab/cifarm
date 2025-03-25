import React, { FC, PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

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
                    "relative mx-auto max-w-[500px]",
                    hasPadding ? "p-6" : "",
                    centerContent ? "grid place-items-center" : "",
                    "min-h-screen grid"
                )
            }
        >
            {children}
        </div>
    )
}
