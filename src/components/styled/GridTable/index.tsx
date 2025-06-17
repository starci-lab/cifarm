import React, { useEffect, useRef, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/utils"
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
  useContainer?: boolean;
  useGridWrap?: boolean;
  keyCallback?: (item: TItem) => string;
}

export const GridTable = <TItem extends string | object>({
    items,
    contentCallback,
    enableScroll = true,
    emptyMessage = "No items found",
    classNames = {},
    useGridWrap = false,
    useContainer = false,
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

    const containerRef = useRef<HTMLDivElement>(null)
    const [ gridCount, setGridCount ] = useState(0)

    useEffect(() => {
        if (!useGridWrap) return
    
        const minItemWidth = 56 // match minmax(56px, ...)
        const containerPadding = 8 // ScrollArea wrapper has p-2 (8px * 2)
        const containerOffset = 8
    
        const calculateGridCount = () => {
            const width = (containerRef.current?.clientWidth ?? 0) - containerOffset
            const count = Math.floor(width / (minItemWidth + containerPadding))
            setGridCount(count)
        }
    
        calculateGridCount()
    
        const resizeObserver = new ResizeObserver(() => {
            calculateGridCount()
        })
    
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }
    
        return () => {
            resizeObserver.disconnect()
        }
    }, [useGridWrap])

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
                                ref={containerRef}
                                className={cn(
                                    "justify-center grid gap-2 relative w-full",
                                    useContainer && "p-2 rounded-lg bg-content-2",
                                    classNames?.container
                                )}
                                style={
                                    useGridWrap
                                        ? { gridTemplateColumns: `repeat(${gridCount}, minmax(0, 56px))` }
                                        : undefined
                                }
                            >
                                {content}
                            </div>
                        </ScrollArea>
                    </div>
                ) : (
                    <div    
                        ref={containerRef}            
                        className={cn(
                            "justify-center grid gap-2 relative w-full",
                            useContainer && " p-2 rounded-lg bg-content-2",
                            classNames?.container
                        )}
                        style={
                            useGridWrap
                                ? { gridTemplateColumns: `repeat(${gridCount}, minmax(0, 56px))` }
                                : undefined
                        }
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
