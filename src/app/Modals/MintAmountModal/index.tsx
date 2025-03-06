"use client"
import { MINT_AMOUNT_DISCLOSURE } from "@/app/constants"
import { useMintOffchainTokensRhf } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
    NumberInput,
    ModalFooter,
    Button
} from "@heroui/react"
import React, { FC } from "react"
import { Controller } from "react-hook-form"

export const MintAmountModal: FC = () => {
    const { isOpen, onOpenChange } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(MINT_AMOUNT_DISCLOSURE)
    const {
        form: {
            handleSubmit,
            control,
            formState: { isValid, isSubmitting },
        }, onSubmit
    } = useMintOffchainTokensRhf()
    return (
        <Modal
            size="sm"
            disableAnimation={true}
            placement="bottom"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <ModalHeader><div className="text-xl font-bold">Mint Amount</div></ModalHeader>
                    <ModalBody>
                    
                        <Controller
                            control={control}
                            name="amount"
                            render={({ field }) => (
                                <NumberInput
                                    {...field}     
                                />
                            )}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" disabled={!isValid || isSubmitting}>Mint</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}
