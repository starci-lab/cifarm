"use client"
import { INVITE_USER_DISCLOSURE, GRAPHQL_QUERY_USER_SWR } from "@/app/constants"
import { useGraphQLQueryUserSwr } from "@/hooks"
import { REFERRAL_USER_ID } from "@/hooks/use-effects/referral"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC, useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDisclosure } from "@/hooks"

export const InviteUserModal: FC = () => {
    const { isOpen, onOpenChange } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(INVITE_USER_DISCLOSURE)

    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryUserSwr>>(GRAPHQL_QUERY_USER_SWR)

    const [webUrl, setWebUrl] = useState("")

    useEffect(() => {
        setWebUrl(`${window.location.href}?${REFERRAL_USER_ID}=${swr.data?.data.user.id}`)
    }, [])

    const telegramUrl = `https://t.me/cifarm_bot?startapp=${swr.data?.data.user.id}`
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite User</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <Alert>
                        <AlertDescription>
                            Share the link through your social network; users with the referral code will receive bonus tokens, and you will earn extra tokens as well.
                        </AlertDescription>
                    </Alert>
                    <div className="w-full">
                        <div className="text-sm mb-1.5">Web URL</div>
                        <code className="block w-full p-2 bg-muted rounded-md text-sm break-all whitespace-pre-wrap line-clamp-5">
                            {webUrl}
                        </code>
                    </div>
                    <div className="w-full">
                        <div className="text-sm mb-1.5">Telegram URL</div>
                        <code className="block w-full p-2 bg-muted rounded-md text-sm break-all whitespace-pre-wrap line-clamp-5">
                            {telegramUrl}
                        </code>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
