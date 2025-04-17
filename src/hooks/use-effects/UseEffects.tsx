import React, { FC } from "react"
import { useAccounts } from "./accounts"
import { useTokens } from "./tokens"
import { useReferral } from "./referral"
import { UseBalances } from "./balances"
import { UseNFTCollections } from "./nft-collections"
import { useWarpcast } from "./warpcast"

export const UseEffects: FC  = () => {
    useAccounts()
    useTokens()
    useReferral()
    useWarpcast()
    return (<>
        <UseBalances />
        <UseNFTCollections />
    </>)
}