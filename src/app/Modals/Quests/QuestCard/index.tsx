import { Card, CardBody, Image, Spacer } from "@heroui/react"
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
}

export const QuestCard: FC<QuestCardProps> = ({ description, title, rewards }: QuestCardProps) => {
    return (
        <Card shadow="none" radius="none" className="flex items-center justify-between" isPressable onPress={() => {}}>
            <CardBody className="p-3">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <div>{title}</div>
                        <Spacer y={1} />
                        <div className="text-sm text-gray-400">{description}</div>
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