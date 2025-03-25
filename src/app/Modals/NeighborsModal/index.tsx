"use client"
import { NEIGHBORS_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "@/hooks"
import React, { FC, ReactNode, useState } from "react"
import { WorldTab } from "./WorldTab"
import { FolloweesTab } from "./FolloweesTab"
import { EventBus, EventName, ModalName } from "@/game/event-bus"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export enum NeighborsTab {
    World = "World",
    Followees = "Followees"
}

export const NeighborsModal: FC = () => {
    const { onOpenChange, isOpen, onClose } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_DISCLOSURE)
    
    const [selectedTab, setSelectedTab] = useState<NeighborsTab>(
        NeighborsTab.World
    )

    const renderTab = () => {
        const map: Record<NeighborsTab, ReactNode> = {
            [NeighborsTab.World]: <WorldTab />,
            [NeighborsTab.Followees]: <FolloweesTab />,
        }
        return map[selectedTab]
    }
    
    return (
        <Dialog 
            open={isOpen} 
            onOpenChange={(value) => {
                onOpenChange(value)
                if (!value) {
                    onClose()
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.Neighbors,
                    })
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Neighbors</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <Tabs
                        defaultValue={selectedTab}
                        onValueChange={(value) => setSelectedTab(value as NeighborsTab)}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value={NeighborsTab.World}>Worlds</TabsTrigger>
                            <TabsTrigger value={NeighborsTab.Followees}>Followees</TabsTrigger>
                        </TabsList>
                        <TabsContent value={selectedTab}>
                            {renderTab()}
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}