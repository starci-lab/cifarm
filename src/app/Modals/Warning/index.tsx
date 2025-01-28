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

    // get the next modal disclosure
    const nextModalDisclosure =
    useSingletonHook<ReturnType<typeof useDisclosure>>(nextModalToken)

    // if there is no next modal disclosure, return null
    if (!nextModalDisclosure) {
        return null
    }

    return (
        <Modal
            placement="bottom-center"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Warning</ModalHeader>
                <ModalBody>
                    <Alert color="danger">{message}</Alert>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={onClose} className="text-foreground-500">
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
                                nextModalDisclosure.onOpen()
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
