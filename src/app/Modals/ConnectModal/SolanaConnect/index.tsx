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
import { setChainKey, useAppDispatch } from "@/redux"
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
    const dispatch = useAppDispatch()
    const solanaWallets = [
        {
            icon: <Image src="/phantom.svg" alt="Phantom" className="w-10 h-10" />,
            wallet: "Phantom",
            name: "Phantom",
            onClick: async () => {
                select("Phantom" as WalletName)
                dispatch(setChainKey(ChainKey.Solana))  
            },
        },
        {
            icon: <Image src="/solflare.svg" alt="Solflare" className="w-10 h-10" />,
            name: "Solflare",
            wallet: "Solflare",
            onClick: async () => {
                select("Solflare" as WalletName)
                dispatch(setChainKey(ChainKey.Solana))
            },
        },
    ]
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
                            onClick={item.onClick}
                            classNames={{
                                description: "text-secondary",
                            }}
                            description={
                                connected && wallet?.adapter.name === item.wallet
                                    ? "Connected"
                                    : undefined
                            }
                            isLoading={connecting && wallet?.adapter.name === item.wallet}
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
