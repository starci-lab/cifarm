"use client"
import { SELECT_TOKEN_DISCLOSURE } from "@/app/constants"
import { useBalanceSWR } from "@/hooks"
import { TokenInfo } from "@/modules/blockchain"
import { useSingletonHook } from "@/modules/singleton-hook"
import { WithKey } from "@/modules/common"
import { useAppSelector, WithValue } from "@/redux"
import { Card, CardBody, Image, useDisclosure } from "@heroui/react"
import React, { FC } from "react"

export interface TokenProps {
    token: WithKey<WithValue<TokenInfo>>
}

export const Token: FC<TokenProps> = ({ token }: TokenProps) => {
    const { onClose } = useSingletonHook<ReturnType<typeof useDisclosure>>(SELECT_TOKEN_DISCLOSURE)
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    //get the balance swr for the token
    const balanceSwr = useBalanceSWR({
        chainKey,
        network,
        tokenKey: token.key,
    })
    const { data } = balanceSwr.swr
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
                        {data}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}