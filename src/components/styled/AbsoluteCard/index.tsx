import { cn } from "@/lib/utils"
import React, { FC, PropsWithChildren } from "react"
import { PointerSensor, useSensors, useDraggable, useSensor } from "@dnd-kit/core"
import { DndContext } from "@dnd-kit/core"
import { assetUiMap } from "@/modules/assets/ui"
import { AssetUi } from "@/modules/assets"
import { ScaledImage } from "@/components"

interface AbsoluteCardProps extends PropsWithChildren {
  classNames: {
    container?: string;
    content?: string;
  };
}

export const AbsoluteCard: FC<AbsoluteCardProps> = ({
    children,
    classNames,
}) => {
    return (
        <div className={cn("relative", classNames.container)}>
            <div
                className={cn(
                    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                    "w-16 h-16",
                    classNames.content
                )}
            >
                {children}
            </div>
        </div>
    )
}

export interface DraggableAbsoluteCardProps extends AbsoluteCardProps {
    dragDisabled?: boolean;
    id: string;
}

export const Draggable = ({
    children,
    dragDisabled = false,
    classNames,
    id,
}: DraggableAbsoluteCardProps) => {
    const {attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
        disabled: dragDisabled,
    })
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined
    const className = isDragging ? cn("fixed z-50") : undefined
    return (
        <div 
            id={id}
            ref={setNodeRef}  {...listeners} {...attributes} style={style}
            className={cn(
                "absolute",
                "w-16 h-16",
                className,
                classNames.content
            )}
        >
            {children}
        </div>
    )
}
export const DraggableAbsoluteCard: FC<DraggableAbsoluteCardProps> = ({
    children,
    classNames,
    dragDisabled = false,
    id,
}) => {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 5,
            },
        }),
    )

    return (
        <DndContext sensors={sensors} onDragEnd={() => {
            // hide the card
            const card = document.getElementById(id)
            if (card) {
                card.style.display = "none"
            }
        }}>
            <div className={cn("relative grid place-items-center relative w-fit h-fit", classNames.container)}> 
                <Draggable  
                    id={id}
                    dragDisabled={dragDisabled}
                    classNames={classNames}
                >
                    {children}
                </Draggable>
            </div>
        </DndContext>
    )
}

export interface DraggableProps extends PropsWithChildren {
    draggable?: boolean;
    id: string;
}