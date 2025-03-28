"use client"
import { MINT_AMOUNT_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { EnhancedButton, EnhancedNumberInput, ModalHeader } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { useDisclosure } from "@/hooks"

export const MintAmountModal: FC = () => {
    const { isOpen, onOpenChange } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(MINT_AMOUNT_DISCLOSURE)
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        <ModalHeader title="Mint Amount" description="Enter the amount you want to mint" />
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <EnhancedNumberInput
                        value={"0"}
                        onValueChange={() => {}}
                        name="amount"
                        placeholder="Enter amount"
                        className="w-full"
                    />
                </div>
                <DialogFooter>
                    <EnhancedButton
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="text-muted-foreground"
                    >
                        Cancel
                    </EnhancedButton>
                    <EnhancedButton
                        onClick={() => {}}
                        isLoading={false}
                    >
                        Mint
                    </EnhancedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
