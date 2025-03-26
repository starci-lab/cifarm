"use client"

import React, { PropsWithChildren, Suspense } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import {
    UseEffects,
} from "@/hooks"
import { useAppSelector } from "@/redux"
import { LoadingScreen } from "@/components"
import { SWRConfig } from "swr"
import dynamic from "next/dynamic"
import { SingletonHook2Provider, SingletonHookProvider } from "./SingletonHookProviders"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider as NextThemesProvider } from "next-themes"

const Modals = dynamic(() => import("./Modals"), {
    ssr: false,
})

export const LayoutContent = ({ children }: PropsWithChildren) => {
    const loaded = useAppSelector((state) => state.sessionReducer.loaded)
    return (
        <Suspense>
            <TooltipProvider>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <SingletonHookProvider>
                        <SingletonHook2Provider>
                            <NextThemesProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                                disableTransitionOnChange
                            >
                                {loaded ? children : <LoadingScreen />}
                                <UseEffects />
                                <Modals /> 
                                <Toaster />
                            </NextThemesProvider>
                        </SingletonHook2Provider>
                    </SingletonHookProvider>
                </SWRConfig>
            </TooltipProvider>
        </Suspense>
    )
}

export const WrappedLayout = ({ children }: PropsWithChildren) => {
    return (
        <ReduxProvider store={store}>
            <LayoutContent> {children} </LayoutContent>
        </ReduxProvider>
    )
}
