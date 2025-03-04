import React, { FC } from "react"
import { MnemonicModal } from "./Mnemonic"
import { PrivateKeyModal } from "./PrivateKey"
import { WarningModal } from "./Warning"
import { SignTransactionModal } from "./SignTransaction"
import { ReferralLinkModal } from "./ReferralLinkModal"
import { NeighborsModal } from "./Neighbors"

export const Modals : FC = () => {
    return (
        <div>
            <MnemonicModal />
            <PrivateKeyModal />
            <WarningModal />
            <SignTransactionModal />
            <ReferralLinkModal />
            <NeighborsModal />
        </div>
    )
}