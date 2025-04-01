import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { blockchainMap, networkMap } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"
import { ExtendedButton } from "@/components"

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
        <ExtendedButton
            variant="outline"
            onClick={() => router.push(pathConstants.selectChain)}
        >
            <img src={imageUrl} alt={networkName} className="w-5 h-5 mr-2" />
            {networkName}
        </ExtendedButton>
    )
}
