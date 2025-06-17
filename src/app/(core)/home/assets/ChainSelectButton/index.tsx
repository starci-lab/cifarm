import { ExtendedButton, Image } from "@/components"
import { chainKeyMap } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import { useSingletonHook } from "@/singleton"
import { SELECT_CHAIN_DISCLOSURE } from "@/singleton"
import React, { FC } from "react"
import { useDisclosure } from "react-use-disclosure"
import { CaretDown } from "@phosphor-icons/react"

export const ChainSelectButton: FC = () => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const { open: openSelectChainModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(SELECT_CHAIN_DISCLOSURE)
    return (
        <ExtendedButton 
            variant="flat"
            color="secondary"
            onClick={() => openSelectChainModal()}
        >
            <Image src={chainKeyMap.find((item) => item.key === chainKey)?.iconUrl ?? ""} alt={chainKeyMap.find((item) => item.key === chainKey)?.name ?? ""} className="w-5 h-5" />
            <div>{chainKeyMap.find((item) => item.key === chainKey)?.name ?? ""}</div>
            <CaretDown className="w-4 h-4" />
        </ExtendedButton>
    )
}
