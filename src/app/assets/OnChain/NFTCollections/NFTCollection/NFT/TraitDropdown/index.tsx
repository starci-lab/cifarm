import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, ExtendedButton } from "@/components"
import { NFTTrait } from "@/modules/blockchain"
import React, { FC } from "react"

interface TraitDropdownProps {
    traits: Array<NFTTrait>
}

export const TraitDropdown: FC<TraitDropdownProps> = ({ traits }) => {
    return <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
            <ExtendedButton className="w-full" variant="outline">
                Traits ({traits.length})
            </ExtendedButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {
                traits.map(
                    trait => (
                        <DropdownMenuItem key={trait.key} className="flex gap-2 justify-between">
                            <div className="text-sm">{trait.key}</div>
                            <div className="text-sm text-muted-foreground">{trait.value}</div>
                        </DropdownMenuItem>
                    )
                )
            }
        </DropdownMenuContent>
    </DropdownMenu>
}
