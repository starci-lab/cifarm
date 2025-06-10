import React, { FC } from "react"
import { useSyncEffects } from "./useSyncEffects"
import { useUpdateProfileEffects } from "./useUpdateProfileEffects"
import { useGameEffects } from "./game"
import { useAuthentication } from "./useAuthentication"
//import { useInit } from "./useInit"
import { useSlotsLeft } from "./useSlotsLeft"

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
    useSlotsLeft()
    //useInit()
    useUpdateProfileEffects()

    return (<></>)
}

export default UseEffects
