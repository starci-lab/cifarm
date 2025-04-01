"use client"

import React, { FC } from "react"
import { truncateString } from "@/modules/common"
import { useAppSelector } from "@/redux"
import { SelectChainButton } from "../SelectChainButton"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"
import { ExtendedButton } from "@/components"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Snippet } from "@/components"
import { SearchIcon, SettingsIcon } from "lucide-react"
import { Block } from "@/components"

export const Navbar: FC = () => {
    //get all the data from the Redux store
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const account = accounts.find((account) => account.id === currentId)
    const router = useRouterWithSearchParams()
    //if account is not found, return null
    if (!account) {
        return null
    }
    const { imageUrl, address, username } = account
    return (
        <nav className="w-full px-4 py-2 bg-transparent z-50 sticky top-0">
            <div className="flex justify-between items-center max-w-full">
                <div className="flex gap-2 items-center light">
                    <Block scheme="light">
                        <div className="flex gap-2 items-center">
                            <Block scheme="dark">
                                <div className="w-fit h-fit bg-foreground/50 rounded-full">
                                    <Avatar>
                                        <AvatarImage
                                            src={imageUrl}
                                            alt={username}
                                            className="w-8 h-8"
                                        />
                                    </Avatar>
                                </div>
                            </Block>
                            <div>
                                <div className="text-sm text-foreground font-bold">
                                    {truncateString(username, 8, 0)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {truncateString(address, 4)}
                                </div>
                            </div>
                            <Snippet code={address} />         
                        </div>
                    </Block>
                </div>
                <div className="flex gap-2">
                    <SelectChainButton />
                    <Block scheme="light">
                        <ExtendedButton
                            variant="ghost-secondary"
                            size="icon"
                            className="light"
                        >
                            <SearchIcon className="w-5 h-5" />
                        </ExtendedButton>
                    </Block>    
                    <Block scheme="light">
                        <ExtendedButton
                            className="light"
                            variant="ghost-secondary"
                            size="icon"
                            onClick={() => router.push(pathConstants.settings)}
                        >
                            <SettingsIcon className="w-5 h-5" />
                        </ExtendedButton>
                    </Block>
                </div>
            </div>
        </nav>
    )
}
