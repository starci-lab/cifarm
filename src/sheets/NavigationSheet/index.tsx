import { List, Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle } from "@/components"
import React, { FC } from "react"
import { useIsMobile } from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { NAVIGATION_SHEET_DISCLOSURE } from "@/singleton"
import { ArrowSquareOut } from "@phosphor-icons/react"
import { externalNavItems } from "@/config"

export const NavigationSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        NAVIGATION_SHEET_DISCLOSURE
    )
    const isMobile = useIsMobile()

    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent
                side={isMobile ? "bottom" : "right"}
                className="flex flex-col justify-between w-full sm:w-[400px]"
            >
                <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <SheetBody>
                    <List enableScroll={false} items={externalNavItems} contentCallback={(item) => {
                        return <div onClick={item.action} className="flex flex-row items-center justify-between gap-2 px-3 py-2 bg-content-2">
                            <div className="flex flex-row items-center gap-2">
                                {item.icon}
                                <div>{item.name}</div>
                            </div>
                            <ArrowSquareOut/>
                        </div>
                    }} />
                </SheetBody>
            </SheetContent>
        </Sheet>
    )
}
