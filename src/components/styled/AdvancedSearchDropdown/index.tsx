import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { FunnelIcon } from "@heroicons/react/24/outline"
import React, { FC, PropsWithChildren } from "react"
import { IconWrapper } from "../IconWrapper"
  
export interface AdvancedSearchDropdownProps extends PropsWithChildren {
    className?: string
  }
  
export const AdvancedSearchDropdown: FC<AdvancedSearchDropdownProps> = ({
    className,
    children,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={cn(className)}>
                <IconWrapper classNames={{
                    base: "text-primary w-9 h-9",
                }}>
                    <FunnelIcon className="w-5 h-5" />
                </IconWrapper>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-[400px]">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
  