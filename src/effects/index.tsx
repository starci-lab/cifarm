import React, { FC } from "react"
import { useSyncEffects } from "./useSyncEffects"
import { useGameEffects } from "./game"
import { useAuthentication } from "./useAuthentication"
//import { useInit } from "./useInit"
import { useSlotsLeft } from "./useSlotsLeft"
import { LoadCollections } from "./LoadCollections"
import { LoadBalances } from "./LoadBalances"
import { useUpdateEffects } from "./update"

const UseEffects: FC  = () => {
    // useAccounts()
    // useTokens()
    // useNFTCollections()
    // useReferral()
    // useWarpcast()
    useSyncEffects()
    useGameEffects()
    useUpdateEffects()
    // useAddresses()
    useAuthentication()
    useSlotsLeft()
    //useInit()

    return (
        <>
            <LoadCollections />
            <LoadBalances />
        </>
    )
}

export default UseEffects
