"use client"
import { MINT_AMOUNT_DISCLOSURE, MINT_OFFCHAIN_TOKENS_RHF } from "@/app/constants"
import { useMintOffchainTokensRhf } from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
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
    } = useSingletonHook2<ReturnType<typeof useMintOffchainTokensRhf>>(MINT_OFFCHAIN_TOKENS_RHF)
    return (
        <Modal
            size="sm"
            disableAnimation={true}
            placement="bottom"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader><div className="text-xl font-bold">Mint Amount</div></ModalHeader>
                <ModalBody>
                    <Controller
                        control={control}
                        name="amount"
                        render={({ field, fieldState: { error } }) => (
                            <NumberInput
                                {...field}   
                                errorMessage={error?.message}
                                isInvalid={!!error?.message}
                            />
                        )}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onPress={async () => 
                    {
                        await handleSubmit(onSubmit)()
                    }} 
                    isDisabled={!isValid} 
                    isLoading={isSubmitting}>Mint</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
