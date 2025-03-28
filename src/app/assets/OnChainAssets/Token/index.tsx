"use client"
import { TokenInfo } from "@/modules/blockchain"
import { WithKey } from "@/modules/common"
import { useAppSelector, WithEnabled } from "@/redux"
import { Image } from "@/components"
import React, { FC } from "react"

export interface TokenProps {
    token: WithKey<WithEnabled<TokenInfo>>
}

export const Token: FC<TokenProps> = ({ token }: TokenProps) => {
    const balances = useAppSelector((state) => state.sessionReducer.balances)
    const balanceSwr = balances[token.key]
    return (
        <div className="flex justify-between items-center p-3">
            <div className="flex gap-2 items-center">
                <Image
                    src={token.imageUrl}
                    alt={token.name}
                    className="w-8 h-8"
                />
                <div>
                    <div className="text-sm">{token.name}</div>
                    <div className="text-xs text-foreground-400 !text-start">
                        {token.symbol}
                    </div>
                </div>
            </div>
            <div className="text-sm">
                {balanceSwr.data}
            </div>
        </div>
    )
}