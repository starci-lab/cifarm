import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { serialize } from "@/modules/serialization"

export interface GridTableProps<TItem extends string | object> {
  items: Array<TItem>;
  contentCallback: (item: TItem) => React.ReactNode;
  enableScroll?: boolean;
  emptyMessage?: string;
  classNames?: {
    container?: string;
    item?: string;
    scrollArea?: string;
  };
  keyCallback?: (item: TItem) => string;
}

export const GridTable = <TItem extends string | object>({
    items,
    contentCallback,
    enableScroll = true,
    emptyMessage = "No items found",
    classNames = {},
    keyCallback,
}: GridTableProps<TItem>) => {
    const content = (
        <>
            {items.map((item) => {
                return (
                    <React.Fragment key={keyCallback ? keyCallback(item) : serialize(item)}>
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
                    <ScrollArea className={cn("h-[300px] w-fit min-w-fit relative -top-4 -left-4 p-4 w-[calc(100%+32px)]", classNames.scrollArea)}>
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
