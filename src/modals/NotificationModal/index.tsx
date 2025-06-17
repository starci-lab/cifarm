"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    ExtendedButton,
} from "@/components"
import React, { FC } from "react"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { NOTIFICATION_MODAL_DISCLOSURE } from "@/singleton"
import { useAppSelector } from "@/redux"
import useSWRMutation from "swr/mutation"

export const NotificationModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        NOTIFICATION_MODAL_DISCLOSURE
    )
    const { message, title, callback, buttonText } = useAppSelector(
        (state) => state.modalReducer.notificationModal
    )
    const callbackSwrMutation = useSWRMutation("SOCKET_CALLBACK", async () => {
        await callback?.()
    })
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div>{message}</div>
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        className="w-full"
                        variant="flat"
                        isLoading={callbackSwrMutation.isMutating}
                        color="secondary"
                        onClick={async () => {
                            await callbackSwrMutation.trigger()
                        }}
                    >
                        {buttonText}
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
