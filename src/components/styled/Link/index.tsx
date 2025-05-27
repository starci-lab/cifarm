import { cn } from "@/lib/utils"
import React, { FC } from "react"

import { PropsWithChildren } from "react"
import { Spinner } from "../Spinner"

export interface LinkProps extends PropsWithChildren {
  onClick?: () => void;
  href?: string;
  classNames?: Partial<{
    base: string;
  }>;
  target?: string;
  isLoading?: boolean;
}

export const Link: FC<LinkProps> = ({
    children,
    classNames: { base } = {},
    onClick,
    target,
    isLoading,
}) => {
    return (
        <a className={cn(base, "w-fit flex items-center gap-2")} onClick={onClick} target={target}>
            {isLoading && <Spinner />}
            {children}
        </a>
    )
}
