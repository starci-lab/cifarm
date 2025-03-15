"use client"
import { SELECT_TOKEN_DISCLOSURE } from "@/app/constants"
import { TokenInfo } from "@/modules/blockchain"
import { useSingletonHook } from "@/modules/singleton-hook"
import { WithKey } from "@/modules/common"
import { useAppSelector, WithEnabled } from "@/redux"
import { Card, CardBody, Image, useDisclosure } from "@heroui/react"
import React, { FC } from "react"

export interface TokenProps {
    token: WithKey<WithEnabled<TokenInfo>>
}

export const Token: FC<TokenProps> = ({ token }: TokenProps) => {
    const { onClose } = useSingletonHook<ReturnType<typeof useDisclosure>>(SELECT_TOKEN_DISCLOSURE)
    const balances = useAppSelector((state) => state.sessionReducer.balances)
    const balance = balances[token.key]
    const callback = useAppSelector(state => state.modalReducer.selectTokenModal.callback)
    return (
        <Card onPress={() => {
            if (callback) {
                callback(token.key)
            }
            onClose()
        }} isPressable key={token.key} radius="none" shadow="none" >
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
                        {balance.amount}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}