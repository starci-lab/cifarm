import React, { FC } from "react"
import { UseBalances } from "./balances"
import { UseNFTCollections } from "./nft-collections"
import { useSyncEffects } from "./useSyncEffects"
import { useUpdateProfileEffects } from "./useUpdateProfileEffects"
import { useGameEffects } from "./game"
import { useAuthentication } from "./useAuthentication"
//import { useInit } from "./useInit"

export * from "./useAuthentication"

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
    //useInit()
    useUpdateProfileEffects()

    return (<>
        <UseBalances />
        <UseNFTCollections />
    </>)
}

export default UseEffects
