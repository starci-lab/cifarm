"use client"

import React, { FC } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
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
import { LayoutGridIcon, WalletIcon, HomeIcon, TwitterIcon, BookIcon } from "lucide-react"
export const AppSidebar: FC = () => {
    const isMobile = useIsMobile()
    return (
        <>
            {!isMobile && (
                <Sidebar className="px-6 py-4 text-sidebar-primary bg-sidebar">
                    <SidebarHeader className="p-0 gap-0">
                        <div className="flex items-center gap-2">  
                            <Avatar>
                                <AvatarImage src="/logo.png" alt="Logo" />
                            </Avatar>
                            <div>
                                CiFarm
                            </div>
                        </div>
                        <Spacer y={4}/>
                        <Separator />
                        <Spacer y={4}/>
                        <Selection title="Home" selected={true} icon={<HomeIcon className="w-5 h-5" />} />
                        <Spacer y={2}/>
                        <Selection title="Assets" selected={false} icon={<WalletIcon className="w-5 h-5" />} />
                        <Spacer y={2}/>
                        <Selection title="DApps" selected={false} icon={<LayoutGridIcon className="w-5 h-5" />} />
                        <Spacer y={4}/>
                        <Separator />
                        <Spacer y={4}/>
                        <Selection title="Docs" isExternal={true} selected={false} icon={<BookIcon className="w-5 h-5" />} />
                        <Spacer y={2}/>
                        <Selection title="X" isExternal={true} selected={false} icon={<TwitterIcon className="w-5 h-5" />} />
                        <Spacer y={4}/>
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
