import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { blockchainMap, networkMap } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export const SelectChainButton: FC = () => {
    const router = useRouterWithSearchParams()
    const chainKey = useAppSelector(
        (state) => state.sessionReducer.chainKey
    )
    const network = useAppSelector(
        (state) => state.sessionReducer.network
    )
    const imageUrl = blockchainMap[chainKey].imageUrl
    const networkName = networkMap[network].name
    return (
        <Button
            variant="outline"
            size="sm"
            className="bg-background"
            onClick={() => router.push(pathConstants.selectChain)}
        >
            <Image 
                src={imageUrl} 
                alt={networkName}
                width={16}
                height={16}
                className="mr-2"
            />
            {networkName}
        </Button>
    )
}
