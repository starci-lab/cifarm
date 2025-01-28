import React, { FC } from "react"
import { MnemonicModal } from "./Mnemonic"
import { PrivateKeyModal } from "./PrivateKey"
import { WarningModal } from "./Warning"

export const Modals : FC = () => {
    return (
        <div>
            <MnemonicModal />
            <PrivateKeyModal />
            <WarningModal />
        </div>
    )
}