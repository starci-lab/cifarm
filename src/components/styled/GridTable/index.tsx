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
    scrollAreaWrapper?: string;
    scrollArea?: string;
  };
  useGridWrapCss?: boolean;
  keyCallback?: (item: TItem) => string;
}

export const GridTable = <TItem extends string | object>({
    items,
    contentCallback,
    enableScroll = true,
    emptyMessage = "No items found",
    classNames = {},
    useGridWrapCss = false,
    keyCallback,
}: GridTableProps<TItem>) => {
    const content = (
        <>
            {items.map((item) => {
                return (
                    <React.Fragment
                        key={keyCallback ? keyCallback(item) : serialize(item)}
                    >
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
                    <div
                        className={cn(
                            "relative h-[300px] max-h-[300px]",
                            classNames.scrollAreaWrapper
                        )}
                    >
                        <ScrollArea
                            className={cn(
                                "h-[calc(300px+32px)] max-h-[calc(300px+32px)] w-fit min-w-fit relative -top-4 -left-4 p-4 w-[calc(100%+32px)]",
                                classNames.scrollArea
                            )}
                        >
                            <div
                                className={cn(
                                    {
                                        "justify-center [grid-template-columns:repeat(auto-fit,minmax(56px,max-content))]":
                      useGridWrapCss,
                                    },
                                    "grid gap-2 w-fit relative w-full",
                                    classNames?.container
                                )}
                            >
                                {content}
                            </div>
                        </ScrollArea>
                    </div>
                ) : (
                    <div
                        className={cn(
                            {
                                "justify-center [grid-template-columns:repeat(auto-fit,minmax(56px,max-content))]":
                  useGridWrapCss,
                            },
                            "grid gap-2 w-fit relative w-full",
                            classNames?.container
                        )}
                    >
                        {content}
                    </div>
                )
            ) : (
                <div className="text-muted-foreground">{emptyMessage}</div>
            )}
        </>
    )
}
