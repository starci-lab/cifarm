"use client"
import { NEIGHBORS_DISCLOSURE } from "@/app/(core)/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import React, { FC, ReactNode } from "react"
import { FolloweesTab } from "./FolloweesTab"
import { Dialog, DialogContent, DialogHeader, ModalHeader, DialogBody } from "@/components"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components"
import { NeighborsTab } from "./NeighborsTab"
import {
    NeighborsTab as NeighborsTabEnum,
    setNeighborsTab,
    useAppDispatch,
    useAppSelector,
} from "@/redux"

export const NeighborsModal: FC = () => {
    const { toggle, isOpen } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_DISCLOSURE)

    const selectedTab = useAppSelector((state) => state.tabReducer.neighborsTab)
    const dispatch = useAppDispatch()
    const renderTab = () => {
        const map: Record<NeighborsTabEnum, ReactNode> = {
            [NeighborsTabEnum.Neighbors]: <NeighborsTab />,
            [NeighborsTabEnum.Followees]: <FolloweesTab />,
        }
        return map[selectedTab]
    }

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <ModalHeader title="Neighbors" />
                </DialogHeader>
                <DialogBody>
                    <Tabs
                        defaultValue={selectedTab}
                        onValueChange={(value) =>
                            dispatch(setNeighborsTab(value as NeighborsTabEnum))
                        }
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value={NeighborsTabEnum.Neighbors} color="secondary">
              Neighbors
                            </TabsTrigger>
                            <TabsTrigger value={NeighborsTabEnum.Followees} color="secondary">
              Followees
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value={selectedTab}>{renderTab()}</TabsContent>
                    </Tabs>
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
