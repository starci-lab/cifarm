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
import { WalletName } from "@solana/wallet-adapter-base"
import { useAppSelector, useAppDispatch, setChainKey } from "@/redux"
import { ChainKey } from "@/modules/blockchain"
export const SolanaConnect: FC = () => {
    const { connect, select, connecting, connected, wallet, disconnect } =
    useWallet()
    useEffect(() => {
        if (!wallet?.adapter.name) {
            return
        }
        connect()
    }, [wallet?.adapter.name])

    const solanaWallets = [
        {
            icon: <Image src="/phantom.svg" alt="Phantom" className="w-10 h-10" />,
            wallet: "Phantom",
            name: "Phantom",
            onClick: async () => {
                select("Phantom" as WalletName)
            },
        },
        {
            icon: <Image src="/solflare.svg" alt="Solflare" className="w-10 h-10" />,
            name: "Solflare",
            wallet: "Solflare",
            onClick: async () => {
                select("Solflare" as WalletName)
            },
        },
    ]

    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const dispatch = useAppDispatch()
    return (
        <>
            <DialogBody>
                <List
                    classNames={{
                        container: "gap-2",
                    }}
                    enableScroll={false}
                    items={solanaWallets}
                    contentCallback={(item) => (
                        <IconSelection
                            key={item.wallet}
                            disabled={connected}
                            icon={item.icon}
                            text={item.name}
                            classNames={{
                                description: "text-secondary",
                            }}
                            onClick={item.onClick}
                            isLoading={connecting && wallet?.adapter.name === item.wallet}
                            description={
                                connected && wallet?.adapter.name === item.wallet
                                    ? "Connected"
                                    : undefined
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
                <ExtendedButton
                    className="w-full"
                    color="default"
                    disabled={chainKey === ChainKey.Solana || !connected}
                    onClick={() => {
                        dispatch(setChainKey(ChainKey.Solana))
                    }}
                >
          Select
                </ExtendedButton>
            </DialogFooter>
        </>
    )
}
