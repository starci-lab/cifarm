"use client"

import { useRouterWithSearchParams } from "@/hooks"
import { Button, Link, Spacer, useDisclosure } from "@heroui/react"
import { ArrowLeftIcon } from "lucide-react"
import { Container, QuestionTooltip } from "@/components"
import React, { FC } from "react"
import { Theme } from "./Theme"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    MNEMONIC_DISCLOSURE,
    PRIVATE_KEY_DISCLOSURE,
    WARNING_DISCLOSURE,
} from "../constants"
import { setWarningModal, useAppDispatch } from "@/redux"

const Page: FC = () => {
    const router = useRouterWithSearchParams()
    const { onOpen } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(WARNING_DISCLOSURE)
    const dispatch = useAppDispatch()
    return (
        <Container hasPadding>
            <div className="h-full">
                <div>
                    <div className="flex gap-2 items-center">
                        <Link as="button" onPress={() => router.back()} color="foreground">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </Link>
                        <div className="text-2xl font-bold">Settings</div>
                    </div>
                    <Spacer y={4} />
                    <div className="text-xs text-foreground-400">
            Manage your settings.
                    </div>
                </div>
                <Spacer y={6} />
                <Theme />
                <Spacer y={6} />
                <div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <div className="text-lg font-bold">Security</div>
                            <QuestionTooltip message="Manage your security settings." />
                        </div>
                    </div>
                    <Spacer y={4} />
                    <div className="flex justify-between items-center">
                        <div>Mnemonic</div>
                        <Button
                            onPress={() => {
                                dispatch(
                                    setWarningModal({
                                        message:
                    "Are you sure you want to display your mnemonic phrase? This phrase grants full access to your account or wallet. If exposed, anyone can control your assets and data. Ensure you're in a secure environment and protect it from unauthorized access. Proceed with caution.",
                                        nextModalToken: MNEMONIC_DISCLOSURE,
                                    })
                                )
                                onOpen()
                            }}
                            variant="flat"
                        >
            Show
                        </Button>
                    </div>
                </div>
                <Spacer y={4} />
                <div>
                    <div className="flex justify-between items-center">
                        <div>Private Key</div>
                        <Button
                            onPress={() => {
                                dispatch(
                                    setWarningModal({
                                        message:
                    "Are you sure you want to reveal your private key? This key grants full control over your account or wallet. If exposed, anyone can access your assets and make transactions. Keep it secure and private at all times. Proceed with extreme caution.",
                                        nextModalToken: PRIVATE_KEY_DISCLOSURE,
                                    })
                                )
                                onOpen()
                            }}
                            variant="flat"
                        >
            Show
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Page
