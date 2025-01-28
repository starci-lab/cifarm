import { pathConstants } from "@/constants"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import {
    setAccounts,
    setLoaded,
    setMnemonic,
    setPin,
    triggerLoadAccounts,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { useEffect } from "react"
import { useRouterWithSearchParams } from "../useRouterWithSearchParams"
import { deserialize } from "@/modules/serialization"
import { decrypt, EncryptedResult } from "@/modules/cryptography"
import Cookie from "js-cookie"
import { getSessionCookieMaxAge, SESSION_COOKIE_NAME, SessionCookieData } from "@/modules/cookie"
import { serialize } from "@/modules/serialization"

export const useAccounts = () => {
    const loadAccountsKey = useAppSelector(
        (state) => state.hookDependencyReducer.loadAccountsKey
    )
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()
    const pin = useAppSelector((state) => state.sessionReducer.pin)

    useEffect(() => {
    //do nothing if loadAccountsKey is equal to 0
        if (!loadAccountsKey) return
        const handleEffect = async () => {
            //fetch all accounts with the same chainKey from IndexedDB, then load it to the redux store
            let accounts = await sessionDb.accounts
                .filter((account) => account.chainKey === chainKey)
                .toArray()
            const currentAccount = await sessionDb.currentAccount
                .filter((currentAccount) => currentAccount.chainKey === chainKey)
                .first()
            if (!currentAccount) {
                throw new Error("Current account not found")
            }
            accounts = accounts.map((account) => {
                const { data: encryptedData, iv } = deserialize<EncryptedResult>(
                    account.privateKey
                )
                return {
                    ...account,
                    privateKey: decrypt({
                        encryptedData,
                        iv,
                        key: pin,
                    }),
                }
            })
            dispatch(
                setAccounts({
                    accounts,
                    currentId: currentAccount.accountId,
                })
            )
            //move to next page
            router.push(pathConstants.home)
        }
        handleEffect()
    }, [loadAccountsKey])

    //hook that trigger when start the app
    useEffect(() => {
        const handleEffect = async () => {
            try {
                //check if mnemonic exists
                const encryptedMnemonic = await sessionDb.keyValueStore.get(
                    SessionDbKey.Mnemonic
                )
                if (!encryptedMnemonic) {
                    router.push(pathConstants.default)
                    return
                }
                //check if session exists
                const session = Cookie.get(SESSION_COOKIE_NAME)
                //if not exists, navigate to enter pin path
                if (!session) {
                    router.push(pathConstants.enterPin)
                    return
                }
                //parse the session
                const { pin } = deserialize<SessionCookieData>(session)
                //decrypt the mnemonic
                const { data: encryptedData, iv } = deserialize<EncryptedResult>(
                    encryptedMnemonic.value
                )
                const mnemonic = decrypt({
                    encryptedData,
                    iv,
                    key: pin,
                })
                //set cookie
                Cookie.set(SESSION_COOKIE_NAME, serialize({ pin }), {
                    expires: getSessionCookieMaxAge(),
                })
                //dispatch to set mnemonic
                dispatch(setMnemonic(mnemonic))
                //dispatch to set pin
                dispatch(setPin(pin))
                //dispatch to all useEffects to update changes with key `loadAccountsKey`
                dispatch(triggerLoadAccounts())
            } finally {
                // set loaded to true
                dispatch(setLoaded(true))
            }
        }
        handleEffect()
    }, [])
}
