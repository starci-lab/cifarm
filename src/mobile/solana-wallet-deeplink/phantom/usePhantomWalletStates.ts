import { setSolanaWallet, useAppDispatch } from "@/redux"
import { useEffect, useRef } from "react"
import { useIsMobileDevice } from "../../../hooks/useIsMobileDevice"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { deserialize, serialize } from "@/modules/serialization"
import nacl from "tweetnacl"
import { envConfig } from "@/env"
import bs58 from "bs58"

export const usePhantomWalletStates = () => {
    const network = envConfig().network
    // states
    const isMobileDevice = useIsMobileDevice()
    const dispatch = useAppDispatch()

    // we try to get the dapp key pair from the local storage
    const phantomDappKeyPairRef = useRef(false)
    const phantomSessionRef = useRef(false)
    const phantomSharedSecretRef = useRef(false)
    const phantomAccountAddressRef = useRef(false)

    // phantom dapp key pair
    useEffect(() => {
        if (phantomDappKeyPairRef.current) return
        const handleEffect = async () => {
            if (!isMobileDevice) return
            const found = await sessionDb.keyValueStore.get({
                key: SessionDbKey.PhantomDappKeyPair
            })
            if (found?.value) {
                dispatch(
                    setSolanaWallet({
                        phantomDappKeyPair: deserialize(found.value) as nacl.BoxKeyPair,
                    }))
            } else {
                const dappKeyPair = nacl.box.keyPair()
                dispatch(setSolanaWallet({
                    phantomDappKeyPair: dappKeyPair,
                }))
                await sessionDb.keyValueStore.add({
                    key: SessionDbKey.PhantomDappKeyPair,
                    value: serialize(dappKeyPair)
                })
            }
            phantomDappKeyPairRef.current = true
        }
        handleEffect()
    }, [isMobileDevice, dispatch, network])
    
    // phantom session
    useEffect(() => {
        if (phantomSessionRef.current) return
        const handleEffect = async () => {
            if (!isMobileDevice) return
            const found = await sessionDb.keyValueStore.get({
                key: SessionDbKey.PhantomSession
            })
            if (found?.value) {
                dispatch(
                    setSolanaWallet({
                        phantomSession: found.value,
                    }))
            }
            phantomSessionRef.current = true
        }
        handleEffect()
    }, [isMobileDevice, dispatch, network])

    // phantom shared secret
    useEffect(() => {
        if (phantomSharedSecretRef.current) return
        const handleEffect = async () => {
            if (!isMobileDevice) return
            const found = await sessionDb.keyValueStore.get({
                key: SessionDbKey.PhantomSharedSecret
            })
            if (found?.value) {
                dispatch(
                    setSolanaWallet({
                        phantomSharedSecret: bs58.decode(found.value),
                    }))
            }
            phantomSharedSecretRef.current = true
        }
        handleEffect()
    }, [isMobileDevice, dispatch, network])

    // phantom account address
    useEffect(() => {
        if (phantomAccountAddressRef.current) return
        const handleEffect = async () => {
            if (!isMobileDevice) return
            const found = await sessionDb.keyValueStore.get({
                key: SessionDbKey.PhantomAccountAddress
            })
            if (found?.value) {
                dispatch(
                    setSolanaWallet({
                        address: found.value,
                        isConnected: true,
                    }))
            } 
            phantomAccountAddressRef.current = true
        }
        handleEffect()
    }, [isMobileDevice, dispatch, network])
}