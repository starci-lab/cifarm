import React, { FC } from "react"
import { ExtendedButton, Spacer } from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/(core)/constants"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

export const RPCLimitationWarning: FC = () => {
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(GRAPHQL_QUERY_STATIC_SWR)    
    const refreshMinutes = dayjs.duration(staticSwr?.data?.data.blockchainDataConfigs.balances.refreshInterval || 0, "seconds").asMinutes()
    return (
        <div className="bg-secondary/10 p-4 rounded-lg">
            <div className="text-xl text-secondary leading-none">RPC Limitation</div>
            <Spacer y={4} />
            <div className="text-muted-foreground">
            Due to current RPC limitations, data is cached and can be refreshed every {refreshMinutes} minutes. Need more frequent updates? Upgrade to an Unlimited RPC plan for uninterrupted access. You will earn some tCIFARM tokens as a reward.
            </div>
            <Spacer y={4} />
            <ExtendedButton variant="flat" color="secondary">
                Upgrade
            </ExtendedButton>
        </div>
    )
}