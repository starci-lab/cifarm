import React, { FC } from "react"
import { Tabs, TabsList, TabsTrigger } from "../../ui"

export interface AppTap {
    label: string
    value: string
    icon?: React.ReactNode
}

export interface AppTabsProps {
    tabs: Array<AppTap>
    selectedTab: string
    onSelectTab: (tab: string) => void
}

export const AppTabs: FC<AppTabsProps> = ({ tabs, selectedTab, onSelectTab }) => {
    return (
        <Tabs onValueChange={onSelectTab} value={selectedTab}>
            <TabsList>
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                        {tab.icon}
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
