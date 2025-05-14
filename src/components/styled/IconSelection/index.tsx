"use client"
import { PressableCard, PressableCardProps } from "@/components"
import { cn } from "@/lib/utils"
import { CaretRight } from "@phosphor-icons/react"
import React, { FC, ReactNode } from "react"

export type IconSelectionProps = PressableCardProps & {
    icon: ReactNode;
    text?: string;
    description?: ReactNode;
    classNames?: {
        text?: string;
        description?: string;
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
                        {description && <div className={cn("text-sm",classNames?.description)}>{description}</div>}
                    </div>
                </div>
                <CaretRight />
            </div>
        </PressableCard>
    )
}
