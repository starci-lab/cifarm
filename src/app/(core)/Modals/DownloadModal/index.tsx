import React, { FC } from "react"
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { DOWNLOAD_DISCLOSURE } from "@/app/(core)/constants"
import { DownloadPackage } from "./DownloadPackage" 

export const DownloadModal: FC = () => {
    const { toggle, isOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        DOWNLOAD_DISCLOSURE
    )
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Download
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <DownloadPackage packageId="1" name="NFT Assets Package" description="Download the NFT assets package. Will download all the assets in the package." />
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
