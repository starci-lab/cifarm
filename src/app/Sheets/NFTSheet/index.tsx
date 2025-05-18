import {
    Sheet,
    SheetContent,
} from "@/components"
import React, { FC } from "react"
import {
    useIsMobile,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import {
    SHEET_NFT_DISCLOSURE,
} from "@/app/constants"
import {
    NFTSheetPage,
    useAppSelector,
} from "@/redux"

import { MainContent } from "./MainContent"
import { TransferContent } from "./TransferContent"

export const NFTSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(SHEET_NFT_DISCLOSURE)
    const isMobile = useIsMobile()
    const nftSheetPage = useAppSelector((state) => state.sheetReducer.nftSheetPage)

    const renderContent = () => {
        switch (nftSheetPage) {
        case NFTSheetPage.Main:
            return <MainContent />
        case NFTSheetPage.Transfer:
            return <TransferContent />
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={toggle} >
            <SheetContent
                side={isMobile ? "bottom" : "right"}
                className="flex flex-col justify-between max-h-screen overflow-y-scroll"
            >
                {renderContent()}
            </SheetContent>
        </Sheet>
    )
}
