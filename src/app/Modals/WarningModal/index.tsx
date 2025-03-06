"use client"
import { WARNING_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import {
    Alert,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@heroui/react"
import React, { FC } from "react"

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
        <Modal
            placement="bottom"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Warning</ModalHeader>
                <ModalBody>
                    <Alert color="danger">{message}</Alert>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={onClose} className="text-foreground-400">
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        className="light text-background"
                        onPress={
                            () => {
                                //close the current modal
                                onClose()
                                //open the next modal
                                if (callback) {
                                    callback()
                                }
                                if (nextModalDisclosure) {
                                    nextModalDisclosure.onOpen()
                                }
                            }
                        }
                    >
            Continue
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
