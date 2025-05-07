"use client"
import {
    CONNECT_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Image,
    List,
    IconSelection
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { SolanaConnect } from "./SolanaConnect"
export const ConnectModal: FC = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(CONNECT_DISCLOSURE)

    const chains = [
        {
            name: "Sui",
            icon: <Image src="/sui.svg" alt="Sui" className="w-10 h-10" />,
            description: "Not connected",
        },
        {
            name: "Solana",
            icon: <Image src="/solana.svg" alt="Solana" className="w-10 h-10" />,
            description: "Not connected",
        },
        {
            name: "Sominia",
            icon: <Image src="https://docs.somnia.network/~gitbook/image?url=https%3A%2F%2F1813806305-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Forganizations%252FXixzx30CXHthiaKhEu1D%252Fsites%252Fsite_m7x2t%252Ficon%252FjdslfIGTxvTkjBH77O7V%252Flogo.png%3Falt%3Dmedia%26token%3Dfbc7ca1b-24b9-4847-ad0c-574ac536eff3&width=32&dpr=4&quality=100&sign=4c1bc3e1&sv=2" alt="Sominia" className="w-10 h-10" />,
            description: "Not connected",
        },
    ]   
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Connect</DialogTitle>
                </DialogHeader>     
                <SolanaConnect />
                <List
                    items={chains}
                    contentCallback={(item) => (
                        <IconSelection icon={item.icon} text={item.name} description={item.description} onClick={() => {}} />
                    )}
                    showSeparator={false}
                    classNames={{
                        container: "gap-2",
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}
