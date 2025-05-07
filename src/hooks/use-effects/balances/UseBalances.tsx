import React from "react"
import { BalanceComponent } from "./Component"
import { useSingletonHook } from "@/modules/singleton-hook"
import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks/swr"
import { valuesWithKey } from "@/modules/common"

export const UseBalances = () => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    const tokens = staticSwr.data?.data.tokens
    const tokensArray = valuesWithKey(tokens || {})
    return (
        <>
            {tokensArray.map((token) => {
                return (
                    <BalanceComponent key={token.key} tokenKey={token.key}/>
                )
            })}
        </>
    )
}
