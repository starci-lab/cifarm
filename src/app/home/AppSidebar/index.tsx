"use client"

import React, { FC } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"
import {
    Avatar,
    AvatarImage,
    Selection,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    Spacer,
} from "@/components"
import {
    LayoutGridIcon,
    WalletIcon,
    HomeIcon,
    TwitterIcon,
    BookIcon,
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux"
import { setSidebarTab, SidebarTab } from "@/redux/slices"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"

export const AppSidebar: FC = () => {
    const isMobile = useIsMobile()
    const dispatch = useAppDispatch()
    const sidebarTab = useAppSelector((state) => state.sidebarReducer.tab)
    const router = useRouterWithSearchParams()
    return (
        <>
            {!isMobile && (
                <Sidebar className="px-6 py-4 text-sidebar-primary bg-sidebar">
                    <SidebarHeader className="p-0 gap-0">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src="/logo.png" alt="Logo" />
                            </Avatar>
                            <div>CiFarm</div>
                        </div>
                        <Spacer y={4} />
                        <Separator />
                        <Spacer y={4} />
                        <Selection
                            title="Home"
                            selected={sidebarTab === SidebarTab.Home}
                            onClick={() => {
                                dispatch(setSidebarTab(SidebarTab.Home))
                                router.push(`${pathConstants.home}`)
                            }}
                            icon={<HomeIcon className="w-5 h-5" />}
                        />
                        <Spacer y={2} />
                        <Selection
                            title="Assets"
                            selected={sidebarTab === SidebarTab.Assets}
                            onClick={() => {
                                dispatch(setSidebarTab(SidebarTab.Assets))
                                router.push(`${pathConstants.home}/${pathConstants.assets}`)
                            }}
                            icon={<WalletIcon className="w-5 h-5" />}
                        />
                        <Spacer y={2} />
                        <Selection
                            title="DApps"
                            selected={sidebarTab === SidebarTab.DApps}
                            onClick={() => {
                                dispatch(setSidebarTab(SidebarTab.DApps))
                                router.push(`${pathConstants.home}/${pathConstants.dapps}`)
                            }}
                            icon={<LayoutGridIcon className="w-5 h-5" />}
                        />
                        <Spacer y={4} />
                        <Separator />
                        <Spacer y={4} />
                        <Selection
                            title="Docs"
                            isExternal={true}
                            selected={false}
                            icon={<BookIcon className="w-5 h-5" />}
                        />
                        <Spacer y={2} />
                        <Selection
                            title="X"
                            isExternal={true}
                            selected={false}
                            icon={<TwitterIcon className="w-5 h-5" />}
                        />
                        <Spacer y={4} />
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup />
                        <SidebarGroup />
                    </SidebarContent>
                    <SidebarFooter />
                </Sidebar>
            )}
        </>
    )
}
