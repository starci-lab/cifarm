import React, { PropsWithChildren, FC } from "react"
import { cn } from "@/lib/utils"

export interface BlockProps extends PropsWithChildren {
  scheme?: "light" | "dark";
}

export const Block: FC<BlockProps> = ({ children, scheme = "light" }) => {
    return (
        <div className={
            cn(
                "light bg-transparent border-0 shadow-none rounded-none",
                scheme === "light" && "light",
                scheme === "dark" && "dark"
            )
        }
        >
            {children}
        </div>
    )
}
