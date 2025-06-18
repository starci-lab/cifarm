import React, { FC } from "react"
import { NFTSheet } from "./NFTSheet"
import { TokenSheet } from "./TokenSheet"

export const SHEET_CONTAINER_ID = "sheets"

const Sheets: FC = () => {
    return (
        <div id={SHEET_CONTAINER_ID}>
            <NFTSheet />
            <TokenSheet />
        </div>
    )
}
export default Sheets
