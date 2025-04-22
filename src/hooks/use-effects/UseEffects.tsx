import React, { FC } from "react"
import { useAccounts } from "./useAccounts"
import { useTokens } from "./useTokens"
import { useReferral } from "./referral"
import { UseBalances } from "./balances"
import { UseNFTCollections } from "./nft-collections"
import { useNFTCollections } from "./useNFTCollections"
import { useWarpcast } from "./warpcast"

export const UseEffects: FC  = () => {
    useAccounts()
    useTokens()
    useNFTCollections()
    useReferral()
    useWarpcast()

    return (<>
        <UseBalances />
        <UseNFTCollections />
    </>)
}