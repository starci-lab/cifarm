"use client"
import { TokenInfo } from "@/modules/blockchain"
import { WithKey } from "@/modules/common"
import { Image, PressableCard } from "@/components"
import React, { FC } from "react"
import { SWRResponse } from "swr"
import { WithEnabled } from "@/redux"

export interface TokenProps {
  token: WithKey<WithEnabled<TokenInfo>>;
  balanceSwr: SWRResponse<number>
  onClick: () => void
}

export const Token: FC<TokenProps> = ({ token, balanceSwr, onClick }: TokenProps) => {
    return (
        <PressableCard
            className="flex justify-between items-center p-3 rounded-none"
            showBorder={false}
            onClick={onClick}
        >
            <div className="flex justify-between items-center w-full">
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
            </div>
        </PressableCard>
    )
}
