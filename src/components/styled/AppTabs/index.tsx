import React, { FC } from "react"
import { Tabs, TabsList, TabsTrigger } from "../../ui"
import { cn } from "@/utils"
export interface AppTap {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface AppTabsProps {
  tabs: Array<AppTap>;
  selectedTab: string;
  onSelectTab: (tab: string) => void;
  color?: "default" | "primary" | "secondary";
  classNames?: {
    base?: string;
    list?: string;
  };
}

export const AppTabs: FC<AppTabsProps> = ({
    tabs,
    selectedTab,
    onSelectTab,
    color = "default",
    classNames = {},
}) => {
    return (
        <Tabs
            onValueChange={onSelectTab}
            value={selectedTab}
            className={cn(classNames?.base)}
        >
            <TabsList className={cn(classNames?.list, "p-1")}>
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="flex items-center gap-2 w-full"
                        color={color}
                    >
                        {tab.icon}
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
