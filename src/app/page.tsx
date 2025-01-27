"use client"

import { Spacer, Button, Image } from "@heroui/react"
import { useRouterWithSearchParams } from "@/hooks"
import { Container } from "@/components"
import React, { FC } from "react"
import { pathConstants } from "@/constants"

const Page: FC = () => {
    const router = useRouterWithSearchParams()
    return (
        <Container centerContent hasPadding>
            <div className="w-full">
                <div className="grid place-items-center gap-4 w-full">
                    <Image radius="full" removeWrapper src="/logo.png" height={150} />
                </div>
                <Spacer y={4} />
                <div className="text-center">
                    <div className="text-4xl font-bold">CiFarm</div>
                    <div className="text-foreground-500 text-sm">
            The leading play-to-earn farming game on Telegram
                    </div>
                </div>
                <Spacer y={12} />
                <div className="grid gap-4 w-full">
                    <Button
                        color="primary"
                        size="lg"
                        onPress={() => router.push(pathConstants.create)}
                    >
            Create new account
                    </Button>
                    <Button
                        color="primary"
                        variant="flat"
                        size="lg"
                        onPress={() => router.push(pathConstants.create)}
                    >
            Import existing account
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default Page
