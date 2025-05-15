import React from "react"
import { Tabs, TabsList, TabsTrigger, ScrollArea, ScrollBar } from "../../ui"

export interface ScrollableTabData {
    label: string
    icon?: React.ReactNode
}
export interface ScrollableTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs>{
    items: Array<ScrollableTabData>
    color?: "default" | "primary" | "secondary"
}
export const ScrollableTabs = ({ items, color, ...props }: ScrollableTabsProps) => {
    return (
        <div className="flex">
            <ScrollArea type="always" className="w-1 flex-1">
                <Tabs
                    className="w-full h-12"
                    {...props}
                >
                    <TabsList className="w-full flex justify-between">
                        {
                            items.map((item) => (
                                <TabsTrigger color={color} key={item.label} value={item.label}>
                                    <div className="flex items-center gap-2">
                                        {item.icon && (
                                            <div className="w-5 h-5">{item.icon}</div>
                                        )}
                                        <div className="text-sm">{item.label}</div>
                                    </div>
                                </TabsTrigger>
                            ))
                        }
                    </TabsList>
                </Tabs>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}
