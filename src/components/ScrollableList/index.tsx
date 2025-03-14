import { Divider, ScrollShadow, Card } from "@heroui/react"
import React from "react"

export interface ScrollableListProps<TItem extends object> {
  items: Array<TItem>;
  contentCallback: (item: TItem) => React.ReactNode;
}

export const ScrollableList = <TItem extends object>({
    items,
    contentCallback,
}: ScrollableListProps<TItem>) => {
    return (
        <ScrollShadow
            hideScrollBar
            className="h-[300px] relative -top-4 -left-4 p-4 w-[calc(100%+32px)]"
        >
            <Card>
                {items.map((item, index) => {
                    const last = index === items.length - 1
                    return (
                        <>
                            {contentCallback(item)}
                            {!last && <Divider />}
                        </>
                    )
                })}
            </Card>
        </ScrollShadow>
    )
}
