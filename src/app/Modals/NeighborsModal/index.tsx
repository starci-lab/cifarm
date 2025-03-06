"use client"
import { NEIGHBORS_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Spacer,
    Tab,
    Tabs,
    useDisclosure,
} from "@heroui/react"
import React, { FC, ReactNode, useState } from "react"
import { WorldTab } from "./WorldTab"
import { FolloweesTab } from "./FolloweesTab"
import { EventBus, EventName, ModalName } from "@/game/event-bus"

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
        <Modal
            disableAnimation={true}
            placement="bottom"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={async () => {
                onClose()
                EventBus.emit(EventName.CloseModal, {
                    modalName: ModalName.Neighbors,
                })
            }}
        >
            <ModalContent>
                <ModalHeader>Neighbors</ModalHeader>
                <ModalBody>
                    <div>
                        <Tabs
                            disableAnimation={true}
                            color="primary"
                            classNames={{
                                base: "w-full",
                                tabList: "w-full",
                                tabContent:
                  "group-data-[selected=true]:light group-data-[selected=true]:text-background",
                            }}
                            selectedKey={selectedTab}
                            onSelectionChange={(tab) => setSelectedTab(tab as NeighborsTab)}
                        >
                            <Tab key={NeighborsTab.World} title="Worlds" />
                            <Tab key={NeighborsTab.Followees} title="Followees" />
                        </Tabs>
                        <Spacer y={4} />
                        {renderTab()}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export enum NeighborsTab {
    World = "world",
    Followees = "followees",
}