import { useEffect } from "react"
import { useIsMobileDevice } from "@/hooks"
import { formatUrl } from "url-lib"
import { Network } from "@/modules/blockchain"
import {
    resetSolanaWallet,
    setSolanaWallet,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import bs58 from "bs58"
import { encryptPhantomData } from "./utils"
import { Transaction } from "@solana/web3.js"
import { envConfig } from "@/env"

const BASE_DEEPLINK_URL = "https://phantom.app/ul/v1"

export const usePhantomWalletActions = () => {
    const network = envConfig().network
    const isMobileDevice = useIsMobileDevice()
    const dappKeyPair = useAppSelector(
        (state) => state.walletReducer.solanaWallet.phantomDappKeyPair
    )
    const phantomSession = useAppSelector(
        (state) => state.walletReducer.solanaWallet.phantomSession
    )
    const phantomSharedSecret = useAppSelector(
        (state) => state.walletReducer.solanaWallet.phantomSharedSecret
    )
    const phantomProvider = useAppSelector(
        (state) => state.walletReducer.solanaWallet.phantomProvider
    )
    const dispatch = useAppDispatch()

    // connect
    const connect = async () => {
        if (isMobileDevice) {
            // we use deep link to open phantom
            if (!dappKeyPair?.publicKey) {
                return
            }
            const url = formatUrl(`${BASE_DEEPLINK_URL}/connect`, {
                app_url: window.location.origin,
                dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
                cluster: network === Network.Mainnet ? "mainnet-beta" : "devnet",
                redirect_link: formatUrl(`${window.location.origin}${window.location.pathname}`, {
                    action: "connect",
                }),
            })
            window.open(url, "_blank")
            //window.close()
        } else {
            if ("phantom" in window) {
                const provider = window.phantom.solana
                if (provider) {
                    const { publicKey } = await provider.connect()
                    dispatch(
                        setSolanaWallet({
                            address: publicKey.toBase58(),
                            isConnected: true,
                            phantomProvider: provider,
                        })
                    )
                    return
                }
            }
            window.open("https://phantom.app/", "_blank")
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
                redirect_link: formatUrl(`${window.location.origin}${window.location.pathname}`, {
                    action: "disconnect",
                }),
                nonce: bs58.encode(nonce),
                payload: bs58.encode(encryptedData),
            })
            window.open(url, "_blank")  
            window.close()
        } else {
            if (!phantomProvider) {
                throw new Error("Phantom provider is required")
            }
            await phantomProvider.disconnect()
            dispatch(resetSolanaWallet())
        }
    }

    // sign transaction
    const signTransaction = async (transaction: Transaction) => {
        if (isMobileDevice) {
            if (!dappKeyPair?.publicKey) {
                throw new Error("Phantom dapp key pair is required")
            }
            if (!phantomSharedSecret) {
                throw new Error("Phantom shared secret is required")
            }
            const serializedTransaction = bs58.encode(
                transaction.serialize({
                    requireAllSignatures: false,
                })
            )
            const payload = {
                session: phantomSession,
                transaction: serializedTransaction,
            }

            const { encryptedData, nonce } = await encryptPhantomData({
                data: payload,
                sharedSecret: phantomSharedSecret,
            })

            const url = formatUrl(`${BASE_DEEPLINK_URL}/signTransaction`, {
                dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
                nonce: bs58.encode(nonce),
                redirect_link: formatUrl(`${window.location.origin}${window.location.pathname}`, {
                    action: "signTransaction",
                }),
                payload: bs58.encode(encryptedData),
            })
            console.log({
                dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
                nonce: bs58.encode(nonce),
                redirect_link: formatUrl(`${window.location.origin}${window.location.pathname}`, {
                    action: "signTransaction",
                }),
                payload: bs58.encode(encryptedData),
            })
            console.log(url)
            window.open(url, "_blank")
            //window.close()
        } else {
            if (!phantomProvider) {
                throw new Error("Phantom provider is required")
            }
            console.log(phantomProvider)
            const _signedTransaction = await phantomProvider.signTransaction(
                transaction
            )
            const signedTransaction = bs58.encode(
                _signedTransaction.serialize({
                    requireAllSignatures: false,
                })
            )
            dispatch(
                setSolanaWallet({
                    signedTransactions: [signedTransaction],
                })
            )
            return _signedTransaction
        }
    }

    // sign message
    const signMessage = async (message: Uint8Array<ArrayBufferLike>) => {
        if (isMobileDevice) {
            if (!dappKeyPair?.publicKey) {
                throw new Error("Phantom dapp key pair is required")
            }
            if (!phantomSharedSecret) {
                throw new Error("Phantom shared secret is required")
            }
            const payload = {
                session: phantomSession,
                message: bs58.encode(message),
            }
            const { encryptedData, nonce } = await encryptPhantomData({
                data: payload,
                sharedSecret: phantomSharedSecret,
            })
            const url = formatUrl(`${BASE_DEEPLINK_URL}/signMessage`, {
                dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
                nonce: bs58.encode(nonce),
                redirect_link: formatUrl(`${window.location.origin}${window.location.pathname}`, {
                    action: "signMessage",
                }),
                payload: bs58.encode(encryptedData),
            })
            window.open(url, "_blank")
            //window.close()
        } else {
            if (!phantomProvider) {
                throw new Error("Phantom provider is required")
            }
            return (await phantomProvider.signMessage(
                message
            )) as Uint8Array<ArrayBufferLike>
        }
    }

    // sign transactions
    const signAllTransactions = async (transactions: Array<Transaction>) => {
        if (isMobileDevice) {
            if (!dappKeyPair?.publicKey) {
                throw new Error("Phantom dapp key pair is required")
            }
            if (!phantomSharedSecret) {
                throw new Error("Phantom shared secret is required")
            }
            const serializedTransactions = transactions.map((transaction) =>
                bs58.encode(
                    transaction.serialize({
                        requireAllSignatures: false,
                    })
                )
            )

            const payload = {
                session: phantomSession,
                transactions: serializedTransactions,
            }
            const { encryptedData, nonce } = await encryptPhantomData({
                data: payload,
                sharedSecret: phantomSharedSecret,
            })
            const url = formatUrl(`${BASE_DEEPLINK_URL}/signAllTransactions`, {
                dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
                nonce: bs58.encode(nonce),
                redirect_link: formatUrl(`${window.location.origin}${window.location.pathname}`, {
                    action: "signAllTransactions",
                }),
                payload: bs58.encode(encryptedData),
            })
            window.open(url, "_blank")
            //window.close()
        } else {
            if (!phantomProvider) {
                throw new Error("Phantom provider is required")
            }
            const signedTransactions = await phantomProvider.signAllTransactions(
                transactions
            )
            const _signedTransactions = signedTransactions.map((transaction) =>
                bs58.encode(
                    transaction.serialize({
                        requireAllSignatures: false,
                    })
                )
            )
            dispatch(
                setSolanaWallet({
                    signedTransactions: _signedTransactions,
                })
            )
            return signedTransactions
        }
    }

    // connect
    useEffect(() => {
        if (!connect) {
            return
        }
        dispatch(
            setSolanaWallet({
                connect,
            })
        )
    }, [connect, dispatch])

    // disconnect
    useEffect(() => {
        if (!disconnect) {
            return
        }
        dispatch(
            setSolanaWallet({
                disconnect,
            })
        )
    }, [disconnect, dispatch])

    // sign transaction
    useEffect(() => {
        if (!signTransaction) {
            return
        }
        dispatch(
            setSolanaWallet({
                signTransaction,
            })
        )
    }, [signTransaction, dispatch])

    // sign message
    useEffect(() => {
        if (!signMessage) {
            return
        }
        dispatch(
            setSolanaWallet({
                signMessage,
            })
        )
    }, [signMessage, dispatch])

    useEffect(() => {
        if (!signAllTransactions) {
            return
        }
        dispatch(
            setSolanaWallet({
                signAllTransactions,
            })
        )
    }, [signAllTransactions, dispatch])
}
