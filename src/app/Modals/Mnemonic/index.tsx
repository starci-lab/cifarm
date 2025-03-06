"use client"
import { MNEMONIC_DISCLOSURE } from "@/app/constants"
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
    Chip,
    Card,
    CardBody,
} from "@heroui/react"
import { CopyIcon } from "lucide-react"
import React, { FC, useState } from "react"
import { EyeSlashIcon as EyeSlashSolidIcon } from "@heroicons/react/24/solid"
export const MnemonicModal: FC = () => {
    const { isOpen, onOpenChange } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(MNEMONIC_DISCLOSURE)
    const [isBlurred, setIsBlurred] = useState(true)
    const mnemonic = useAppSelector(
        (state) => state.sessionReducer.mnemonic
    )
    return (
        <Modal
            placement="bottom-center"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Mnemonic</ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody className="relative p-0">
                            {
                                isBlurred && (
                                    <div className="absolute z-50 w-full h-full -top-1.5 -left-1.5 grid place-items-center">
                                        <EyeSlashSolidIcon className="w-10 h-10 text-foreground-400" />
                                    </div>
                                )
                            }
                            <div className={cn(isBlurred ? "blur" : "", "grid grid-cols-3 gap-2 p-3")}>
                                {mnemonic.split(" ").map((word, index) => (
                                    <div key={index} className="col-span-1">
                                        <Chip variant="flat">{`${index+1}.${word}`}</Chip>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>  
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
                        {" "}
                        {isBlurred ? "Show" : "Hide"}{" "}
                    </Button>
                    <Button
                        startContent={<CopyIcon className="w-5 h-5" strokeWidth={3 / 2} />}
                        variant="flat"
                        onPress={() => navigator.clipboard.writeText(mnemonic)}
                    >
                        {" "}
            Copy{" "}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
