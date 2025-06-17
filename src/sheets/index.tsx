import React, { FC } from "react"
import { NFTSheet } from "./NFTSheet"
import { TokenSheet } from "./TokenSheet"

export const MODAL_CONTAINER_ID = "modals"

const Modals: FC = () => {
    return (
        <div id={MODAL_CONTAINER_ID}>
            <NFTSheet />
            <TokenSheet />
            <NFTSheet />
        </div>
    )
}
export default Modals
