import React, { FC } from "react"
import { useAppSelector, useAppDispatch, setChainKey } from "@/redux"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { SELECT_CHAIN_DISCLOSURE } from "@/app/(core)/constants"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, ScrollArea, ModalHeader, IconSelection, Image, List } from "@/components"
import { ChainKey, chainKeyMap } from "@/modules/blockchain"
import { useWallet } from "@solana/wallet-adapter-react"
import { useCurrentWallet } from "@mysten/dapp-kit"
    
export const SelectChainModal: FC = () => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(SELECT_CHAIN_DISCLOSURE)
    const dispatch = useAppDispatch()
    // public key for solana
    const { publicKey } = useWallet()
    // current wallet for sui
    const { currentWallet } = useCurrentWallet()

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Select Chain" />
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <ScrollArea className="h-[400px]">
                        <List
                            classNames={{
                                container: "gap-2",
                            }}
                            showSeparator={false}
                            items={Object.values(ChainKey)}
                            contentCallback={(_chainKey) => {
                                const isDisabled = () => {
                                    if (_chainKey === chainKey) {
                                        return false
                                    }
                                    if (_chainKey === ChainKey.Solana) {
                                        return !publicKey
                                    }
                                    if (_chainKey === ChainKey.Sui) {
                                        return !currentWallet
                                    }
                                    if (_chainKey === ChainKey.Somnia) {
                                        return true
                                    }
                                    return false
                                }
                                return (
                                    <IconSelection
                                        disabled={isDisabled()}
                                        key={_chainKey}
                                        classNames={{
                                            description: "text-secondary",
                                        }}
                                        description={(() => {
                                            if (_chainKey === chainKey) {
                                                return undefined
                                            }
                                            if (_chainKey === ChainKey.Sui) {
                                                if (!currentWallet) {
                                                    return "Not connected"
                                                }
                                            }
                                            if (_chainKey === ChainKey.Somnia) {
                                                return "Coming soon"
                                            }
                                            return undefined
                                        })()}
                                        icon={<Image src={chainKeyMap.find((item) => item.key === _chainKey)?.iconUrl ?? ""} alt={chainKeyMap.find((item) => item.key === _chainKey)?.name ?? ""} className="w-10 h-10" />}
                                        text={chainKeyMap.find((item) => item.key === _chainKey)?.name}
                                        onClick={() => {
                                            dispatch(setChainKey(_chainKey))
                                            close()
                                        }}
                                    />  
                                )
                            }}
                        />
                    </ScrollArea>
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
