"use client"

import { useDisclosure } from "react-use-disclosure"
import {
    Card,
    CardContent,
    CardHeader,
    Container,
    ExtendedButton,
    Header,
    Spacer,
    Title,
} from "@/components"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    MNEMONIC_DISCLOSURE,
    PRIVATE_KEY_DISCLOSURE,
    WARNING_DISCLOSURE,
} from "../constants"
import { setWarningModal, useAppDispatch } from "@/redux"
import { sessionDb } from "@/modules/dexie"
import { useRouterWithSearchParams } from "@/hooks"

const Page: FC = () => {
    const { open: openWarningModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(WARNING_DISCLOSURE)
    const dispatch = useAppDispatch()
    const router = useRouterWithSearchParams()
    return (
        <Container hasPadding>
            <div className="h-full">
                <Header title="Settings" />
                <Spacer y={6} />
                <Card>
                    <CardHeader>
                        <Title
                            title="Security"
                            tooltipString="Manage your security settings."
                        />
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="text-sm">Mnemonic</div>
                            <ExtendedButton
                                onClick={() => {
                                    dispatch(
                                        setWarningModal({
                                            message:
                        "Are you sure you want to display your mnemonic phrase? This phrase grants full access to your account or wallet. If exposed, anyone can control your assets and data. Ensure you're in a secure environment and protect it from unauthorized access. Proceed with caution.",
                                            nextModalToken: MNEMONIC_DISCLOSURE,
                                        })
                                    )
                                    openWarningModal()
                                }}
                                variant="outline"
                            >
                Show
                            </ExtendedButton>
                        </div>
                        <Spacer y={4} />
                        <div className="flex justify-between items-center">
                            <div className="text-sm">Private key</div>
                            <ExtendedButton
                                onClick={() => {
                                    dispatch(
                                        setWarningModal({
                                            message:
                        "Are you sure you want to reveal your private key? This key grants full control over your account or wallet. If exposed, anyone can access your assets and make transactions. Keep it secure and private at all times. Proceed with extreme caution.",
                                            nextModalToken: PRIVATE_KEY_DISCLOSURE,
                                        })
                                    )
                                    openWarningModal()
                                }}
                                variant="outline"
                            >
                Show
                            </ExtendedButton>
                        </div>
                    </CardContent>
                </Card>
                <Spacer y={6} />
                <Card className="border-destructive">
                    <CardHeader>
                        <Title
                            classNames={{
                                title: "text-destructive",
                                tooltip: "text-destructive",
                            }}
                            title="Danger zone"
                            tooltipString="Dangerous actions are irreversible. Proceed with extreme caution."
                        />
                    </CardHeader>
                    <CardContent>
                        <ExtendedButton
                            color="destructive"
                            onClick={() => {
                                dispatch(
                                    setWarningModal({
                                        message:
                      "Are you sure you want to sign out? This will log you out of your current session and require you to sign in again via private key/mnemonic.",
                                        callback: async () => {
                                            await sessionDb.delete()
                                            router.replace("/")
                                        },
                                    })
                                )
                                openWarningModal()
                            }}
                        >
              Sign out
                        </ExtendedButton>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}

export default Page
