"use client"
import { QUESTS_DISCLOSURE } from "@/app/constants"
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
import { EventBus, EventName, ModalName } from "@/game/event-bus"
import { DailyTab } from "./DailyTab"
import { GameTab } from "./GameTab"
import { PartnershipTab } from "./PartnershipTab"
import { SocialTab } from "./SocialTab"

export const QuestsModal: FC = () => {
    const { onOpenChange, isOpen, onClose } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(QUESTS_DISCLOSURE)
    
    const [selectedTab, setSelectedTab] = useState<QuestsTab>(
        QuestsTab.Game
    )

    const renderTab = () => {
        const map: Record<QuestsTab, ReactNode> = {
            [QuestsTab.Game]: <GameTab />,
            [QuestsTab.Daily]: <DailyTab />,
            [QuestsTab.Social]: <SocialTab />,
            [QuestsTab.Partnership]: <PartnershipTab />,
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
                <ModalHeader>Quests</ModalHeader>
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
                            onSelectionChange={(tab) => setSelectedTab(tab as QuestsTab)}
                        >
                            <Tab key={QuestsTab.Game} title="Game"/>
                            <Tab key={QuestsTab.Daily} title="Daily"/>
                            <Tab key={QuestsTab.Social} title="Social"/>
                            <Tab key={QuestsTab.Partnership} title="Partnership"/>
                        </Tabs>
                        <Spacer y={4} />
                        {renderTab()}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export enum QuestsTab {
    Game,
    Daily,
    Social,
    Partnership
}