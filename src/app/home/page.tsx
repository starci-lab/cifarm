"use client"
import { Container } from "@/components"
import { truncateString } from "@/modules/common"
import { useAppSelector } from "@/redux"
import { Avatar, Card, CardBody, Link, Snippet } from "@heroui/react"
import React, { FC } from "react"
import { Cog6ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { SelectChainButton } from "./SelectChainButton"
const Page: FC = () => {
    //get all the data from the Redux store
    const accounts = useAppSelector((state) => state.sessionReducer.accounts.accounts)
    const currentId = useAppSelector((state) => state.sessionReducer.accounts.currentId)
    const account = accounts.find((account) => account.id === currentId) 
    //if account is not found, return null
    if (!account) {
        return null
    }
    const { imageUrl, address } = account
    return (
        <Container hasPadding>
            <div className="h-full">
                <div className="flex gap-2 items-center justify-between">
                    <div className="flex-1 flex justify-start">
                        <div className="flex gap-2 items-center">
                            <Card disableRipple={true} shadow="none" isPressable>
                                <CardBody className="p-0">
                                    <div className="flex gap-2 items-center">
                                        <Avatar size="sm" src={imageUrl}/>
                                        <div>
                                            <div className="text-sm">{truncateString(address)}</div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            <Snippet codeString={address} size="sm" hideSymbol classNames={{
                                base: "gap-0 bg-inherit p-0",
                            }}/>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <div className="flex gap-2">
                            <SelectChainButton/>
                            <Link color="foreground" as="button"><MagnifyingGlassIcon className="w-5 h-5"/></Link>
                            <Link color="foreground" as="button"><Cog6ToothIcon className="w-5 h-5"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Page