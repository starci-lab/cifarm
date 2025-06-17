import { combineReducers } from "@reduxjs/toolkit"
import { inventoryModalReducer } from "./inventory-modal"
import { neighborsFilterModalReducer } from "./neighbors-filter-modal"
import { neighborsModalReducer } from "./neighbors-modal"
import { warningModalReducer } from "./warning-modal"
import { nftsClaimedModalReducer } from "./nfts-claimed-modal"
import { signTransactionModalReducer } from "./sign-transaction-modal"
import { downloadPackageModalReducer } from "./download-package-modal"
import { downloadingPackageModalReducer } from "./downloading-package-modal"
import { notificationModalReducer } from "./notification-modal"
import { sellModalReducer } from "./sell-modal"
import { shipModalReducer } from "./ship-modal"
import { upgradeModalReducer } from "./upgrade-modal"

// export all the modals
export * from "./inventory-modal"
export * from "./neighbors-filter-modal"
export * from "./neighbors-modal"
export * from "./warning-modal"
export * from "./nfts-claimed-modal"
export * from "./sign-transaction-modal"
export * from "./download-package-modal"
export * from "./downloading-package-modal"
export * from "./notification-modal"
export * from "./sell-modal"
export * from "./ship-modal"
export * from "./upgrade-modal"

// combine all the modals
const modalReducer = combineReducers({
    inventoryModal: inventoryModalReducer,
    neighborsFilterModal: neighborsFilterModalReducer,
    neighborsModal: neighborsModalReducer,
    warningModal: warningModalReducer,
    nftsClaimedModal: nftsClaimedModalReducer,
    signTransactionModal: signTransactionModalReducer,
    downloadPackageModal: downloadPackageModalReducer,
    downloadingPackageModal: downloadingPackageModalReducer,
    notificationModal: notificationModalReducer,
    sellModal: sellModalReducer,
    shipModal: shipModalReducer,
    upgradeModal: upgradeModalReducer,
})

export { modalReducer }