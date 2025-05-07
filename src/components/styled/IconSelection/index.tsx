"use client"
import { PressableCard, PressableCardProps } from "@/components"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import React, { FC, ReactNode } from "react"

export type IconSelectionProps = PressableCardProps & {
    icon: ReactNode;
    text?: string;
    description?: string;
    classNames?: {
        text?: string;
        chevron?: string;
    }
}

export const IconSelection: FC<IconSelectionProps> = ({ icon, onClick, classNames, text, description, ...props }: IconSelectionProps) => {
    return (
        <PressableCard
            className="flex justify-between items-center p-3 rounded-lg"
            showBorder={false}
            onClick={onClick}
            {...props}
        >
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-2 items-center">
                    {icon}
                    <div>
                        <div className={cn(classNames?.text)}>{text}</div>
                        {description && <div className={cn("text-muted-foreground text-sm")}>{description }</div>}
                    </div>
                </div>
                <ChevronRightIcon className={cn("w-3.5 h-3.5", classNames?.chevron)}    />
            </div>
        </PressableCard>
    )
}
