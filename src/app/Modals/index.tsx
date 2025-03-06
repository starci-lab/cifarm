import React, { FC } from "react"
import { MnemonicModal } from "./Mnemonic"
import { PrivateKeyModal } from "./PrivateKey"
import { WarningModal } from "./Warning"
import { SignTransactionModal } from "./SignTransaction"
import { InviteUserModal } from "./InviteUserModal"
import { NeighborsModal } from "./Neighbors"
import { QuestsModal } from "./Quests"
import { ProfileModal } from "./ProfileModal"

export const MODAL_CONTAINER_ID = "modals"
const Modals : FC = () => {
    return (
        <div>
            <MnemonicModal />
            <PrivateKeyModal />
            <WarningModal />
            <ProfileModal />
            <SignTransactionModal />
            <InviteUserModal />
            <NeighborsModal />
            <QuestsModal />
        </div>
    )
}
export default Modals