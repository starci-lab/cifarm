import React, { FC } from "react"
import { useAccounts } from "./useAccounts"
import { useTokens } from "./useTokens"
import { useReferral } from "./referral"
import { UseBalances } from "./balances"
import { UseNFTCollections } from "./nft-collections"
import { useNFTCollections } from "./useNFTCollections"
import { useWarpcast } from "./warpcast"
import { useSyncEffects } from "./useSyncEffects"
import { useAddresses } from "./useAddresses"

const UseEffects: FC  = () => {
    useAccounts()
    useTokens()
    useNFTCollections()
    useReferral()
    useWarpcast()
    useSyncEffects()
    useAddresses()
    return (<>
        <UseBalances />
        <UseNFTCollections />
    </>)
}

export default UseEffects
