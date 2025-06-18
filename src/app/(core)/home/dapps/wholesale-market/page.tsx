"use client"

import {
    Card,
    CardBody,
    CardFooter,
    ExtendedButton,
    Link,
    Spacer,
    Title,
    TokenIcon,
} from "@/components"
import { Header } from "@/components"
import { BlurEffect } from "@/components"
import React, { FC } from "react"
import { useSingletonHook, GRAPHQL_QUERY_VAULT_CURRENT_SWR, useGraphQLQueryVaultCurrentSwr } from "@/singleton"
import { BulkCard } from "./BulkCard"
import { SeasonBanner } from "./SeasonBanner"
import { ChainKey, explorerUrl, Network } from "@/modules/blockchain"
import { envConfig } from "@/env"
import { truncateString } from "@/modules/common"
import { ArrowCounterClockwise } from "@phosphor-icons/react"
import { useAppSelector } from "@/redux"

const Page: FC = () => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const vaultCurrent = useAppSelector(
        (state) => state.apiReducer.coreApi.vaultCurrent
    )
    const network = envConfig().network
    const { swr: vaultCurrentSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryVaultCurrentSwr>
  >(GRAPHQL_QUERY_VAULT_CURRENT_SWR)
    if (!vaultCurrent) return null
    return (
        <div className="relative">
            <BlurEffect size="lg" position="top" className="-z-10" />
            <Header title="Wholesale Market" />
            <Spacer y={6} />
            <SeasonBanner />
            <Spacer y={6} />
            <div className="grid gap-6">
                <div>
                    <div className="flex justify-between">
                        <Title
                            title="Vault"
                            classNames={{
                                title: "text-2xl text-muted-foreground",
                                tooltip: "text-muted-foreground w-6 h-6",
                            }}
                            tooltipString="Vault is the place where token is locked in."
                        />
                        <ExtendedButton
                            variant="flat"
                            color="secondary"
                            size="icon"
                            onClick={async () => {
                                await vaultCurrentSwr.mutate()
                            }}
                        >
                            <ArrowCounterClockwise />
                        </ExtendedButton>
                    </div>
                    <Spacer y={4} />
                    <Card className="w-full">
                        <CardBody>
                            <div className="flex flex-col gap-4 w-full">
                                {vaultCurrent.data.map((vaultCurrent) => {
                                    if (!staticData?.tokens) return null
                                    return (
                                        <div
                                            key={vaultCurrent.tokenKey}
                                            className="flex items-center justify-between gap-2"
                                        >
                                            <div className="flex items-center gap-2">
                                                <TokenIcon
                                                    tokens={staticData?.tokens}
                                                    tokenKey={vaultCurrent.tokenKey}
                                                    chainKey={ChainKey.Solana}
                                                    network={Network.Testnet}
                                                    className="w-10 h-10"
                                                />
                                                <div>
                                                    <div>
                                                        {
                                                            staticData?.tokens[vaultCurrent.tokenKey]?.[
                                                                ChainKey.Solana
                                                            ]?.[network]?.name
                                                        }
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {
                                                            staticData?.tokens[vaultCurrent.tokenKey]?.[
                                                                ChainKey.Solana
                                                            ]?.[network]?.symbol
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-2xl">{vaultCurrent.tokenLocked}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardBody>
                        <CardFooter>
                            <Link
                                showIcon
                                href={explorerUrl({
                                    network,
                                    type: "address",
                                    chainKey: ChainKey.Solana,
                                    value: vaultCurrent?.vaultAddress ?? "",
                                })}
                                target="_blank"
                            >
                                {truncateString(vaultCurrent?.vaultAddress ?? "")}
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
                <div>
                    <Title
                        title="Bulks"
                        classNames={{
                            title: "text-2xl text-muted-foreground",
                            tooltip: "text-muted-foreground w-6 h-6",
                        }}
                        tooltipString="Bulk shows in the wholesale market are a way to earn tokens."
                    />
                    <Spacer y={4} />
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                        {staticData?.activeSeason.bulks.map((bulk) => (
                            <BulkCard key={bulk.id} bulk={bulk} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
