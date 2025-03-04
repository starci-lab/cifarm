"use client"
import { ScrollShadow, Card, Divider } from "@heroui/react"
import React, { FC } from "react"
import { QuestCard } from "../QuestCard"
import { TOKEN_IMAGE_URL } from "@/app/constants"

export const SocialTab: FC = () => {
    return (
        <div className="relative">
            <ScrollShadow
                hideScrollBar
                className="h-[300px] relative -top-4 -left-4 p-4 w-[calc(100%+32px)]"
            >
                <Card>
                    <QuestCard
                        title="Follow X"
                        description="Follow our X account to earn rewards."
                        rewards={[
                            {
                                key: "follow-x-1",
                                imageUrl: TOKEN_IMAGE_URL,
                                amount: 20,
                            },
                        ]}
                    />
                    <Divider />
                    <QuestCard
                        title="Invite User"
                        description="Invite new users to join CiFarm and earn rewards together."
                        rewards={[
                            {
                                key: "invite-user-1",
                                imageUrl: TOKEN_IMAGE_URL,
                                amount: 20,
                            },
                        ]}
                    />
                </Card>
            </ScrollShadow>
        </div>
    )
}
