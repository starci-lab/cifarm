import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface GridTableProps<TItem extends string | object> {
  items: Array<TItem>;
  contentCallback: (item: TItem) => React.ReactNode;
  enableScroll?: boolean;
  emptyMessage?: string;
}

export const GridTable = <TItem extends string | object>({
    items,
    contentCallback,
    enableScroll = true,
    emptyMessage = "No items found",
}: GridTableProps<TItem>) => {
    const content = (
        <>
            {items.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        {contentCallback(item)}
                    </React.Fragment>
                )
            })}
        </>
    )
    return (
        <>
            {items.length > 0 ? (
                enableScroll ? (
                    <ScrollArea className="h-[300px] relative -top-4 -left-4 p-4 w-[calc(100%+32px)]">
                        <div className="grid grid-cols-3 gap-2">
                            {content}
                        </div>
                    </ScrollArea>
                ) : (
                    content
                )
            ) : (
                <div className="text-muted-foreground">{emptyMessage}</div>
            )}
        </>
    )
}
