import React from "react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface ScrollableListProps<TItem extends object> {
  items: Array<TItem>;
  contentCallback: (item: TItem) => React.ReactNode;
}

export const ScrollableList = <TItem extends object>({
    items,
    contentCallback,
}: ScrollableListProps<TItem>) => {
    return (
        <ScrollArea className="h-[300px] relative -top-4 -left-4 p-4 w-[calc(100%+32px)]">
            <Card>
                {items.map((item, index) => {
                    const last = index === items.length - 1
                    return (
                        <React.Fragment key={index}>
                            {contentCallback(item)}
                            {!last && <Separator />}
                        </React.Fragment>
                    )
                })}
            </Card>
        </ScrollArea>
    )
}
