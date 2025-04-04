import React, { FC } from "react"
import { MnemonicModal } from "./MnemonicModal"
import { PrivateKeyModal } from "./PrivateKeyModal"
import { WarningModal } from "./WarningModal"
import { SignTransactionModal } from "./SignTransactionModal"
import { InviteUserModal } from "./InviteUserModal"
import { NeighborsModal } from "./NeighborsModal"
import { QuestsModal } from "./QuestsModal"
import { ProfileModal } from "./ProfileModal"
import { MintModal } from "./MintModal"
import { MintAmountModal } from "./MintAmountModal"
import { SelectTokenModal } from "./SelectTokenModal"
import { NFTModal } from "./NFTModal"
import { TokenModal } from "./TokenModal"
import { SelectNFTModal } from "./SelectNFTModal"

export const MODAL_CONTAINER_ID = "modals"
const Modals : FC = () => {
    return (
        <div>
            <MnemonicModal />
            <PrivateKeyModal />
            <WarningModal />
            <ProfileModal />
            <SignTransactionModal />
            <MintAmountModal />
            <InviteUserModal />
            <NeighborsModal />
            <QuestsModal />
            <MintModal />
            <SelectTokenModal />
            <NFTModal />
            <TokenModal />
            <SelectNFTModal />
        </div>
    )
}
export default Modals