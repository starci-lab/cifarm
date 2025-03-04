"use client"
import { REFERRAL_LINK_DISCLOSURE } from "@/app/constants"
import { REFERRAL_USER_ID } from "@/hooks/use-effects/referral"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
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

export const ReferralLinkModal: FC = () => {
    const { isOpen, onOpenChange } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(REFERRAL_LINK_DISCLOSURE)

    const [webUrl, setWebUrl] = useState("")
    useEffect(() => {
        setWebUrl(`${window.location.href}?${REFERRAL_USER_ID}=${code}`)
    }, [])

    const { code } = useAppSelector(
        (state) => state.modalReducer.referralLinkModal
    )
    const telegramUrl = `https://t.me/cifarm_bot?startapp=${code}`
    return (
        <Modal
            placement="bottom-center"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            
        >
            <ModalContent>
                <ModalHeader>Referral Code</ModalHeader>
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
