import React, { FC } from "react"
import { useAccounts } from "./accounts"

export const UseEffects: FC  = () => {
    useAccounts()
    return (<></>)
}