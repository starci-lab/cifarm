import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { blockchainMap, networkMap } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import { Button, Image } from "@heroui/react"
import React, { FC } from "react"

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
            size="sm"
            className="bg-background"
            onPress={() => router.push(pathConstants.selectChain)}
            startContent={<Image src={imageUrl} radius="none" className="w-4 h-4" />}
        >
            {networkName}
        </Button>
    )
}
