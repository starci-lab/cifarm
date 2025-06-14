import {
    Image,
    IconSelection,
    List,
    ExtendedButton,
    DialogBody,
    DialogFooter,
} from "@/components"
import React, { FC, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletName, WalletReadyState } from "@solana/wallet-adapter-base"
import { setChainKey, useAppDispatch } from "@/redux"
import { ChainKey } from "@/modules/blockchain"

export const SolanaConnect: FC = () => {
    const { connect, select, connected, wallet, disconnect, wallets, connecting } = useWallet()
    useEffect(() => {
        if (!wallet?.adapter.name) {
            return
        }
        connect()
    }, [wallet?.adapter.name])
    const dispatch = useAppDispatch()
    const installedWallets = wallets.filter((wallet) => wallet.readyState === WalletReadyState.Installed)
    const loadableWallets = wallets.filter((wallet) => wallet.readyState === WalletReadyState.Loadable)
    const supportedWallets = [...installedWallets, ...loadableWallets]

    useEffect(() => {
        const handleEffect = async () => {
            if (wallet) {
                await connect()
                dispatch(setChainKey(ChainKey.Solana))
            }
        }
        handleEffect()
    }, [wallet])
    return (
        <>
            <DialogBody>
                <List
                    classNames={{
                        container: "gap-2",
                    }}
                    enableScroll={false}
                    items={supportedWallets}
                    contentCallback={(item) => (
                        <IconSelection
                            key={item.adapter.name}
                            disabled={connected}
                            icon={<Image src={item.adapter.icon} alt={item.adapter.name} className="w-10 h-10" />}
                            text={item.adapter.name}
                            onClick={async () => {
                                select(item.adapter.name as WalletName)
                                dispatch(setChainKey(ChainKey.Solana))
                            }}
                            classNames={{
                                description: "text-secondary",
                            }}
                            description={
                                connected && wallet?.adapter.name === item.adapter.name
                                    ? "Connected"
                                    : undefined
                            }
                            isLoading={
                                connecting &&
                                wallet?.adapter.name === item.adapter.name
                            }
                        />
                    )}
                    showSeparator={false}
                />
            </DialogBody>
            <DialogFooter>
                <ExtendedButton
                    disabled={!connected}
                    className="w-full"
                    color="destructive"
                    onClick={() => {
                        disconnect()
                    }}
                >
          Disconnect
                </ExtendedButton>
            </DialogFooter>
        </>
    )
}
