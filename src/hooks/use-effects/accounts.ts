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
import { createJazziconBlobUrl } from "@/modules/jazz"
import { useSingletonHook } from "@/modules/singleton-hook"
import { API_AUTHENTICATION_SWR_MUTATION } from "@/app/constants"
import { useApiAuthenticationSwrMutation } from "../swr"

export const useAccounts = () => {
    const loadAccountsKey = useAppSelector(
        (state) => state.hookDependencyReducer.loadAccountsKey
    )
    const loaded = useAppSelector((state) => state.sessionReducer.loaded)
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()
    const pin = useAppSelector((state) => state.sessionReducer.pin)
    const {
        swrMutation,
    } =
        useSingletonHook<ReturnType<typeof useApiAuthenticationSwrMutation>>(
            API_AUTHENTICATION_SWR_MUTATION
        )
    useEffect(() => {
    //do nothing if loadAccountsKey is equal to 0
        if (!loadAccountsKey) return
        const handleEffect = async () => {
            //fetch all accounts with the same chainKey from IndexedDB, then load it to the redux store
            let accounts = await sessionDb.accounts
                .filter((account) => account.chainKey === chainKey)
                .toArray()
            accounts = accounts.map((account) => {
                const imageUrl =
          account.imageUrl ?? createJazziconBlobUrl(account.address)
                account.imageUrl = imageUrl
                return account
            })
            const currentAccount = await sessionDb.currentAccount
                .filter((currentAccount) => currentAccount.chainKey === chainKey)
                .first()
            if (!currentAccount) {
                throw new Error("Current account not found")
            }
            accounts = accounts.map((account) => {
                return account
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
                const mnemonic = await sessionDb.keyValueStore.get(
                    SessionDbKey.Mnemonic
                )
                if (!mnemonic) {
                    router.push(pathConstants.default)
                    return
                }
                //dispatch to set mnemonic
                dispatch(setMnemonic(mnemonic.value))
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

    useEffect(() => {
        if (!loaded) return
        const handleEffect = async () => {
            await swrMutation.trigger({})
        }
        handleEffect()
    }, [loaded])
}
