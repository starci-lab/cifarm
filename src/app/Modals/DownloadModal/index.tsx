import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    ModalHeader,
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { DOWNLOAD_DISCLOSURE } from "@/app/constants"
import { DownloadPackage } from "./DownloadPackage"
import { ExternalEventEmitter, ExternalEventName, ModalName } from "@/game/events"
export const DownloadModal: FC = () => {
    const { toggle, isOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        DOWNLOAD_DISCLOSURE
    )
    return (
        <Dialog open={isOpen} onOpenChange={(value) => {
            toggle(value)
            if (!value) {
                ExternalEventEmitter.emit(ExternalEventName.CloseExternalModal, {
                    modalName: ModalName.Download,
                })
            }
        }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader
                            title="Download"
                            description="Select the package you want to download"
                        />
                    </DialogTitle>
                </DialogHeader>
                <DownloadPackage packageId="1" name="NFT Assets Package" description="Download the NFT assets package. Will download all the assets in the package." />
            </DialogContent>
        </Dialog>
    )
}
