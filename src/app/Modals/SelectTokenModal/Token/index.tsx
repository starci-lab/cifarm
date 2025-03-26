"use client"
import { SELECT_TOKEN_DISCLOSURE } from "@/app/constants"
import { TokenInfo } from "@/modules/blockchain"
import { useSingletonHook } from "@/modules/singleton-hook"
import { WithKey } from "@/modules/common"
import { useAppSelector, WithEnabled } from "@/redux"
import { useDisclosure } from "@/hooks"
import React, { FC } from "react"
import { Image, PressableCard } from "@/components"

export interface TokenProps {
    token: WithKey<WithEnabled<TokenInfo>>
}

export const Token: FC<TokenProps> = ({ token }: TokenProps) => {
    const { onClose } = useSingletonHook<ReturnType<typeof useDisclosure>>(SELECT_TOKEN_DISCLOSURE)
    const balances = useAppSelector((state) => state.sessionReducer.balances)
    const balanceSwr = balances[token.key]
    const callback = useAppSelector(state => state.modalReducer.selectTokenModal.callback)
    return (
        <PressableCard 
            showBorder={false}
            className="w-full h-full p-3 whitespace-normal rounded-none"
            onClick={() => {
                if (callback) {
                    callback(token.key)
                }
                onClose()
            }}
        >
            <div className="w-full justify-between flex items-center">
                <div className="flex gap-2 items-center">
                    <Image
                        src={token.imageUrl}
                        className="w-10 h-10"
                    />
                    <div className="flex flex-col items-start">
                        <div className="text-sm">{token.name}</div>
                        <div className="text-xs text-muted-foreground">
                            {token.symbol}
                        </div>
                    </div>
                </div>
                <div className="text-sm">
                    {balanceSwr.data}
                </div>
            </div>
        </PressableCard>
    )
}