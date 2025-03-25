"use client"

import React, { FC } from "react"
import { truncateString } from "@/modules/common"
import { useAppSelector } from "@/redux"
import { MagnifyingGlassIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"
import { SelectChainButton } from "../SelectChainButton"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const Navbar: FC = () => {
    //get all the data from the Redux store
    const accounts = useAppSelector((state) => state.sessionReducer.accounts.accounts)
    const currentId = useAppSelector((state) => state.sessionReducer.accounts.currentId)
    const account = accounts.find((account) => account.id === currentId) 
    const router = useRouterWithSearchParams()
    //if account is not found, return null
    if (!account) {
        return null
    }
    const { imageUrl, address, username } = account
    return (
        <nav className="w-full px-4 py-2 bg-transparent">
            <div className="flex justify-between items-center max-w-full">
                <div className="flex gap-2 items-center">
                    <Card className="bg-inherit border-0 shadow-none">
                        <CardContent className="p-0">
                            <div className="flex gap-2 items-center">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={imageUrl} alt={username} />
                                </Avatar>
                                <div>
                                    <div className="text-sm font-bold text-background">{truncateString(username, 8, 0)}</div>
                                    <div className="text-xs text-muted-foreground">{truncateString(address, 4)}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <code className="text-sm text-background bg-inherit">{address}</code>
                </div>
                <div className="flex gap-2">
                    <SelectChainButton/>
                    <Button variant="ghost" size="icon" className="text-background">
                        <MagnifyingGlassIcon className="w-5 h-5"/>
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-background"
                        onClick={() => router.push(pathConstants.settings)}
                    >
                        <Cog6ToothIcon className="w-5 h-5"/>
                    </Button>
                </div>
            </div>
        </nav>
    )
}