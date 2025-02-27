
import React, { FC, PropsWithChildren } from "react"

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
            className={`relative mx-auto max-w-[500px] ${hasPadding ? "p-6" : ""} ${
                centerContent ? "grid place-items-center" : ""
            } min-h-screen grid`}
        >
            {children}
        </div>
    )
}
