"use client"

import React, { PropsWithChildren, Suspense, useMemo, useRef } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { store, useAppSelector } from "@/redux"
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
import { SubScene, LoadingScene, SidebarProvider, SubSceneType } from "@/components"
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
import { IconContext } from "@phosphor-icons/react"
import { ThemeProvider } from "@/components/styled/ThemeProvider"
import { pathConstants } from "@/constants"
import { usePathname } from "next/navigation"

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
    const loaded = useAppSelector(state => state.sessionReducer.loaded)

    // neutral pages are the ones that don't require authentication
    const neutralPages = [pathConstants.default]
    // unauthenticated pages are the ones that will redirect if not authenticated
    const unauthenticatedPages = [
        pathConstants.signIn
    ]

    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const path = usePathname()

    return (
        <Suspense>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <IconContext.Provider value={{ size: 24, weight: "bold", className: "min-w-6 min-h-6 stroke-3" }}>
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
                                                                    {
                                                                        !loaded ? (
                                                                            <LoadingScene />
                                                                        ) : (
                                                                            (() => {
                                                                                if (neutralPages.includes(path)) {
                                                                                    return <>{children}</>
                                                                                }

                                                                                if (unauthenticatedPages.includes(path)) {
                                                                                    return authenticated ? (
                                                                                        <SubScene type={SubSceneType.Authenticated} />
                                                                                    ) : (
                                                                                        <>{children}</>
                                                                                    )
                                                                                }

                                                                                return authenticated ? <>{children}</> : <SubScene type={SubSceneType.Unauthenticated} />
                                                                            })()
                                                                        )
                                                                    }
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
                </IconContext.Provider>
            </ThemeProvider>
        </Suspense>
    )
}

const font = Baloo_2({ subsets: ["latin"], weight: ["400", "700"] })

export const WrappedLayout = ({ children }: PropsWithChildren) => {
    const bodyRef = useRef<HTMLBodyElement>(null)
    return (
        <body className={`${font.className} min-h-screen w-screen overflow-x-hidden`} ref={bodyRef}>
            <ReduxProvider store={store}>
                <LayoutContent> {children} </LayoutContent>
            </ReduxProvider>
        </body>
    )
}
