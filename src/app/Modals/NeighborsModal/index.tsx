"use client"
import { NEIGHBORS_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "@/hooks"
import React, { FC, ReactNode } from "react"
import { FolloweesTab } from "./FolloweesTab"
import { ExternalEventEmitter, ExternalEventName, ModalName } from "@/game"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ModalHeader } from "@/components"
import { NeighborsTab } from "./Neighbors"
import { NeighborsTab as NeighborsTabEnum, setNeighborsTab, useAppDispatch, useAppSelector } from "@/redux"  

export const NeighborsModal: FC = () => {
    const { onOpenChange, isOpen } =
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
        <Dialog 
            open={isOpen} 
            onOpenChange={(value) => {
                onOpenChange(value)
                if (!value) {
                    ExternalEventEmitter.emit(ExternalEventName.CloseExternalModal, {
                        modalName: ModalName.Neighbors,
                    })
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Neighbors" description="View your neighbors and followees." />
                    </DialogTitle>
                </DialogHeader>
                <Tabs
                    defaultValue={selectedTab}
                    onValueChange={(value) => dispatch(setNeighborsTab(value as NeighborsTabEnum))}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value={NeighborsTabEnum.Neighbors}>Neighbors</TabsTrigger>
                        <TabsTrigger value={NeighborsTabEnum.Followees}>Followees</TabsTrigger>
                    </TabsList>
                    <TabsContent value={selectedTab}>
                        {renderTab()}
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}