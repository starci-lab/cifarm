import React, { FC } from "react"
import { UseBalances } from "./balances"
import { UseNFTCollections } from "./nft-collections"
import { useAuthentication } from "./useAuthentication"
import { useSyncEffects } from "./useSyncEffects"
const UseEffects: FC  = () => {
    // useAccounts()
    // useTokens()
    // useNFTCollections()
    // useReferral()
    // useWarpcast()
    useSyncEffects()
    // useAddresses()
    useAuthentication()
    return (<>
        <UseBalances />
        <UseNFTCollections />
    </>)
}

export default UseEffects
