"use client"

import React, { PropsWithChildren, Suspense } from "react"
import { HeroUIProvider } from "@heroui/react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SingletonHookProvider } from "@/modules/singleton-hook"
import { useCreateForm, UseEffects } from "@/hooks"

export const LayoutContent = ({ children }: PropsWithChildren) => {
    return (
        <Suspense>
            <NextThemesProvider attribute="class" enableSystem>
                <SingletonHookProvider hooks={{
                    CREATE_FORM: useCreateForm(),
                }}
                >
                    {children}
                    <UseEffects/>
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