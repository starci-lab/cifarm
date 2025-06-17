import {
    ExtendedButton,
    Sheet,
    SheetContent,
} from "@/components"
import React, { FC } from "react"
import {
    useIsMobile,
    useRouterWithSearchParams,
} from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import {
    SHEET_BOTTOM_NAV_DISCLOSURE,
} from "@/singleton"
import { useSelector } from "react-redux"
import { RootState } from "@/redux"
export const BottomNavSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(SHEET_BOTTOM_NAV_DISCLOSURE)
    const router = useRouterWithSearchParams()
    const isMobile = useIsMobile()

    const { items } = useSelector((state: RootState) => state.sheetReducer.bottomNavSheet)

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
                    {items?.map((item) => (
                        <ExtendedButton
                            key={item.name}
                            onClick={() => {
                                router.push(item.path)
                                toggle(false)
                            }}
                            variant="flat"
                            color="secondary"
                            className="flex items-center p-4 hover:bg-muted transition-colors text-left w-full gap-0"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-md">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium">{item.name}</h4>
                            </div>
                        </ExtendedButton>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
