"use client"

import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Spinner,
} from "@/components"
import {
    TRANSACTION_SUBMITTING_MOBILE_MODAL_DISCLOSURE,
    useSingletonHook,
} from "@/singleton"
import React, { FC } from "react"
import { useDisclosure } from "react-use-disclosure"

export const TransactionSubmittingMobileModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(TRANSACTION_SUBMITTING_MOBILE_MODAL_DISCLOSURE)

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[325px]">
                <DialogHeader>
                    <DialogTitle>Transaction Submitting</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div className="flex items-center gap-2">
                        <Spinner className="text-muted-foreground" />
                        <div className="text-muted-foreground">
                            Waiting for transaction to be confirmed...
                        </div>
                    </div>
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
