"use client"
import { INVITE_USER_DISCLOSURE, QUERY_USER_SWR } from "@/app/constants"
import { useQueryUserSwr } from "@/hooks"
import { REFERRAL_USER_ID } from "@/hooks/use-effects/referral"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Alert,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Snippet,
    Spacer,
    useDisclosure,
} from "@heroui/react"
import React, { FC, useEffect, useState } from "react"

export const InviteUserModal: FC = () => {
    const { isOpen, onOpenChange } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(INVITE_USER_DISCLOSURE)

    const { swr } = useSingletonHook<ReturnType<typeof useQueryUserSwr>>(QUERY_USER_SWR)

    const [webUrl, setWebUrl] = useState("")

    useEffect(() => {
        setWebUrl(`${window.location.href}?${REFERRAL_USER_ID}=${swr.data?.data.user.id}`)
    }, [])

    const telegramUrl = `https://t.me/cifarm_bot?startapp=${swr.data?.data.user.id}`
    return (
        <Modal
            size="sm"
            disableAnimation={true}
            placement="bottom"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Invite User</ModalHeader>
                <ModalBody>
                    <div>
                        <Alert color="success">
                            <div className="text-sm">Share the link through your social network; users with the referral code will receive bonus tokens, and you will earn extra tokens as well.</div>
                        </Alert>
                        <Spacer y={4}/>
                        <div className="w-full">
                            <div className="text-sm">Web URL</div>
                            <Spacer y={1.5} />
                            <Snippet
                                fullWidth
                                hideSymbol
                                codeString={webUrl}
                                className="max-w-full whitespace-pre-wrap"
                                classNames={{
                                    pre: "text-justify !break-all !whitespace-pre-line !line-clamp-5",
                                }}
                            >
                                {webUrl}
                            </Snippet>
                        </div>
                        <Spacer y={4}/>
                        <div className="w-full">
                            <div className="text-sm">Telegram URL</div>
                            <Spacer y={1.5} />
                            <Snippet
                                fullWidth
                                hideSymbol
                                codeString={telegramUrl}
                                className="max-w-full whitespace-pre-wrap"
                                classNames={{
                                    pre: "text-justify !break-all !whitespace-pre-line !line-clamp-5",
                                }}
                            >
                                {telegramUrl}
                            </Snippet>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
