import React, { FC } from "react"
import { useAccounts } from "./useAccounts"
import { useTokens } from "./useTokens"
import { useReferral } from "./referral"
import { UseBalances } from "./balances"
import { UseNFTCollections } from "./nft-collections"
import { useNFTCollections } from "./useNFTCollections"
import { useWarpcast } from "./warpcast"
import { useSyncEffects } from "./useSyncEffects"

const UseEffects: FC  = () => {
    useAccounts()
    useTokens()
    useNFTCollections()
    useReferral()
    useWarpcast()
    useSyncEffects()

    return (<>
        <UseBalances />
        <UseNFTCollections />
    </>)
}

export default UseEffects
