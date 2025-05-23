"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, ExtendedButton } from "@/components"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { DISCONNECTED_DISCLOSURE } from "@/app/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"

export const DisconnectedModal: FC = () => {
    const { isOpen, toggle, close } = useSingletonHook<ReturnType<typeof useDisclosure>>(DISCONNECTED_DISCLOSURE)
    const router = useRouterWithSearchParams()
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>You&apos;ve Been Signed Out</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div>
                        Your account was accessed from another device, and you&apos;ve been signed out to protect your security. Please sign in again if this was unexpected.
                    </div>
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton className="w-full"
                        variant="flat"
                        color="secondary"
                        onClick={() => {
                            router.push(pathConstants.home)
                            close()
                        }}
                    >Close</ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
