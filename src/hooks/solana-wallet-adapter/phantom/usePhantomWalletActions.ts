import { useEffect } from "react"
import { useIsMobileDevice } from "../useIsMobileDevice"
import { formatUrl } from "url-lib"
import { ChainKey, Network } from "@/modules/blockchain"
import { setWallet, useAppDispatch, useAppSelector } from "@/redux"
import bs58 from "bs58"
import { encryptPhantomData } from "./utils"
import { Transaction } from "@solana/web3.js"
import { envConfig } from "@/env"

const BASE_DEEPLINK_URL = "https://phantom.app/ul/v1"


export const usePhantomWalletActions = () => {
    const network = envConfig().network
    const isMobileDevice = useIsMobileDevice()
    const dappKeyPair = useAppSelector(state => state.walletReducer[ChainKey.Solana]?.phantomDappKeyPair)
    const phantomSession = useAppSelector(state => state.walletReducer[ChainKey.Solana]?.phantomSession)
    const phantomSharedSecret = useAppSelector(state => state.walletReducer[ChainKey.Solana]?.phantomSharedSecret)
    const dispatch = useAppDispatch()
    
    // connect
    const connect = () => {
        if (isMobileDevice) {
            // we use deep link to open phantom
            if (!dappKeyPair?.publicKey) {
                return
            }
            const url = formatUrl(`${BASE_DEEPLINK_URL}/connect`, {
                app_url: window.location.origin,
                dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
                cluster: network === Network.Mainnet ? "mainnet-beta" : "devnet",
                redirect_link: window.location.origin + "/phantom?action=connect",
            })
            window.open(url, "_blank")
        } else {    
            // we use popup to open phantom
            const url = `https://phantom.app/ul/v1/connect?origin=${window.location.origin}`
            window.open(url, "_blank")
        }
    }   

    // disconnect
    const disconnect = async () => {
        if (isMobileDevice) {
            // we use deep link to open phantom
            if (!dappKeyPair?.publicKey) {
                throw new Error("Phantom dapp key pair is required")
            }
            if (!phantomSharedSecret) {
                throw new Error("Phantom shared secret is required")
            }
            if (!phantomSession) {
                throw new Error("Phantom session is required")
            }
            const { encryptedData, nonce } = await encryptPhantomData({
                data: {
                    session: phantomSession,
                },
                sharedSecret: phantomSharedSecret,
            })
            const url = formatUrl(`${BASE_DEEPLINK_URL}/disconnect`, {
                dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
                redirect_link: window.location.origin + "/phantom?action=disconnect",
                nonce: bs58.encode(nonce),
                payload: bs58.encode(encryptedData),
            })
            window.open(url, "_blank")
        } else {    
            // we use popup to open phantom
            const url = `https://phantom.app/ul/v1/connect?origin=${window.location.origin}`
            window.open(url, "_blank")
        }
    }

    // sign transaction
    const signTransaction = async (transaction: Transaction) => {
        if (!dappKeyPair?.publicKey) {
            throw new Error("Phantom dapp key pair is required")
        }
        if (!phantomSharedSecret) {
            throw new Error("Phantom shared secret is required")
        }
        const serializedTransaction = bs58.encode(
            transaction.serialize({
                requireAllSignatures: false
            })
        )

        const payload = {
            session: phantomSession,
            transaction: serializedTransaction
        }

        const { encryptedData, nonce } = await encryptPhantomData({
            data: payload,
            sharedSecret: phantomSharedSecret,
        })

        const url = formatUrl(`${BASE_DEEPLINK_URL}/signTransaction`, {
            dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
            nonce: bs58.encode(nonce),
            redirect_link: window.location.origin + "/phantom?action=signTransaction",
            payload: bs58.encode(encryptedData)
        })
        window.open(url, "_blank")
    }
    
    // sign message
    const signMessage = async (message: string) => {
        if (!dappKeyPair?.publicKey) {
            throw new Error("Phantom dapp key pair is required")
        }
        if (!phantomSharedSecret) {
            throw new Error("Phantom shared secret is required")
        }
        const payload = {
            session: phantomSession,
            message: bs58.encode(Buffer.from(message))
        }
        const { encryptedData, nonce } = await encryptPhantomData({
            data: payload,
            sharedSecret: phantomSharedSecret,
        })
        const url = formatUrl(`${BASE_DEEPLINK_URL}/signMessage`, {
            dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
            nonce: bs58.encode(nonce),
            redirect_link: window.location.origin + "/phantom?action=signMessage",
            payload: bs58.encode(encryptedData)
        })
        window.open(url, "_blank")
    }

    // connect
    useEffect(() => {
        if (!connect) {
            return
        }
        dispatch(setWallet({
            chainKey: ChainKey.Solana,
            walletData: {
                connect,
            },
        }))
    }, [connect, dispatch])

    // disconnect
    useEffect(() => {
        if (!disconnect) {
            return
        }
        dispatch(setWallet({
            chainKey: ChainKey.Solana,
            walletData: {
                disconnect,
            },
        }))
    }, [disconnect, dispatch])

    // sign transaction
    useEffect(() => {
        if (!signTransaction) {
            return
        }
        dispatch(setWallet({
            chainKey: ChainKey.Solana,
            walletData: {
                signTransaction,
            },
        }))
    }, [signTransaction, dispatch])

    // sign message
    useEffect(() => {
        if (!signMessage) {
            return
        }
        dispatch(setWallet({
            chainKey: ChainKey.Solana,
            walletData: {
                signMessage,
            },
        }))
    }, [signMessage, dispatch])
}  