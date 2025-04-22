import { sessionDb } from "@/modules/dexie"
import {
    StateTokens,
    loadTokens,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import _ from "lodash"
import { useEffect } from "react"

export const useTokens = () => {
    const loadTokensKey = useAppSelector(
        (state) => state.hookDependencyReducer.loadTokensKey
    )
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    const accounts = useAppSelector((state) => state.sessionReducer.accounts)
    
    const dispatch = useAppDispatch()

    useEffect(() => {
    //do nothing if loadTokensKey is equal to 0
        if (!loadTokensKey && _.isEmpty(accounts)) return
        // fetch all tokens from IndexedDB, then load it to the redux store
        const handleEffect = async () => {
            //fetch all tokens from IndexedDB, then load it to the redux store
            const tokens = await sessionDb.tokens
                .filter(
                    (token) => token.chainKey === chainKey && token.network === network
                )
                .toArray()
            //convert tokens to map
            const tokenMap: StateTokens = tokens.reduce((tokens, token) => {
                tokens[token.key] = {
                    address: token.address,
                    decimals: token.decimals,
                    imageUrl: token.imageUrl,
                    name: token.name,
                    symbol: token.symbol,
                    enabled: token.enabled,
                }
                return tokens
            }, {} as StateTokens)
            //load tokens to redux store
            dispatch(loadTokens(tokenMap))
        }
        handleEffect()
    }, [loadTokensKey, accounts])
}
