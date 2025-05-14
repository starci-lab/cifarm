import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import React, { FC, PropsWithChildren } from "react"
import { ExtendedButton } from "../ExtendedButton"
import { FunnelIcon } from "lucide-react"
  
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
                <ExtendedButton variant="icon" size="icon">
                    <FunnelIcon className="w-6 h-6" />
                </ExtendedButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-[400px]">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
  