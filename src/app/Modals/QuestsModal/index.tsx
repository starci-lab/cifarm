"use client"
import { QUESTS_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC, ReactNode } from "react"
import { DailyTab } from "./DailyTab"
import { GameTab } from "./GameTab"
import { PartnershipTab } from "./PartnershipTab"
import { SocialTab } from "./SocialTab"
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useDisclosure } from "react-use-disclosure"
import { useAppSelector, useAppDispatch, QuestsTab as QuestsTabEnum, setQuestsTab } from "@/redux"
import { ModalHeader } from "@/components"
export const QuestsModal: FC = () => {
    const { toggle, isOpen } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(QUESTS_DISCLOSURE)

    const selectedTab = useAppSelector((state) => state.tabReducer.questsTab)
    const dispatch = useAppDispatch()

    const renderTab = () => {
        const map: Record<QuestsTabEnum, ReactNode> = {
            [QuestsTabEnum.Social]: <SocialTab />,
            [QuestsTabEnum.Game]: <GameTab />,
            [QuestsTabEnum.Daily]: <DailyTab />,
            [QuestsTabEnum.Partnership]: <PartnershipTab />,
        }
        return map[selectedTab]
    }
    
    return (
        <Dialog 
            open={isOpen} 
            onOpenChange={toggle}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <ModalHeader title="Quests" />
                </DialogHeader>
                <div>
                    <Tabs
                        defaultValue={selectedTab}
                        onValueChange={(value) => dispatch(setQuestsTab(value as QuestsTabEnum))}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value={QuestsTabEnum.Social}>Social</TabsTrigger>
                            <TabsTrigger value={QuestsTabEnum.Game}>Game</TabsTrigger>
                            <TabsTrigger value={QuestsTabEnum.Daily}>Daily</TabsTrigger>
                            <TabsTrigger value={QuestsTabEnum.Partnership}>Partnership</TabsTrigger>
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