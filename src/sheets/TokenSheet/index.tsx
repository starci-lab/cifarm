import {
    Sheet,
    SheetContent,
} from "@/components"
import React, { FC } from "react"
import { useIsMobile } from "@/hooks"
import { useDisclosure } from "react-use-disclosure"
import { TokenSheetPage, useAppSelector } from "@/redux"
import { MainContent } from "./MainContent"
import { TransferContent } from "./TransferContent"
import { TOKEN_SHEET_DISCLOSURE, useSingletonHook } from "@/singleton"

export const TokenSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        TOKEN_SHEET_DISCLOSURE
    )

    const isMobile = useIsMobile()

    const tokenSheetPage = useAppSelector((state) => state.sheetsReducer.tokenSheet.page)

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
