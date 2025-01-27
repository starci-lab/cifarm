import { pathConstants } from "@/constants"
import { sessionDb } from "@/modules/dexie"
import { setAccounts, useAppDispatch, useAppSelector } from "@/redux"
import { useEffect } from "react"
import { useRouterWithSearchParams } from "../useRouterWithSearchParams"

export const useAccounts = () => {
    const loadAccountsKey = useAppSelector(
        (state) => state.hookDependencyReducer.loadAccountsKey
    )
    const chainKey = useAppSelector(
        (state) => state.sessionReducer.chainKey
    )
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
    //do nothing if loadAccountsKey is equal to 0
        if (!loadAccountsKey) return
        const handleEffect = async () => {
            //fetch all accounts with the same chainKey from IndexedDB, then load it to the redux store
            const accounts = await sessionDb.accounts
                .filter((account) => account.chainKey === chainKey)
                .toArray()
            const currentAccount = await sessionDb.currentAccount
                .filter((currentAccount) => currentAccount.chainKey === chainKey)
                .first()
            if (!currentAccount) {
                throw new Error("Current account not found")
            }
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

    //a hook that trigger on start
    useEffect(() => {
        const handleEffect = async () => {
            const accounts = await sessionDb.accounts
                .filter((account) => account.chainKey === chainKey)
                .toArray()
            // account not found, back to the default page
            if (!accounts.length) {
                router.push(pathConstants.default)
            }
            // account found, check session time left
        }
        handleEffect()
    }, [])
}
