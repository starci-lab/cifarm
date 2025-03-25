"use client"
import { SELECT_TOKEN_DISCLOSURE } from "@/app/constants"
import { TokenInfo } from "@/modules/blockchain"
import { useSingletonHook } from "@/modules/singleton-hook"
import { WithKey } from "@/modules/common"
import { useAppSelector, WithEnabled } from "@/redux"
import { useDisclosure } from "@/hooks"
import React, { FC } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
export interface TokenProps {
    token: WithKey<WithEnabled<TokenInfo>>
}

export const Token: FC<TokenProps> = ({ token }: TokenProps) => {
    const { onClose } = useSingletonHook<ReturnType<typeof useDisclosure>>(SELECT_TOKEN_DISCLOSURE)
    const balances = useAppSelector((state) => state.sessionReducer.balances)
    const balanceSwr = balances[token.key]
    const callback = useAppSelector(state => state.modalReducer.selectTokenModal.callback)
    return (
        <Card 
            className="cursor-pointer hover:bg-accent/50 transition-colors" 
            onClick={() => {
                if (callback) {
                    callback(token.key)
                }
                onClose()
            }}
        >
            <CardContent className="p-4">
                <div className="w-full justify-between flex items-center">
                    <div className="flex gap-2 items-center">
                        <Image
                            src={token.imageUrl}
                            alt={token.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <div>
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
            </CardContent>
        </Card>
    )
}