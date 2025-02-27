"use client"

import React, { FC } from "react"
import { Navbar as HeroUiNavbar, NavbarContent, Tab, Tabs } from "@heroui/react"
import { AssetTab, setAssetTab, useAppDispatch, useAppSelector } from "@/redux"

export const BottomNavbar: FC = () => {
    const assetTab = useAppSelector((state) => state.tabReducer.assetTab)
    const dispatch = useAppDispatch()
    return (
        <HeroUiNavbar
            isBlurred={false}
            classNames={{
                base: "m-auto fixed top-auto bottom-0 left-0 border-t h-16",
                wrapper: "px-4 max-w-[500px] w-full",
            }}
        >
            <NavbarContent>
                <Tabs size="lg" color="primary" classNames={{
                    base: "w-full",
                    tabList: "w-full",
                    tabContent: "group-data-[selected=true]:light group-data-[selected=true]:text-background",
                }} selectedKey={assetTab} variant="light" onSelectionChange={(assetTab) => dispatch(setAssetTab(assetTab))} aria-label="Options">
                    <Tab key={AssetTab.Tokens} title="Tokens"/>
                    <Tab key={AssetTab.NFTs} title="NFTs"/>
                    <Tab key={AssetTab.InGameItems} title="In-Game Items"/>
                </Tabs>        
            </NavbarContent>
        </HeroUiNavbar>
    )
}
