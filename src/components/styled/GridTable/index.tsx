import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export interface GridTableProps<TItem extends string | object> {
  items: Array<TItem>;
  contentCallback: (item: TItem) => React.ReactNode;
  enableScroll?: boolean;
  emptyMessage?: string;
  classNames?: {
    container?: string;
    item?: string;
  };
}

export const GridTable = <TItem extends string | object>({
    items,
    contentCallback,
    enableScroll = true,
    emptyMessage = "No items found",
    classNames,
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
                    <ScrollArea className="h-[300px] w-fit min-w-fit relative -top-4 -left-4 p-4 w-[calc(100%+32px)]">
                        <div className={cn("flex gap-2 flex-wrap", classNames?.container)}>
                            {content}
                        </div>
                    </ScrollArea>
                ) : (
                    <div className={cn("flex gap-2 flex-wrap", classNames?.container)}>
                        {content}
                    </div>
                )
            ) : (
                <div className="text-muted-foreground">{emptyMessage}</div>
            )}
        </>
    )
}
