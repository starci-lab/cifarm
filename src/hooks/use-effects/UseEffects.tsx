import React, { FC } from "react"
import { useAccounts } from "./accounts"
import { useTokens } from "./tokens"

export const UseEffects: FC  = () => {
    useAccounts()
    useTokens()
    return (<></>)
}