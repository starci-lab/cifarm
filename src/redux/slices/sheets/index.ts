import { combineReducers } from "@reduxjs/toolkit"
import { tokenSheetReducer } from "./token-sheet"
import { nftSheetReducer } from "./nft-sheet"
import { bottomNavSheetReducer } from "./bottom-nav-sheet"
import { wholesaleMarketBulkSheetReducer } from "./wholesale-market-bulk-sheet"

export * from "./token-sheet"
export * from "./nft-sheet"
export * from "./bottom-nav-sheet"
export * from "./wholesale-market-bulk-sheet"

export const sheetsReducer = combineReducers({
    tokenSheet: tokenSheetReducer,
    nftSheet: nftSheetReducer,
    bottomNavSheet: bottomNavSheetReducer,
    wholesaleMarketBulkSheet: wholesaleMarketBulkSheetReducer,
})