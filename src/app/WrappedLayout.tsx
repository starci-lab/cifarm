"use client"

import React, { PropsWithChildren, Suspense } from "react"
import { HeroUIProvider, useDisclosure } from "@heroui/react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SingletonHookProvider } from "@/modules/singleton-hook"
import { useCreatePinForm, UseEffects, useEnterPinForm, useNativeCoinGeckoSWR } from "@/hooks"
import { useAppSelector } from "@/redux"
import { LoadingScreen } from "@/components"
import { Modals } from "./Modals"

export const LayoutContent = ({ children }: PropsWithChildren) => {
    const loaded = useAppSelector((state) => state.sessionReducer.loaded)
    return (
        <Suspense>
            <NextThemesProvider attribute="class" enableSystem>
                <SingletonHookProvider hooks={{
                    CREATE_PIN_FORM: useCreatePinForm(),
                    ENTER_PIN_FORM: useEnterPinForm(),
                    NATIVE_COINGEKCO_SWR: useNativeCoinGeckoSWR(),
                    PRIVATE_KEY_DISCLOSURE: useDisclosure(),
                    MNEMONIC_DISCLOSURE: useDisclosure(),
                    WARNING_DISCLOSURE: useDisclosure()
                }}
                >
                    {
                        loaded ? children : <LoadingScreen/>
                    }
                    <UseEffects/>
                    <Modals/>              
                </SingletonHookProvider>
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