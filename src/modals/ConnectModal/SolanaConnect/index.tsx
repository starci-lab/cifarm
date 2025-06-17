import {
    Image,
    IconSelection,
    List,
    ExtendedButton,
    DialogBody,
    DialogFooter,
} from "@/components"
import React, { FC } from "react"
import {
    resetSolanaWallet,
    setSolanaWallet,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { solanaWallets } from "@/hooks"

export const SolanaConnect: FC = () => {
    const dispatch = useAppDispatch()
    const supportedWallets = solanaWallets
    const wallet = useAppSelector((state) => state.walletReducer.solanaWallet)
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
                            key={item.walletName}
                            disabled={wallet?.isConnected}
                            icon={
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-10 h-10"
                                />
                            }
                            text={item.name}
                            onClick={async () => {
                                await wallet?.connect()
                                dispatch(
                                    setSolanaWallet({
                                        walletName: item.walletName,
                                    })
                                )
                            }}
                            classNames={{
                                description: "text-secondary",
                            }}
                            description={
                                wallet?.isConnected && wallet?.walletName === item.walletName
                                    ? "Connected"
                                    : undefined
                            }
                            isLoading={
                                wallet?.isLoading && wallet?.walletName === item.walletName
                            }
                        />
                    )}
                    showSeparator={false}
                />
            </DialogBody>
            <DialogFooter>
                <ExtendedButton
                    disabled={!wallet?.isConnected}
                    className="w-full"
                    color="destructive"
                    onClick={async () => {
                        await wallet?.disconnect()
                        dispatch(resetSolanaWallet())
                    }}
                >
          Disconnect
                </ExtendedButton>
            </DialogFooter>
        </>
    )
}
