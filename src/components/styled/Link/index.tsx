import { cn } from "@/lib/utils"
import React, { FC } from "react"

import { PropsWithChildren } from "react"

export interface LinkProps extends PropsWithChildren {
  onPress?: () => void;
  href?: string;
  classNames?: Partial<{
    base: string;
  }>;
  target?: string;
}

export const Link: FC<LinkProps> = ({
    children,
    classNames: { base } = {},
    onPress,
    target,
}) => {
    return (
        <a className={cn(base, "w-fit cursor-pointer")} onClick={onPress} target={target}>
            {children}
        </a>
    )
}
