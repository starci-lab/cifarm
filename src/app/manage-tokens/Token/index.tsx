"use client"
import { TokenInfo } from "@/modules/blockchain"
import { WithKey } from "@/modules/common"
import { setTokenKey, useAppDispatch, useAppSelector, WithEnabled } from "@/redux"
import { Image, PressableCard } from "@/components"
import React, { FC } from "react"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"

export interface TokenProps {
  token: WithKey<WithEnabled<TokenInfo>>;
}

export const Token: FC<TokenProps> = ({ token }: TokenProps) => {
    const balanceSwrs = useAppSelector(
        (state) => state.sessionReducer.balanceSwrs
    )
    const balanceSwr = balanceSwrs[token.key]
    const dispatch = useAppDispatch()
    const router = useRouterWithSearchParams()
    return (
        <PressableCard
            className="flex justify-between items-center p-3 rounded-none"
            showBorder={false}
            onClick={() => {
                dispatch(setTokenKey(token.key))
                router.push(pathConstants.token)
            }}
        >
            <div className="flex gap-2 items-center">
                <Image src={token.imageUrl} alt={token.name} className="w-8 h-8" />
                <div>
                    <div className="text-sm">{token.name}</div>
                    <div className="text-xs text-muted-foreground !text-start">
                        {token.symbol}
                    </div>
                </div>
            </div>
            <div className="text-sm">{balanceSwr.data}</div>   
        </PressableCard>
    )
}
