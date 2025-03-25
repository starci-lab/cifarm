import { CheckIcon } from "@heroicons/react/24/outline"
import React, { FC } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface Reward {
    key: string
    imageUrl: string
    amount: number
}

interface QuestCardProps {
    title: string
    description: string
    rewards?: Array<Reward>
    progress?: {
        current: number
        total: number
        postText: string
    }
    completed?: boolean
    onClick?: () => void
}

export const QuestCard: FC<QuestCardProps> = ({ 
    description, 
    title, 
    rewards, 
    progress, 
    onClick, 
    completed 
}: QuestCardProps) => {
    return (
        <Card 
            className={cn(
                "flex items-center justify-between",
                !completed && "cursor-pointer hover:bg-accent/50 transition-colors"
            )}
            onClick={!completed ? onClick : undefined}
        >
            <CardContent className="p-3">
                <div className="flex items-center justify-between gap-2">
                    <div className="space-y-1">
                        <div className="font-medium">{title}</div>
                        <div className="text-xs text-muted-foreground">{description}</div>
                        {   
                            (completed) 
                                ? 
                                <div className="flex items-center gap-1 mt-4">
                                    <CheckIcon className="w-5 h-5 text-success" />
                                    <div className="text-sm text-success">Responsed</div>
                                </div>
                                : ((progress) &&
                                <div className="mt-4 space-y-1">
                                    <Progress 
                                        value={(progress.current/progress.total) * 100} 
                                        className="max-w-[120px]" 
                                    />
                                    <div className="text-xs">{`${progress.current} of ${progress.total} ${progress.postText}`}</div>
                                </div>)
                        }
                    </div>
                    <div className="flex gap-2">
                        {
                            rewards ?
                                rewards.map((reward) => (
                                    <div className="flex gap-1 items-center" key={reward.key}>
                                        <Image 
                                            src={reward.imageUrl} 
                                            alt="Reward"
                                            width={20}
                                            height={20}
                                            className="w-5 h-5 min-w-5" 
                                        />
                                        <div>{`+${reward.amount}`}</div>
                                    </div>
                                )) 
                                : []
                        }
                    </div>  
                </div>
            </CardContent>
        </Card>
    )
}