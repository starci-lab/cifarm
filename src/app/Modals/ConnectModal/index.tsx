"use client"
import { CONNECT_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
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
import { setSelectedChainKey, useAppSelector, useAppDispatch } from "@/redux"
import { ChainKey, chainKeyMap } from "@/modules/blockchain"
import { useWallet } from "@solana/wallet-adapter-react"
import { truncateString } from "@/modules/common"
import { SuiConnect } from "./SuiConnect"
import { useCurrentWallet } from "@mysten/dapp-kit"
export const ConnectModal: FC = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(CONNECT_DISCLOSURE)

    const selectedChainKey = useAppSelector(
        (state) => state.sessionReducer.selectedChainKey
    )

    const dispatch = useAppDispatch()

    const { publicKey } = useWallet()

    const { currentWallet } = useCurrentWallet()

    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
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
                                const isActive = item.key === chainKey
                                const getConnectText = () => {
                                    const NOT_CONNECTED = "Not connected"
                                    if (item.key === ChainKey.Solana) {
                                        return publicKey
                                            ? truncateString(publicKey.toBase58(), 4)
                                            : NOT_CONNECTED
                                    }
                                    if (item.key === ChainKey.Sui) {
                                        return (
                                            truncateString(
                                                currentWallet?.accounts[0]?.address || "",
                                                4
                                            ) || NOT_CONNECTED
                                        )
                                    }
                                    return NOT_CONNECTED
                                }
                                return (
                                    <div className="flex gap-2">
                                        <div className="text-muted-foreground text-sm">
                                            {getConnectText()}
                                        </div>
                                        {isActive && (
                                            <div className="text-secondary text-sm">Selected</div>
                                        )}
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
                        dispatch(setSelectedChainKey())
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
