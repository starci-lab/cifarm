import { PressableCard, Image, Spacer, Spinner } from "@/components"
import React, { FC } from "react"

interface DAppCardProps {
    title: string
    description: string
    imageUrl: string
    onClick: () => void
    content?: React.ReactNode
    isLoading?: boolean
}

export const DAppCard: FC<DAppCardProps> = ({ title, description, imageUrl, onClick, content, isLoading }) => {
    return (
        <PressableCard onClick={onClick} disabled={isLoading}>
            <div className="flex gap-4">
                <Image src={imageUrl} className="w-20 h-20 object-contain" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        {isLoading && <Spinner />}
                        <div>{title}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{description}</div>
                    <Spacer y={2} />
                    {content}
                </div>
            </div>
        </PressableCard>
    )
}
