"use client"
import { WARNING_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDisclosure } from "@/hooks"

export const WarningModal: FC = () => {
    const { isOpen, onOpenChange, onClose } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(WARNING_DISCLOSURE)
    const message = useAppSelector(
        (state) => state.modalReducer.warningModal.message
    )
    const nextModalToken = useAppSelector(
        (state) => state.modalReducer.warningModal.nextModalToken
    )
    const callback = useAppSelector(
        (state) => state.modalReducer.warningModal.callback
    )
    if (nextModalToken && callback) {
        throw new Error(
            "WarningModal: nextModalToken and callback cannot be used together"
        )
    }

    // get the next modal disclosure
    const nextModalDisclosure =
    useSingletonHook<ReturnType<typeof useDisclosure>>(nextModalToken ?? "")
 
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Warning</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Alert variant="destructive">
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                </div>
                <DialogFooter>
                    <Button 
                        variant="ghost" 
                        onClick={onClose}
                        className="text-muted-foreground"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            //close the current modal
                            onClose()
                            //open the next modal
                            if (callback) {
                                callback()
                            }
                            if (nextModalDisclosure) {
                                nextModalDisclosure.onOpen()
                            }
                        }}
                    >
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
