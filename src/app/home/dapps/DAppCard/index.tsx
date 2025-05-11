import { PressableCard, Image, Spacer, Spinner, Separator } from "@/components"
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
        <PressableCard onClick={onClick} disabled={isLoading} className="h-full">
            <div className="h-full flex flex-col justify-between">
                <div>
                    <Image src={imageUrl} className="w-32 h-32 object-contain" />
                    <Spacer y={4} />
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-1">
                                {isLoading && <Spinner />}
                                <div className="text-lg">{title}</div>
                            </div>
                            <Spacer y={2} />
                            <Separator />
                            <Spacer y={2} />
                            <div className="text-muted-foreground">{description}</div>
                            <Spacer y={2} />
                        </div>
                    </div>
                </div>
                {content}
            </div>
        </PressableCard>
    )
}
