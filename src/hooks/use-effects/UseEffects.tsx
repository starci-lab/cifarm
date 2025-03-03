import React, { FC } from "react"
import { useAccounts } from "./accounts"
import { useTokens } from "./tokens"
import { useReferral } from "./referral"

export const UseEffects: FC  = () => {
    useAccounts()
    useTokens()
    useReferral()
    return (<></>)
}