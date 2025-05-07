// component to fetch the balance of a token via SWR
import React, { useEffect } from "react"
import { useBalanceSwr } from "./useBalanceSwr"
import { removeBalanceSwr, setBalanceSwr } from "@/redux"
import { useAppDispatch } from "@/redux"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks/swr"
import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { TokenKey } from "@/modules/entities"

interface BalanceComponentProps {
  tokenKey: TokenKey;
}

export const BalanceComponent = ({
    tokenKey,
}: BalanceComponentProps) => {
    const dispatch = useAppDispatch()
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    const tokens = staticSwr.data?.data.tokens || {}
    const { swr } = useBalanceSwr({
        tokens,
        tokenKey: tokenKey,
    })

    useEffect(() => {
        dispatch(
            setBalanceSwr({
                tokenKey,
                swr,
            })
        )
    }, [swr])

    useEffect(() => {
        return () => {
            dispatch(removeBalanceSwr(tokenKey))
        }
    }, [])

    return <></>
}
