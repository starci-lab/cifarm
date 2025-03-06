import { CheckIcon } from "@heroicons/react/24/outline"
import { Card, CardBody, Image, Link, Progress, Spacer } from "@heroui/react"
import React, { FC } from "react"

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
    onPress?: () => void
}

export const QuestCard: FC<QuestCardProps> = ({ description, title, rewards, progress, onPress, completed }: QuestCardProps) => {
    return (
        <Card shadow="none" radius="none" className="flex items-center justify-between" isPressable={!completed} onPress={onPress}>
            <CardBody className="p-3">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <div>{title}</div>
                        <Spacer y={1} />
                        <div className="text-xs text-gray-400">{description}</div>
                        {   
                            (completed) 
                                ? 
                                <>
                                    <Spacer y={4} />
                                    <div className="flex items-center gap-1">
                                        <Link color="success">
                                            <CheckIcon className="w-5 h-5" />
                                        </Link>
                                        <div className="text-sm text-success">Completed</div>
                                    </div>
                                </>
                                : ((progress) &&
                                <>
                                    <Spacer y={4} />
                                    <div>
                                        <Progress size="md" className="max-w-[120px]" value={(progress.current/progress.total) * 100} />
                                        <Spacer y={1} />
                                        <div className="text-xs">{`${progress.current} of ${progress.total} ${progress.postText}`}</div>
                                    </div>
                                </>)
                        }
                    </div>
                    <div className="flex gap-2">
                        {
                            rewards ?
                                rewards.map((reward) => (
                                    <div className="flex gap-1 items-center" key={reward.key}>
                                        <Image removeWrapper src={reward.imageUrl} className="w-5 h-5 min-w-5" />
                                        <div>{`+${reward.amount}`}</div>
                                    </div>
                                )) 
                                : []
                        }
                    </div>  
                </div>
            </CardBody>
        </Card>
    )
}