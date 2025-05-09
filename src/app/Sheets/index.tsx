import React, { FC } from "react"
import { TokenSheet } from "./TokenSheet"
import { TransferTokenSheet } from "./TransferTokenSheet"

export const SHEETS_CONTAINER_ID = "sheets"
const Sheets : FC = () => {
    return (
        <div id={SHEETS_CONTAINER_ID}>
            <TokenSheet />
            <TransferTokenSheet />
        </div>
    )
}
export default Sheets