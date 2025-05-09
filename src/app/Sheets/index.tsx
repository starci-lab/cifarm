import React, { FC } from "react"
import { TokenSheet } from "./TokenSheet"
import { NFTSheet } from "./NFTSheet"
import { WholesaleMarketSheet } from "./WholesaleMarketSheet"
export const SHEETS_CONTAINER_ID = "sheets"
const Sheets : FC = () => {
    return (
        <div id={SHEETS_CONTAINER_ID}>
            <TokenSheet />
            <NFTSheet />
            <WholesaleMarketSheet />
        </div>
    )
}
export default Sheets