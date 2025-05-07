import { SelectionDropdown, Image } from "@/components"
import { ChainKey, chainKeyMap } from "@/modules/blockchain"
import { setAssetsChainKey, useAppDispatch, useAppSelector } from "@/redux"
import React, { FC } from "react"

export const ChainSelectionDropdown: FC = () => {
    const { assetsChainKey } = useAppSelector((state) => state.sidebarReducer)
    const dispatch = useAppDispatch()
    return (
        <SelectionDropdown
            selectedKey={assetsChainKey}
            onSelectKeyChange={(key) => dispatch(setAssetsChainKey(key as ChainKey))}
            options={Object.values(chainKeyMap).map((chain) => ({
                key: chain.key,
                label: chain.name,
                value: chain.key,
                icon: (
                    <Image src={chain.iconUrl} alt={chain.name} className="w-5 h-5" />
                ),
            }))}
        />
    )
}
