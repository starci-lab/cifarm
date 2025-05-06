"use client"

import React, {
    PropsWithChildren,
    Suspense,
    useLayoutEffect,
    useRef,
} from "react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import { useAppSelector } from "@/redux"
import { LoadingScreen } from "@/components"
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

const Modals = dynamic(() => import("./Modals"), {
    ssr: false,
})

const UseEffects = dynamic(() => import("@/hooks/use-effects"), {
    ssr: false,
})

export const LayoutContent = ({ children }: PropsWithChildren) => {
    return (
        <Suspense>
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
