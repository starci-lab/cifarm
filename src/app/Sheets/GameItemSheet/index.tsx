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
    SHEET_GAME_ITEM_DISCLOSURE,
} from "@/app/constants"


export const GameItemSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(SHEET_GAME_ITEM_DISCLOSURE)
    const isMobile = useIsMobile()

    const renderContent = () => {
        return <div>GameItemSheet</div>
    }

    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent
                side={isMobile ? "bottom" : "right"}
                className="flex flex-col justify-between"
            >
                {renderContent()}
            </SheetContent>
        </Sheet>
    )
}
