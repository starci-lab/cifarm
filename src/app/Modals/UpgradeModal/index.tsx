import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Title,
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { UPGRADE_DISCLOSURE } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName, ModalName } from "@/game"

export const UpgradeModal: FC = () => {
    const { toggle, isOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        UPGRADE_DISCLOSURE
    )
    
    return (
        <Dialog open={isOpen} onOpenChange={(value) => {
            toggle(value)
            if (!value) {
                ExternalEventEmitter.emit(ExternalEventName.CloseModal, {
                    modalName: ModalName.Upgrade,
                })
            }
        }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Upgrade
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <div>
                        <Title title="Upgrade" tooltipString="This controls the audio settings." classNames={{
                            title: "text-base",
                            tooltip: "w-4 h-4"
                        }}/>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
