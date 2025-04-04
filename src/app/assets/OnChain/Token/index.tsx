"use client"
import { TokenInfo } from "@/modules/blockchain"
import { WithKey } from "@/modules/common"
import { setTokenModal, useAppDispatch, useAppSelector, WithEnabled } from "@/redux"
import { Image, PressableCard } from "@/components"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { TOKEN_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"

export interface TokenProps {
  token: WithKey<WithEnabled<TokenInfo>>;
}

export const Token: FC<TokenProps> = ({ token }: TokenProps) => {
    const balanceSwrs = useAppSelector(
        (state) => state.sessionReducer.balanceSwrs
    )
    const balanceSwr = balanceSwrs[token.key]
    const { open } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(TOKEN_DISCLOSURE)
    const dispatch = useAppDispatch()
    return (
        <PressableCard
            className="flex justify-between items-center p-3 rounded-none"
            showBorder={false}
            onClick={() => {
                dispatch(setTokenModal({
                    tokenKey: token.key,
                }))
                open()
            }}
        >
            <div className="flex gap-2 items-center">
                <Image src={token.imageUrl} alt={token.name} className="w-8 h-8" />
                <div>
                    <div className="text-sm">{token.name}</div>
                    <div className="text-xs text-foreground-400 !text-start">
                        {token.symbol}
                    </div>
                </div>
            </div>
            <div className="text-sm">{balanceSwr.data}</div>
        </PressableCard>
    )
}
