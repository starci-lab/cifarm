import { PressableCard } from "@/components"
import React, { FC } from "react"

interface DAppCardProps {
    title: string
    description: string
    image: string
    onClick: () => void
}

export const DAppCard: FC<DAppCardProps> = ({ title, description, onClick }) => {
    return (
        <PressableCard className="flex flex-col gap-2" onClick={onClick}>
            <div className="font-bold">{title}</div>
            <div className="text-xs text-muted-foreground">{description}</div>
        </PressableCard>
    )
}
