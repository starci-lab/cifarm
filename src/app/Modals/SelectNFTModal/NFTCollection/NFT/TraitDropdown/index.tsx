import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, ExtendedButton } from "@/components"
import { NFTTrait } from "@/modules/blockchain"
import React, { FC } from "react"

interface TraitDropdownProps {
    attributes: Array<NFTTrait>
}

export const TraitDropdown: FC<TraitDropdownProps> = ({ attributes }) => {
    return <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
            <ExtendedButton className="w-full" variant="outline">
                Attributes ({attributes.length})
            </ExtendedButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {
                attributes.map(
                    attribute => (
                        <DropdownMenuItem key={attribute.key} className="flex gap-2 justify-between">
                            <div className="text-sm">{attribute.key}</div>
                            <div className="text-sm text-muted-foreground">{trait.value}</div>
                        </DropdownMenuItem>
                    )
                )
            }
        </DropdownMenuContent>
    </DropdownMenu>
}
