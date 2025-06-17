import { Sheet, SheetContent } from "@/components"
import React, { FC } from "react"
import { useIsMobile } from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { BOTTOM_NAV_SHEET_DISCLOSURE } from "@/singleton"

export const BottomNavSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        BOTTOM_NAV_SHEET_DISCLOSURE
    )
    const isMobile = useIsMobile()

    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent
                side={isMobile ? "bottom" : "right"}
                className="flex flex-col justify-between w-full sm:w-[400px]"
            >
                <div>
                    <h3 className="text-lg font-semibold">Navigation</h3>
                </div>
                <div className="flex flex-col gap-2 sm:flex-col w-full overflow-y-auto">
                </div>
            </SheetContent>
        </Sheet>
    )
}
