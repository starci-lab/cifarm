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
import { TransferTokenModal } from "./TransferTokenModal"
import { SelectNFTModal } from "./SelectNFTModal"
import { DownloadModal } from "./DownloadModal"
import { InfoModal } from "./InfoModal"
import { DownloadingModal } from "./DownloadingModal"
import { NFTStorageModal } from "./NFTStorageModal"
import { ShopModal } from "./ShopModal"
import { InventoryModal } from "./InventoryModal"
import { RoadsideStandModal } from "./RoadsideStandModal"
import { SelectInventoryModal } from "./SelectInventoryModal"
import { SettingsModal } from "./SettingsModal"
import { SellModal } from "./SellModal"
import { UpgradeModal } from "./UpgradeModal"
import { DailyModal } from "./DailyModal"
import { TransferNFTModal } from "./TransferNFTModal"
import { ShipModal } from "./ShipModal"

export const MODAL_CONTAINER_ID = "modals"
const Modals : FC = () => {
    return (
        <div id={MODAL_CONTAINER_ID}>
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
            <TransferTokenModal />
            <TransferNFTModal />
            <SelectNFTModal />
            <DownloadModal />
            <DownloadingModal />
            <InfoModal />
            <SettingsModal />
            <InventoryModal />
            <RoadsideStandModal />
            <NFTStorageModal />
            <ShopModal />
            <SelectInventoryModal />
            <SellModal />
            <UpgradeModal />
            <DailyModal />
            <ShipModal />
        </div>
    )
}
export default Modals