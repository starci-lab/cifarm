"use client"
import { PRIVATE_KEY_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
    ModalFooter,
    Button,
    cn,
} from "@heroui/react"
import { CopyIcon } from "lucide-react"
import React, { FC, useState } from "react"
import { EyeSlashIcon as EyeSlashSolidIcon } from "@heroicons/react/24/solid"
export const PrivateKeyModal: FC = () => {
    const { isOpen, onOpenChange } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(PRIVATE_KEY_DISCLOSURE)
    const [isBlurred, setIsBlurred] = useState(true)
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const account = accounts.find((account) => account.id === currentId)
    if (!account) {
        return null
    }
    const { privateKey } = account
    return (
        <Modal
            placement="bottom-center"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Private Key</ModalHeader>
                <ModalBody>
                    <div className="relative">
                        {
                            isBlurred && (
                                <div className="absolute z-50 w-full h-full -top-1.5 -left-1.5 grid place-items-center">
                                    <EyeSlashSolidIcon className="w-10 h-10 text-foreground-400" />
                                </div>
                            )
                        }
                        <div className={cn(isBlurred ? "blur" : "", "bg-default/40 p-3 rounded-medium text-sm break-all")}>
                            {privateKey}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="flat"
                        startContent={
                            isBlurred ? (
                                <EyeIcon className="w-5 h-5" />
                            ) : (
                                <EyeSlashIcon className="w-5 h-5" />
                            )
                        }
                        onPress={() => setIsBlurred(!isBlurred)}
                    >
                        {isBlurred ? "Show" : "Hide"}
                    </Button>
                    <Button
                        startContent={<CopyIcon className="w-5 h-5" strokeWidth={3 / 2} />}
                        variant="flat"
                        onPress={() => navigator.clipboard.writeText(privateKey)}
                    >
            Copy
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
