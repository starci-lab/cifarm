"use client"
import { MINT_AMOUNT_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { ExtendedButton, ExtendedNumberInput, ModalHeader } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"

export const MintAmountModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(MINT_AMOUNT_DISCLOSURE)
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        <ModalHeader title="Mint Amount" description="Enter the amount you want to mint" />
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <ExtendedNumberInput
                        value={"0"}
                        onValueChange={() => {}}
                        name="amount"
                        placeholder="Enter amount"
                        className="w-full"
                    />
                </div>
                <DialogFooter>
                    <ExtendedButton
                        variant="ghost"
                        onClick={() => toggle(false)}
                        className="text-muted-foreground"
                    >
                        Cancel
                    </ExtendedButton>
                    <ExtendedButton
                        onClick={() => {}}
                        isLoading={false}
                    >
                        Mint
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
