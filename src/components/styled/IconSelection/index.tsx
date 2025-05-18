"use client"
import { Card, CardBody, Spinner, } from "@/components"
import { cn } from "@/lib/utils"
import { CaretRight } from "@phosphor-icons/react"
import React, { FC, ReactNode } from "react"

export type IconSelectionProps = {
    icon: ReactNode;
    text?: string;
    description?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    classNames?: {
        text?: string;
        description?: string;
    }
}

export const IconSelection: FC<IconSelectionProps> = ({ icon, onClick, classNames, text, description, disabled, isLoading, ...props }: IconSelectionProps) => {
    return (
        <Card
            pressable
            disabled={disabled || isLoading}
            className="flex justify-between items-center rounded-lg"
            onClick={onClick}
            {...props}
        >
            <CardBody className="flex justify-between items-center w-full p-3">
                <div className="flex items-center gap-2">
                    {isLoading && <Spinner />}
                    <div className="flex gap-2 items-center">
                        {icon}
                        <div>
                            <div className={cn(classNames?.text)}>{text}</div>
                            {description && <div className={cn("text-sm",classNames?.description)}>{description}</div>}
                        </div>
                    </div>
                </div>
                <CaretRight />
            </CardBody>
        </Card>
    )
}
