import { pathConstants } from "@/constants"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import {
    setAccounts,
    setActiveAccountId,
    setAuthenticated,
    setChainKey,
    setAccountsLoaded,
    setMnemonic,
    setNetwork,
    triggerLoadAccounts,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { useEffect, useRef } from "react"
import { useRouterWithSearchParams } from "../useRouterWithSearchParams"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_MUTATION_AUTHENTICATION_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationAuthenticationSwrMutation } from "../swr"
import { useDisclosure } from "react-use-disclosure"
import { WELCOME_DISCLOSURE } from "@/app/constants"
import { accountIdRef } from "@/modules/apollo"

export const useAccounts = () => {
    const loadAccountsKey = useAppSelector(
        (state) => state.hookDependencyReducer.loadAccountsKey
    )
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationAuthenticationSwrMutation>
  >(GRAPHQL_MUTATION_AUTHENTICATION_SWR_MUTATION)

    const network = useAppSelector((state) => state.sessionReducer.network)
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const activeAccountId = useAppSelector((state) => state.sessionReducer.activeAccountId)
    const accounts = useAppSelector((state) => state.sessionReducer.accounts.accounts)

    //load the accounts, trigger when the loadAccountsKey changes
    useEffect(() => {
    //do nothing if loadAccountsKey is equal to 0
        if (!loadAccountsKey) return
        const handleEffect = async () => {
            //fetch all accounts with the same chainKey from IndexedDB, then load it to the redux store
            let accounts = await sessionDb.accounts
                .filter((account) => account.chainKey === chainKey)
                .toArray()
            // set the imageUrl for each account
            accounts = accounts.map((account) => {
                const imageUrl =
          account.imageUrl ?? createJazziconBlobUrl(account.address)
                account.imageUrl = imageUrl
                return account
            })
            // get the current account
            let currentAccountId: number | undefined = undefined
            const currentAccountIdValue = await sessionDb.keyValueStore.get(
                SessionDbKey.CurrentAccountId
            )
            if (!currentAccountIdValue) {
                // get the first account
                currentAccountId = accounts.find((account) => 
                    account.network === network && account.chainKey === chainKey
                )?.id
                if (!currentAccountId) {
                    throw new Error("Current account not found")
                }
                await sessionDb.keyValueStore.put({
                    key: SessionDbKey.CurrentAccountId,
                    value: currentAccountId.toString(),
                })
            } else {
                currentAccountId = Number.parseInt(currentAccountIdValue.value)
            }
            const currentAccount = accounts.find(
                (account) => account.id === currentAccountId
            )
            // get the current account
            if (!currentAccount) {
                throw new Error("Current account not found")
            }     
            dispatch(
                setAccounts({
                    accounts,
                    activateAccountId: currentAccount.id,
                })
            )
            // set the network
            dispatch(setNetwork(currentAccount.network))
            // set the chainKey
            dispatch(setChainKey(currentAccount.chainKey))
            // set the accountId
            accountIdRef.current = currentAccount.id
            // set the accountsLoaded
            dispatch(setActiveAccountId(currentAccount.id))
            //move to next page
            router.push(pathConstants.home)
        }
        handleEffect()
    }, [loadAccountsKey])

    // load when current account, network, chainKey changes
    const firstMount = useRef(true)
    useEffect(() => {
        if (firstMount.current) {
            firstMount.current = false
            return
        }
        const handleEffect = async () => {
            const currentAccount = await sessionDb.accounts
                .filter((account) => account.network === network && account.chainKey === chainKey)
                .first()
            if (!currentAccount) {
                throw new Error("Current account not found")
            }
            // set the current account
            dispatch(setActiveAccountId(currentAccount.id))
        }
        handleEffect()
    }, [network, chainKey])

    // load the mnemonic, trigger when start the app
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
                //dispatch to all useEffects to update changes with key `loadAccountsKey`
                dispatch(triggerLoadAccounts())
            } finally {
                // set loaded to true
                dispatch(setAccountsLoaded(true))
            }
        }
        handleEffect()
    }, [])

    const { open: openWelcomeModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(WELCOME_DISCLOSURE)

    // authenticate the user, trigger only the activeAccountId changes
    useEffect(() => {
        if (activeAccountId === undefined) return
        if (!accounts.length) return
        const handleEffect = async () => {
            //trigger the swrMutation
            await swrMutation.trigger()
            dispatch(setAuthenticated(true))
            //open the welcome modal
            openWelcomeModal()
        }
        handleEffect()
    }, [activeAccountId, accounts])
}
