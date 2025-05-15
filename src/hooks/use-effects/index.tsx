import React, { FC } from "react"
import { UseBalances } from "./balances"
import { UseNFTCollections } from "./nft-collections"
import { useAuthentication } from "./useAuthentication"
import { useSyncEffects } from "./useSyncEffects"
import { useUpdateProfileEffects } from "./useUpdateProfileEffects"
import { useGameEffects } from "./game"

const UseEffects: FC  = () => {
    // useAccounts()
    // useTokens()
    // useNFTCollections()
    // useReferral()
    // useWarpcast()
    useSyncEffects()
    useGameEffects()
    // useAddresses()
    useAuthentication()
    useUpdateProfileEffects()
    return (<>
        <UseBalances />
        <UseNFTCollections />
    </>)
}

export default UseEffects
