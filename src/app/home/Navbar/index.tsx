"use client"

import React, { FC } from "react"
import { Avatar, Card, CardBody, Navbar as HeroUiNavbar, Link, NavbarContent, Snippet } from "@heroui/react"
import { truncateString } from "@/modules/common"
import { useAppSelector } from "@/redux"
import { MagnifyingGlassIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"
import { SelectChainButton } from "../SelectChainButton"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"
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
        <HeroUiNavbar isBlurred={false} classNames={{
            base: "bg-transparent",
            wrapper: "px-4 max-w-full",
        }}>
            <NavbarContent justify="start">
                <div className="flex gap-2 items-center">
                    <Card radius="none" disableRipple={true} shadow="none" className="bg-inhenrit" isPressable>
                        <CardBody className="p-0">
                            <div className="flex gap-2 items-center">
                                <Avatar size="sm" src={imageUrl}/>
                                <div>
                                    <div className="text-sm dark text-background font-bold">{username}</div>
                                    <div className="text-xs dark text-foreground-500">{truncateString(address, 4)}</div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Snippet codeString={address} size="sm" hideSymbol classNames={{
                        base: "gap-0 dark text-background bg-inherit p-0",
                    }}/>
                </div>
            </NavbarContent>
            <NavbarContent justify="end">
                <div className="flex gap-2">
                    <SelectChainButton/>
                    <Link className="dark text-background" color="foreground" as="button"><MagnifyingGlassIcon className="w-5 h-5"/></Link>
                    <Link className="dark text-background" onPress={() => router.push(pathConstants.settings)} color="foreground" as="button"><Cog6ToothIcon className="w-5 h-5"/></Link>
                </div>
            </NavbarContent>
        </HeroUiNavbar>
    )
}