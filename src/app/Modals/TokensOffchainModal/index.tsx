"use client"
import { MINT_AMOUNT_DISCLOSURE, TOKEN_IMAGE_URL, TOKENS_OFFCHAIN_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { EnhancedButton } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDisclosure } from "@/hooks"
import Image from "next/image"

export const TokensOffchainModal: FC = () => {
    const { isOpen, onOpenChange } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(TOKENS_OFFCHAIN_DISCLOSURE)
    const { onOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(MINT_AMOUNT_DISCLOSURE)
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">$CARROT (Offchain)</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="w-20 h-20 relative">
                        <Image
                            src={TOKEN_IMAGE_URL}
                            alt="Token"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <Alert variant="destructive">
                        <AlertDescription>
                            Offchain-issued tokens are not stored on the blockchain. But you can mint to claim the tokens on-chain.
                        </AlertDescription>
                    </Alert>
                    <EnhancedButton
                        onClick={() => onOpen()}
                    >
                        Mint
                    </EnhancedButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}
