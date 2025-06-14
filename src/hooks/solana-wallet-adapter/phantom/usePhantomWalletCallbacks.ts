import { SessionDbKey } from "@/modules/dexie"
import { sessionDb } from "@/modules/dexie"
import { decryptPhantomData } from "./utils"
import { PhantomConnectData } from "./PhantomWalletProvider"
import { ChainKey } from "@/modules/blockchain"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux"
import { resetWallet, setWallet } from "@/redux"
import bs58 from "bs58"
import nacl from "tweetnacl"

export const usePhantomWalletCallbacks = () => {
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const phantomDappKeyPair = useAppSelector(state => state.walletReducer[ChainKey.Solana].phantomDappKeyPair)
    const address = useAppSelector(state => state.walletReducer[ChainKey.Solana].address)
    // connect
    useEffect(() => {
        const handleEffect = async () => {
            // all params from connect redirect link
            const phantomEncryptionPublicKey = searchParams.get("phantom_encryption_public_key")
            const _nonce = searchParams.get("nonce")
            const data = searchParams.get("data")
            const action = searchParams.get("action")
            // if any of the params is missing, we return
            if (!phantomEncryptionPublicKey || !_nonce || !data || (action !== "connect")) {
                return
            }
            if (!phantomDappKeyPair?.secretKey) {
                return
            }
            const nonce = bs58.decode(_nonce)
            const sharedSecret = nacl.box.before(
                bs58.decode(phantomEncryptionPublicKey),
                phantomDappKeyPair.secretKey
            )
            // decrypt data
            const decoded = await decryptPhantomData<PhantomConnectData>({
                sharedSecret,
                encryptedData: data,
                nonce,
            })
            dispatch(setWallet({
                chainKey: ChainKey.Solana,
                walletData: {
                    address: decoded.public_key,
                    phantomSession: decoded.session,
                    phantomNonce: nonce,
                    phantomSharedSecret: sharedSecret,
                    isConnected: true,
                },
            }))
            // store the public key in the session storage
            await Promise.all([
                sessionDb.keyValueStore.bulkAdd([
                    {
                        key: SessionDbKey.PhantomAccountAddress,
                        value: decoded.public_key,
                    },
                    {
                        key: SessionDbKey.PhantomSession,
                        value: decoded.session,
                    },
                    {
                        key: SessionDbKey.PhantomSharedSecret,
                        value: bs58.encode(sharedSecret),
                    },
                ]),
            ])
        }
        handleEffect()
    }, [searchParams, phantomDappKeyPair, dispatch])

    // disconnect
    useEffect(() => { 
        const handleEffect = async () => {
            const action = searchParams.get("action")
            // if the action is disconnect, we reset the wallet and delete all data from local storage
            if (action === "disconnect") {
                if (!address) {
                    return
                }
                dispatch(resetWallet(ChainKey.Solana))
                // delete all data from local storage
                await sessionDb.keyValueStore.bulkDelete([
                    SessionDbKey.PhantomSession,
                    SessionDbKey.PhantomSharedSecret,
                    SessionDbKey.PhantomAccountAddress,
                ])
            }
        }
        handleEffect()
    }, [searchParams, address, dispatch])   

    // error
    useEffect(() => {
        const handleEffect = async () => {
            const errorCode = searchParams.get("errorCode")
            if (errorCode) {
                if (!address) {
                    return
                }
                dispatch(resetWallet(ChainKey.Solana))
                // delete all data from local storage
                await sessionDb.keyValueStore.bulkDelete([
                    SessionDbKey.PhantomSession,
                    SessionDbKey.PhantomSharedSecret,
                    SessionDbKey.PhantomAccountAddress,
                ])
            }
        }
        handleEffect()
    }, [searchParams, address, dispatch])    
}