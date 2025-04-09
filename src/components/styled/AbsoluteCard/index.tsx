import { cn } from "@/lib/utils"
import React, { FC, PropsWithChildren } from "react"
import { useDraggable } from "@dnd-kit/core"

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
    
    return (
        <div className={cn("relative grid place-items-center relative w-fit h-fit", classNames.container)}> 
            <Draggable  
                id={id}
                dragDisabled={dragDisabled}
                classNames={classNames}
            >
                {children}
            </Draggable>
        </div>
    )
}

export interface DraggableProps extends PropsWithChildren {
    draggable?: boolean;
    id: string;
}