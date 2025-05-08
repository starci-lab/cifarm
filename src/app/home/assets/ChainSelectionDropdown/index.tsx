import { SelectionDropdown, Image } from "@/components"
import { ChainKey, chainKeyMap } from "@/modules/blockchain"
import { setChainKey, useAppDispatch, useAppSelector } from "@/redux"
import React, { FC } from "react"

export const ChainSelectionDropdown: FC = () => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const dispatch = useAppDispatch()
    return (
        <SelectionDropdown
            selectedKey={chainKey}
            onSelectKeyChange={(key) => dispatch(setChainKey(key as ChainKey))}
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
