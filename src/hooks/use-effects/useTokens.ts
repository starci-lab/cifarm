import { defaultNetwork } from "@/modules/blockchain"
import { defaultChainKey } from "@/modules/blockchain"
import { blockchainMap } from "@/modules/blockchain"
import { sessionDb } from "@/modules/dexie"
import {
    StateTokens,
    loadTokens,
    updateToken,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import _ from "lodash"
import { useEffect, useRef, useState } from "react"

export const useTokens = () => {
    const loadTokensKey = useAppSelector(
        (state) => state.hookDependencyReducer.loadTokensKey
    )
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    const accounts = useAppSelector((state) => state.sessionReducer.accounts.accounts)
    const accountsLoaded = useAppSelector((state) => state.sessionReducer.accountsLoaded)
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)

    const dispatch = useAppDispatch()

    const [ tokensLoaded, setTokensLoaded ] = useState(false)

    useEffect(() => {
    //do nothing if loadTokensKey is equal to 0
        if (!loadTokensKey && !accountsLoaded) return
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
            setTokensLoaded(true)
        }
        handleEffect()
    }, [loadTokensKey, accounts])

    // migration in case the default tokens show missing
    const migrationOccured = useRef(false)  
    useEffect(() => {
        if (!tokensLoaded) return
        if (migrationOccured.current) return
        migrationOccured.current = true
        const handleEffect = async () => {
            const defaultTokens = Object.entries(
                blockchainMap[defaultChainKey].defaultTokens[defaultNetwork]
            ).reduce((tokens, [key, token]) => {
                tokens[key] = { ...token, enabled: true }
                return tokens
            }, {} as StateTokens)
            // check if any additional keys
            const additionalKeys = Object.keys(defaultTokens).filter(
                (key) => !tokens[key]
            )
            if (additionalKeys.length > 0) {
                // add missing keys
                await sessionDb.tokens.bulkAdd(
                    additionalKeys.map((key) => ({
                        ...defaultTokens[key],
                        chainKey,
                        network,
                        key,
                    }))
                )
                // update redux store
                dispatch(loadTokens(defaultTokens))
            }
            // check if any deleted keys
            const deletedKeys = Object.keys(tokens).filter(
                (key) => !defaultTokens[key]
            )
            if (deletedKeys.length > 0) {
                // update redux store
                dispatch(loadTokens(defaultTokens))
            }

            // check if any changes between defaultTokens and tokens
            for (const key in defaultTokens) {
                if (!_.isEqual(defaultTokens[key], tokens[key])) {
                    // add missing keys
                    const token = await sessionDb.tokens.filter(
                        (token) => token.key === key
                    ).first()
                    if (!token) {
                        throw new Error(`Token ${key} not found`)
                    }
                    await sessionDb.tokens.put({
                        ...token,
                        ...defaultTokens[key],
                    })
                    // update redux store
                    dispatch(updateToken({
                        key,
                        token: defaultTokens[key]
                    }))
                }
            }
        }
        handleEffect()
    }, [tokensLoaded, tokens])
}
