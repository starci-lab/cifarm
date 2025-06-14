"use client"
import { useAppSelector } from "@/redux"
import { ChainKey } from "@/modules/blockchain"
import React from "react"
import bs58 from "bs58"

const Page = () => {
    const connect = useAppSelector(state => state.walletReducer[ChainKey.Solana]?.connect)
    const disconnect = useAppSelector(state => state.walletReducer[ChainKey.Solana]?.disconnect)
    const signMessage = useAppSelector(state => state.walletReducer[ChainKey.Solana]?.signMessage)
    const phantom = useAppSelector(state => state.walletReducer[ChainKey.Solana])
    return <>
        <div>
            <div>{phantom.phantomDappKeyPair?.publicKey && bs58.encode(phantom.phantomDappKeyPair?.publicKey)}</div>
            <div>{phantom.phantomSharedSecret && bs58.encode(phantom.phantomSharedSecret)}</div>
            <button onClick={() => connect?.()}>Connect</button>
            <button onClick={() => disconnect?.()}>Disconnect</button>
            <button onClick={() => signMessage?.("Hello")}>Sign Message</button>
        </div>
    </>
}
export default Page