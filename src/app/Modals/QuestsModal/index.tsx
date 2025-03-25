"use client"
import { QUESTS_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC, ReactNode, useState } from "react"
import { EventBus, EventName, ModalName } from "@/game/event-bus"
import { DailyTab } from "./DailyTab"
import { GameTab } from "./GameTab"
import { PartnershipTab } from "./PartnershipTab"
import { SocialTab } from "./SocialTab"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useDisclosure } from "@/hooks"

export enum QuestsTab {
    Game = "Game",
    Daily = "Daily",
    Social = "Social",
    Partnership = "Partnership"
}

export const QuestsModal: FC = () => {
    const { onOpenChange, isOpen } =
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
        <Dialog 
            open={isOpen} 
            onOpenChange={(open) => {
                onOpenChange(open)
                if (!open) {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.Quests,
                    })
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Quests</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <Tabs
                        defaultValue={selectedTab}
                        onValueChange={(value) => setSelectedTab(value as QuestsTab)}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value={QuestsTab.Game}>Game</TabsTrigger>
                            <TabsTrigger value={QuestsTab.Daily}>Daily</TabsTrigger>
                            <TabsTrigger value={QuestsTab.Social}>Social</TabsTrigger>
                            <TabsTrigger value={QuestsTab.Partnership}>Partnership</TabsTrigger>
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