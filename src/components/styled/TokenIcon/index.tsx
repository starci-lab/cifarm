import React, { FC } from "react"
import { TokenKey, Tokens } from "@/modules/entities"
import { Image } from "../Image"
import { cn } from "@/utils"
import { ChainKey, Network } from "@/modules/blockchain"

interface TokenIconProps {
    tokenKey: TokenKey
    chainKey: ChainKey
    network: Network
    className?: string
    tokens: Tokens
}

export const TokenIcon: FC<TokenIconProps> = ({ tokenKey, chainKey, network, className, tokens  }) => {
    const token = tokens[tokenKey]?.[chainKey]?.[network]
    return <Image
        src={token?.imageUrl || ""}
        className={cn("w-6 h-6", className)}
    />
}
