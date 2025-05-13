"use client"
import { AppTabs, BlurEffect, Header, Image, Spacer } from "@/components"
import { HomeTab, setHomeTab, useAppDispatch, useAppSelector } from "@/redux"
import { FC } from "react"
import { OverviewTab } from "./OverviewTab"
import React from "react"
import { ItemsTab } from "./ItemsTab"

const Page: FC = () => {
    const homeTab = useAppSelector((state) => state.tabReducer.homeTab)

    const dispatch = useAppDispatch()

    const renderContent = () => {
        switch (homeTab) {
        case HomeTab.Overview:
            return <OverviewTab />
        case HomeTab.Items:
            return <ItemsTab />
        }
    }
    return (
        <div className="relative">
            <BlurEffect variant="secondary" size="lg" position="top" />
            <Header title="Home" />
            <div className="flex gap-4 items-center">   
                <Image src="https://cifarm.sgp1.cdn.digitaloceanspaces.com/logo.png" alt="logo" className="w-20 h-20 rounded-lg" />
                <div>
                    <div className="text-4xl font-bold text-text-default">CiFarm</div>
                    <div className="text-text-secondary">A Farm-Thief-Earn social MMO game</div>
                </div>
            </div>
            <Spacer y={6}/>
            <AppTabs
                tabs={[
                    {
                        label: "Overview",
                        value: HomeTab.Overview,
                    },
                    {
                        label: "Items",
                        value: HomeTab.Items,
                    },
                ]}
                selectedTab={homeTab}
                onSelectTab={(tab) => {
                    dispatch(setHomeTab(tab as HomeTab))
                }}
            />
            <Spacer y={4} />
            {renderContent()}
        </div>
    )
}

export default Page
