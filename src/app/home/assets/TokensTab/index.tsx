import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { List, Token } from "@/components"
import { envConfig } from "@/env"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"
import { valuesWithKey } from "@/modules/common"

export const TokensTab: FC = () => {
    const { swr: staticData } = useSingletonHook<
        ReturnType<typeof useGraphQLQueryStaticSwr>
    >(QUERY_STATIC_SWR_MUTATION)

    const network = envConfig().network
    const chainKey = useAppSelector((state) => state.sidebarReducer.assetsChainKey)
    
    const tokens = valuesWithKey(staticData.data?.data.tokens || {})

    const balanceSwrs = useAppSelector(
        (state) => state.sessionReducer.balanceSwrs
    )
    return <List
        items={tokens}
        enableScroll={false}
        showSeparator={false}
        classNames={{
            container: "gap-2",
        }}
        contentCallback={(token) => {
            const tokenData = token[chainKey]?.[network]
            if (!tokenData) {
                return null
            }
            return (
                <Token 
                    key={token.key}
                    token={tokenData}
                    balanceSwr={balanceSwrs[token.key]}
                    onClick={() => {}}
                />
            )
        }}
    />
}
