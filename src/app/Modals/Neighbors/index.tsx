"use client"
import { NEIGHBORS_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Tab,
    Tabs,
    useDisclosure,
} from "@heroui/react"
import React, { FC } from "react"
import { WorldTab } from "./WorldTab"
import { FolloweesTab } from "./FolloweesTab"

export const NeighborsModal: FC = () => {
    const { onOpenChange } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_DISCLOSURE)
    return (
        <Modal
            placement="bottom"
            isOpen={true}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Neighbors</ModalHeader>
                <ModalBody>
                    <Tabs aria-label="Options">
                        <Tab key="world" title="Worlds">
                            <WorldTab />
                        </Tab>
                        <Tab key="followees" title="Followees">
                            <FolloweesTab />
                        </Tab>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
