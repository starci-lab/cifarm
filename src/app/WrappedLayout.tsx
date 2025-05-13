"use client"

import React, { PropsWithChildren, Suspense, useMemo, useRef } from "react"
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
    WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import { getFullnodeUrl } from "@mysten/sui/client"
import { createNetworkConfig, SuiClientProvider, WalletProvider as WalletSuiProvider } from "@mysten/dapp-kit"
import { Network } from "@/modules/blockchain"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GoogleOAuthProvider } from "@react-oauth/google"

const Modals = dynamic(() => import("./Modals"), {
    ssr: false,
})

const UseEffects = dynamic(() => import("@/hooks/use-effects"), {
    ssr: false,
})

const Sheets = dynamic(() => import("./Sheets"), {
    ssr: false,
})

export const LayoutContent = ({ children }: PropsWithChildren) => {
    const network = envConfig().network
    const solanaNetwork = useMemo(
        () =>
            network === "testnet"
                ? WalletAdapterNetwork.Devnet
                : WalletAdapterNetwork.Mainnet,
        [network]
    )
    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(solanaNetwork), [solanaNetwork])
    // Create a custom RPC endpoint
    const { networkConfig } = createNetworkConfig({
        [Network.Testnet]: { url: getFullnodeUrl("testnet") },
        [Network.Mainnet]: { url: getFullnodeUrl("mainnet") },
    })

    const queryClient = new QueryClient()
    return (
        <Suspense>
            <GoogleOAuthProvider clientId={envConfig().authentication.google.clientId}> 
                <QueryClientProvider client={queryClient}>
                    <SuiClientProvider networks={networkConfig} defaultNetwork={Network.Testnet}>
                        <WalletSuiProvider>
                            <ConnectionProvider endpoint={endpoint}>
                                <WalletProvider wallets={[]}>
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
                                                                <Sheets />
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
                        </WalletSuiProvider>
                    </SuiClientProvider>
                </QueryClientProvider>
            </GoogleOAuthProvider>
        </Suspense>
    )
}

const font = Baloo_2({ subsets: ["latin"], weight: ["400", "700"] })

export const WrappedLayout = ({ children }: PropsWithChildren) => {
    const bodyRef = useRef<HTMLBodyElement>(null)
    return (
        <body className={`${font.className} min-h-screen`} ref={bodyRef}>
            <ReduxProvider store={store}>
                <LayoutContent> {children} </LayoutContent>
            </ReduxProvider>
        </body>
    )
}
