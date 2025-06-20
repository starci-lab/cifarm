import React, { FC } from "react"
import { NFTSheet } from "./NFTSheet"
import { TokenSheet } from "./TokenSheet"
import { WholesaleMarketBulkSheet } from "./WholesaleMarketBulkSheet"
import { NavigationSheet } from "./NavigationSheet"

export const SHEET_CONTAINER_ID = "sheets"

const Sheets: FC = () => {
    return (
        <div id={SHEET_CONTAINER_ID}>
            <NFTSheet />
            <TokenSheet />
            <WholesaleMarketBulkSheet />
            <NavigationSheet />
        </div>
    )
}
export default Sheets
