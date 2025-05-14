import React, { FC } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { truncateString } from "@/modules/common"
import { At } from "@phosphor-icons/react"

export interface AddressesProps {
    addresses: Array<string>
    onAddressClick: (address: string) => void
    text?: string
}

export const Addresses: FC<AddressesProps> = ({ addresses, onAddressClick, text = "Recently" }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <At />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="gap-2max-w-[400px]">
                
                {
                    addresses.length === 0 ? (
                        <div className="text-sm text-muted-foreground">No addresses found.</div>
                    ) : (
                        <>
                            {
                                addresses.map((address) => (
                                    <DropdownMenuItem
                                        key={address}
                                        onClick={() => onAddressClick(address)}
                                    >
                                        <div className="flex items-center gap-4 justify-between">
                                            <div className="text-sm text-muted-foreground">{text}</div>
                                            <div className="text-sm">{truncateString(address)}</div>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                        </>
                    )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


