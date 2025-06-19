"use client"

import React, { PropsWithChildren, Suspense, useRef } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { store, useAppSelector } from "@/redux"
import { SWRConfig } from "swr"
import dynamic from "next/dynamic"
import { SingletonHook2Provider, SingletonHookProvider } from "@/singleton"
import { Toaster, TooltipProvider } from "@/components"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Baloo_2 } from "next/font/google"
import {
    FallbackScene,
    LoadingScene,
    SidebarProvider,
    FallbackSceneType,
} from "@/components"
import { getFullnodeUrl } from "@mysten/sui/client"
import {
    createNetworkConfig,
    SuiClientProvider,
    WalletProvider as WalletSuiProvider,
} from "@mysten/dapp-kit"
import { Network } from "@/modules/blockchain"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { IconContext } from "@phosphor-icons/react"
import { ThemeProvider } from "@/components"
import { usePathname } from "next/navigation"
import { neutralPages, unauthenticatedPages } from "@/constants"
import { SolanaWalletAdapterProvider } from "@/hooks"
import { MobileCallbacks } from "@/mobile"

const Modals = dynamic(() => import("@/modals"), {
    ssr: false,
})

const UseEffects = dynamic(() => import("@/effects"), {
    ssr: false,
})

const Sheets = dynamic(() => import("@/sheets"), {
    ssr: false,
})

export const LayoutContent = ({ children }: PropsWithChildren) => {
    // Create a custom RPC endpoint
    const { networkConfig } = createNetworkConfig({
        [Network.Testnet]: { url: getFullnodeUrl("testnet") },
        [Network.Mainnet]: { url: getFullnodeUrl("mainnet") },
    })
    const queryClient = new QueryClient()
    const loaded = useAppSelector((state) => state.sessionReducer.loaded)

    const authenticated = useAppSelector(
        (state) => state.sessionReducer.authenticated
    )
    const path = usePathname()
    return (
        <Suspense>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <IconContext.Provider
                    value={{
                        size: 24,
                        weight: "bold",
                        className: "min-w-6 min-h-6 stroke-3",
                    }}
                >
                    <QueryClientProvider client={queryClient}>
                        <SuiClientProvider
                            networks={networkConfig}
                            defaultNetwork={Network.Testnet}
                        >
                            <WalletSuiProvider>
                                <SolanaWalletAdapterProvider>
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
                                                            <MobileCallbacks>
                                                                {!loaded ? (
                                                                    <LoadingScene />
                                                                ) : (
                                                                    (() => {
                                                                        if (neutralPages.includes(path)) {
                                                                            return <>{children}</>
                                                                        }

                                                                        if (unauthenticatedPages.includes(path)) {
                                                                            return authenticated ? (
                                                                                <FallbackScene
                                                                                    type={FallbackSceneType.Authenticated}
                                                                                />
                                                                            ) : (
                                                                            
                                                                                <>{children}</>
                                                                            
                                                                            )
                                                                        }

                                                                        return authenticated ? (
                                                                            <>{children}</>
                                                                        ) : (
                                                                            <FallbackScene
                                                                                type={FallbackSceneType.Unauthenticated}
                                                                            />
                                                                        )
                                                                    })()
                                                                )}
                                                            </MobileCallbacks>
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
                                </SolanaWalletAdapterProvider>
                            </WalletSuiProvider>
                        </SuiClientProvider>
                    </QueryClientProvider>
                </IconContext.Provider>
            </ThemeProvider>
        </Suspense>
    )
}

const font = Baloo_2({ subsets: ["latin"], weight: ["600"] })

export const WrappedLayout = ({ children }: PropsWithChildren) => {
    const bodyRef = useRef<HTMLBodyElement>(null)
    return (
        <body
            className={`${font.className} min-h-screen w-screen overflow-x-hidden`}
            ref={bodyRef}
            onContextMenu={(e) => e.preventDefault()}
        >
            <ReduxProvider store={store}>
                <LayoutContent> {children} </LayoutContent>
            </ReduxProvider>
        </body>
    )
}
