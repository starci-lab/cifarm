"use client"

import React, { PropsWithChildren, Suspense } from "react"
import { HeroUIProvider, ToastProvider } from "@heroui/react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import {
    UseEffects,
} from "@/hooks"
import { useAppSelector } from "@/redux"
import { LoadingScreen } from "@/components"
import { SWRConfig } from "swr"
import dynamic from "next/dynamic"
import { SingletonHook2Provider, SingletonHookProvider } from "./SingletonHookProviders"

const Modals = dynamic(() => import("./Modals"), {
    ssr: false,
})

export const LayoutContent = ({ children }: PropsWithChildren) => {
    const loaded = useAppSelector((state) => state.sessionReducer.loaded)
    return (
        <Suspense>
            <NextThemesProvider attribute="class" enableSystem>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <SingletonHookProvider>
                        <SingletonHook2Provider>
                            {loaded ? children : <LoadingScreen />}
                            <UseEffects />
                            <Modals />
                            <ToastProvider placement="bottom-center"/>  
                        </SingletonHook2Provider>
                    </SingletonHookProvider>
                </SWRConfig>
            </NextThemesProvider>
        </Suspense>
    )
}

export const WrappedLayout = ({ children }: PropsWithChildren) => {
    return (
        <HeroUIProvider>
            <ReduxProvider store={store}>
                <LayoutContent> {children} </LayoutContent>
            </ReduxProvider>
        </HeroUIProvider>
    )
}
