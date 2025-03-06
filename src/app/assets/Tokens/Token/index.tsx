"use client"
import { useBalanceSWR } from "@/hooks"
import { TokenInfo } from "@/modules/blockchain"
import { WithKey } from "@/modules/common"
import { useAppSelector, WithEnabled } from "@/redux"
import { Card, CardBody, Image } from "@heroui/react"
import React, { FC } from "react"

export interface TokenProps {
    token: WithKey<WithEnabled<TokenInfo>>
}

export const Token: FC<TokenProps> = ({ token }: TokenProps) => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    //get the balance swr for the token
    const balanceSwr = useBalanceSWR({
        chainKey,
        network,
        tokenKey: token.key,
    })
    const { data } = balanceSwr.swr
    return (
        <Card isPressable key={token.key} radius="none" shadow="none">
            <CardBody>
                <div className="w-full justify-between flex items-center">
                    <div className="flex gap-2 items-center">
                        <Image
                            src={token.imageUrl}
                            alt={token.name}
                            className="w-8 h-8"
                        />
                        <div>
                            <div className="text-sm">{token.name}</div>
                            <div className="text-xs text-foreground-400">
                                {token.symbol}
                            </div>
                        </div>
                    </div>
                    <div className="text-sm">
                        {data}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}