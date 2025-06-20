"use client"

import React, { FC } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"
import {
    Selection,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    Spacer,
} from "@/components"
import { useAppDispatch, useAppSelector } from "@/redux"
import { setSidebarTab, SidebarTab } from "@/redux/slices"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"
import { Logo } from "../../_components/Header/Logo"
import { House, Layout, Wallet } from "@phosphor-icons/react"
import { externalNavItems } from "@/config"

export const AppSidebar: FC = () => {
    const isMobile = useIsMobile()
    const dispatch = useAppDispatch()
    const sidebarTab = useAppSelector((state) => state.sidebarReducer.tab)
    const router = useRouterWithSearchParams()
    return (
        <>
            {!isMobile && (
                <Sidebar className="px-6 py-4 text-sidebar-primary bg-content-4">
                    <SidebarHeader className="p-0 gap-0">
                        <Logo />
                        <Spacer y={4} />
                        <Separator variant="secondary" />
                        <Spacer y={4} />
                        <Selection
                            title="Home"
                            selected={sidebarTab === SidebarTab.Home}
                            onClick={() => {
                                dispatch(setSidebarTab(SidebarTab.Home))
                                router.push(`${pathConstants.home}`)
                            }}
                            icon={<House />}
                        />
                        <Spacer y={2} />
                        <Selection
                            title="Assets"
                            selected={sidebarTab === SidebarTab.Assets}
                            onClick={() => {
                                dispatch(setSidebarTab(SidebarTab.Assets))
                                router.push(`${pathConstants.home}/${pathConstants.assets}`)
                            }}
                            icon={<Wallet />}
                        />
                        <Spacer y={2} />
                        <Selection
                            title="DApps"
                            selected={sidebarTab === SidebarTab.DApps}
                            onClick={() => {
                                dispatch(setSidebarTab(SidebarTab.DApps))
                                router.push(`${pathConstants.home}/${pathConstants.dapps}`)
                            }}
                            icon={<Layout />}
                        />
                        <Spacer y={4} />
                        <Separator variant="secondary" />
                        <Spacer y={4} />
                        {
                            externalNavItems.map((item) => (
                                <Selection
                                    key={item.key}
                                    title={item.name}
                                    isExternal={true}
                                    selected={false}
                                    icon={item.icon}
                                    onClick={item.action}
                                />
                            ))
                        }
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
