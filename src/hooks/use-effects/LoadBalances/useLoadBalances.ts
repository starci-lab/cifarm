import { useGraphQLQueryBlockchainBalanceSwr } from "../../swr"
import { useEffect } from "react"
import { setBalanceSwr, useAppDispatch } from "@/redux"
import { TokenKey } from "@/modules/entities"

export const useLoadBalances = (tokenKey: TokenKey) => {
    const dispatch = useAppDispatch()
    // fetch the nft collection swr
    const { swr: balanceSwr } = useGraphQLQueryBlockchainBalanceSwr(tokenKey)
    
    useEffect(() => {
        if (!tokenKey) return
        dispatch(setBalanceSwr({
            tokenKey,
            swr: balanceSwr,
        }))
    }, [balanceSwr, tokenKey])
}