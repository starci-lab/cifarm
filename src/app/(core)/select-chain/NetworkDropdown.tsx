"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setNetwork, useAppDispatch, useAppSelector } from "@/redux"
import { Network, networkMap } from "@/modules/blockchain" 

export const NetworkDropdown: React.FC = () => {
    const dispatch = useAppDispatch()
    const network = useAppSelector(
        (state) => state.sessionReducer.network
    )
    const networkName = networkMap[network].name
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{networkName}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {Object.values(Network).map((_network) => (
                    <DropdownMenuCheckboxItem
                        key={_network}
                        checked={network === _network}
                        onCheckedChange={() => dispatch(setNetwork(_network))}
                    >
                        {networkMap[_network].name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
