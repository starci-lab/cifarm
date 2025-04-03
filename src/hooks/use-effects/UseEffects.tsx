import React, { FC } from "react"
import { useAccounts } from "./accounts"
import { useTokens } from "./tokens"
import { useReferral } from "./referral"
import { UseBalances } from "./balances"
import { UseNFTCollections } from "./nft-collections"
export const UseEffects: FC  = () => {
    useAccounts()
    useTokens()
    useReferral()
    return (<>
        <UseBalances />
        <UseNFTCollections />
    </>)
}