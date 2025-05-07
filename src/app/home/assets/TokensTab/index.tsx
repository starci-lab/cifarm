import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { Token } from "@/components"
import { envConfig } from "@/env"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"

export const TokensTab: FC = () => {
    const { swr: staticData } = useSingletonHook<
        ReturnType<typeof useGraphQLQueryStaticSwr>
    >(QUERY_STATIC_SWR_MUTATION)

    const network = envConfig().network
    const chainKey = useAppSelector((state) => state.sidebarReducer.assetsChainKey)
    
    const tokens = Object.values(staticData.data?.data.tokens || {})
    return <div>
        {
            tokens.map((token) => {
                console.log(chainKey)
                console.log(network)
                const tokenData = token[chainKey]?.[network]
                console.log(tokenData)
                return <Token 
                    key={tokenData?.id}
                    token={{
                        address: tokenData?.tokenAddress || "",
                        symbol: tokenData?.name || "",
                        decimals: tokenData?.decimals || 0,
                        name: tokenData?.name || "",
                        enabled: true,
                        useHoneycombProtocol: false,
                        key: tokenData?.id || "",
                        imageUrl: tokenData?.imageUrl || "", 
                    }}
                    balanceSwr={{
                        data: 0,
                        error: null,
                        mutate: () => Promise.resolve(0),
                        isValidating: false,
                        isLoading: false,
                    }}
                    onClick={() => {}}
                />
            })
        }
    </div>
}
