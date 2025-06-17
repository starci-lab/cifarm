import {
    Sheet,
    SheetContent,
} from "@/components"
import React, { FC } from "react"
import { useIsMobile } from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { TokenSheetPage, useAppSelector } from "@/redux"
import { MainContent } from "./MainContent"
import { TransferContent } from "./TransferContent"
import { SHEET_TOKEN_DISCLOSURE } from "@/singleton"

export const TokenSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_TOKEN_DISCLOSURE
    )

    const isMobile = useIsMobile()

    const tokenSheetPage = useAppSelector((state) => state.sheetReducer.tokenSheetPage)

    const renderContent = () => {
        switch (tokenSheetPage) {
        case TokenSheetPage.Main:
            return <MainContent />
        case TokenSheetPage.Transfer:
            return <TransferContent />
        }
    }
    
    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent side={isMobile ? "bottom" : "right"} className="flex flex-col justify-between">
                {renderContent()}
            </SheetContent>
        </Sheet>
    )
}
