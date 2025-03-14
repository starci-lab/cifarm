import { valuesWithKey } from "@/modules/common"
import { sessionDb } from "@/modules/dexie"
import {
    ImportedTokens,
    importTokens,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { useEffect } from "react"

export const useTokens = () => {
    const loadTokensKey = useAppSelector(
        (state) => state.hookDependencyReducer.loadTokensKey
    )
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    const dispatch = useAppDispatch()

    useEffect(() => {
    //do nothing if loadTokensKey is equal to 0
        if (!loadTokensKey) return
        //fetch all tokens from IndexedDB, then load it to the redux store
        const handleEffect = async () => {
            //fetch all tokens from IndexedDB, then load it to the redux store
            const tokens = await sessionDb.tokens
                .filter(
                    (token) => token.chainKey === chainKey && token.network === network
                )
                .toArray()
            //convert tokens to map
            const tokenMap: ImportedTokens = tokens.reduce((tokens, token) => {
                tokens[token.id.toString()] = {
                    balance: 0,
                    address: token.address,
                    decimals: token.decimals,
                    imageUrl: token.imageUrl,
                    name: token.name,
                    symbol: token.symbol,
                    enabled: token.enabled,
                }
                return tokens
            }, {} as ImportedTokens)
            //load tokens to redux store
            dispatch(importTokens(tokenMap))
        }
        handleEffect()
    }, [loadTokensKey])

    useEffect(() => {
        const handleEffect = async () => {
            // fetch the token balance from the chain
            const tokens = useAppSelector((state) => state.sessionReducer.tokens)
            const tokensArray = valuesWithKey(tokens)
            const promises: Array<Promise<void>> = []

            for (const token of tokensArray) {
                const getBalance = async () => {
                    token.balance = 100
                }
                promises.push(getBalance())
            }
            await Promise.all(promises)
        }
        handleEffect()
    }, [chainKey, network])
}
