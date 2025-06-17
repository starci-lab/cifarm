"use client"
import { CONNECT_MODAL_DISCLOSURE } from "@/singleton"
import { useSingletonHook } from "@/singleton"
import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    List,
    Image,
    IconSelection,
    DialogBody,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { SolanaConnect } from "./SolanaConnect"
import { useAppSelector, useAppDispatch, setSelectedChainKey } from "@/redux"
import { ChainKey, chainKeyMap } from "@/modules/blockchain"
import { truncateString } from "@/modules/common"
import { SuiConnect } from "./SuiConnect"
import { useGlobalAccountAddress } from "@/hooks"
export const ConnectModal: FC = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(CONNECT_MODAL_DISCLOSURE)

    const selectedChainKey = useAppSelector(
        (state) => state.sessionReducer.selectedChainKey
    )

    const dispatch = useAppDispatch()

    const { accountAddress } = useGlobalAccountAddress()
    const renderContent = () => {
        if (selectedChainKey === ChainKey.Solana) {
            return <SolanaConnect />
        }
        if (selectedChainKey === ChainKey.Sui) {
            return <SuiConnect />
        }
        return (
            <DialogBody>
                <List
                    items={chainKeyMap}
                    enableScroll={false}
                    contentCallback={(item) => (
                        <IconSelection
                            icon={<Image src={item.iconUrl} className="w-10 h-10" />}
                            text={item.name}
                            onClick={() => {
                                dispatch(setSelectedChainKey(item.key))
                            }}  
                            description={(() => {
                                
                                return (
                                    <div className="flex gap-2">
                                        <div className="text-muted-foreground text-sm">
                                            {accountAddress && truncateString(accountAddress, 4)}
                                        </div>
                                    </div>
                                )
                            })()}
                        />
                    )}
                    showSeparator={false}
                    classNames={{
                        container: "gap-2",
                    }}
                />
            </DialogBody>
        )
    }

    const renderTitle = () => {
        if (selectedChainKey) {
            return (
                <DialogTitle
                    showLeftChevron
                    onLeftChevronClick={() => {
                        dispatch(setSelectedChainKey(undefined))
                    }}
                >
                    {chainKeyMap.find((item) => item.key === selectedChainKey)?.name}
                </DialogTitle>
            )
        }
        return <DialogTitle>Connect</DialogTitle>
    }

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>{renderTitle()}</DialogHeader>
                {renderContent()}
            </DialogContent>
        </Dialog>
    )
}
