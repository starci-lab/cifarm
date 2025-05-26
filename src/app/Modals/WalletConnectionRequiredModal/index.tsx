"use client"

import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { ModalHeader } from "@/components/styled/ModalHeader"
import React, { FC } from "react"
import { useDisclosure } from "react-use-disclosure"
import { WALLET_CONNECTION_REQUIRED_DISCLOSURE, CONNECT_DISCLOSURE } from "@/app/constants"
import { DialogContent, DialogHeader, DialogTitle, DialogBody, Dialog, DialogFooter, ExtendedButton } from "@/components"
import { ChainKey } from "@/modules/blockchain"
import { setSelectedChainKey } from "@/redux/slices/session"

export const WalletConnectionRequiredModal: FC = () => {
    const { isOpen, toggle, close } = useSingletonHook<ReturnType<typeof useDisclosure>>(WALLET_CONNECTION_REQUIRED_DISCLOSURE)
    const chainKey = useAppSelector((state) => state.modalReducer.walletConnectionRequiredModal.chainKey)

    const renderChainKey = () => {
        switch (chainKey) {
        case ChainKey.Solana: {
            return "Solana"
        }
        case ChainKey.Sui: {
            return "Sui"
        }
        default: {
            throw new Error(`Unsupported chain key: ${chainKey}`)
        }
        }
    }

    const { open: openConnectModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(CONNECT_DISCLOSURE)
    const dispatch = useAppDispatch()
        
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Wallet Connection Required" />
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    Wallet connection required for {renderChainKey()}. Please connect your wallet to continue.
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton variant="flat" color="secondary" className="w-full" onClick={() => {
                        close()
                        dispatch(setSelectedChainKey(chainKey))
                        openConnectModal()
                    }}>Connect</ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
