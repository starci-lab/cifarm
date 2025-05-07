"use client"

import React, {
    PropsWithChildren,
    Suspense,
    useMemo,
    useRef,
} from "react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import { SWRConfig } from "swr"
import dynamic from "next/dynamic"
import {
    SingletonHook2Provider,
    SingletonHookProvider,
} from "./SingletonHookProviders"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Baloo_2 } from "next/font/google"
import { SidebarProvider } from "@/components"
import { envConfig } from "@/env"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import {
    ConnectionProvider,
    WalletProvider
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"

const Modals = dynamic(() => import("./Modals"), {
    ssr: false,
})

const UseEffects = dynamic(() => import("@/hooks/use-effects"), {
    ssr: false,
})

export const LayoutContent = ({ children }: PropsWithChildren) => {
    const network = envConfig().network
    const solanaNetwork = useMemo(() => network === "testnet" ? WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet, [network])
    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(solanaNetwork), [solanaNetwork])
    return (
        <Suspense>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        <TooltipProvider> 
                            <SWRConfig
                                value={{
                                    provider: () => new Map(),
                                    revalidateOnFocus: false,
                                    revalidateIfStale: false,
                                }}
                            >
                                <SingletonHookProvider>
                                    <SingletonHook2Provider>
                                        <NextThemesProvider
                                            attribute="class"
                                            defaultTheme="light"
                                            enableSystem
                                            disableTransitionOnChange
                                        >
                                            <SidebarProvider>
                                    
                                                {children}
                                                <UseEffects />
                                                <Modals />
                                                <Toaster />
                                            </SidebarProvider>
                                        </NextThemesProvider>
                                    </SingletonHook2Provider>
                                </SingletonHookProvider>
                            </SWRConfig>
                        </TooltipProvider>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </Suspense>
    )
}

const font = Baloo_2({ subsets: ["latin"], weight: ["400", "700"] })

export const WrappedLayout = ({ children }: PropsWithChildren) => {
    const bodyRef = useRef<HTMLBodyElement>(null)
    return (
        <body
            className={`${font.className} min-h-screen`}
            ref={bodyRef}
        >
            <ReduxProvider store={store}>
                <LayoutContent> {children} </LayoutContent>
            </ReduxProvider>
        </body>
    )
}
