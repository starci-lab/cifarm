"use client"
import { MINT_AMOUNT_DISCLOSURE, TOKEN_IMAGE_URL, TOKENS_OFFCHAIN_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Spacer,
    useDisclosure,
    Alert,
    Button,
} from "@heroui/react"
import React, { FC } from "react"

export const TokensOffchainModal: FC = () => {
    const { isOpen, onOpenChange } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(TOKENS_OFFCHAIN_DISCLOSURE)
    const { onOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(MINT_AMOUNT_DISCLOSURE)
    return (
        <Modal
            disableAnimation={true}
            placement="bottom"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader><div className="text-xl font-bold">$CARROT (Offchain)</div></ModalHeader>
                <ModalBody>
                    <div>
                        <Image radius="none" removeWrapper src={TOKEN_IMAGE_URL} className="w-20 h-20" />
                        <Spacer y={4} />
                        <Alert color="warning">
                            Offchain-issued tokens are not stored on the blockchain. But you can mint to claim the tokens on-chain.
                        </Alert>
                        <Spacer y={4} />
                        <Button color="primary" onPress={async () => {
                            onOpen()
                        }}>Mint</Button>
                    </div>        
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
