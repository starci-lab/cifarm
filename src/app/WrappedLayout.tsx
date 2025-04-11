"use client"

import React, { PropsWithChildren, Suspense, useLayoutEffect, useRef } from "react"
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
import { Rowdies } from "next/font/google"

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
                                defaultTheme="light"
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


const font = Rowdies({ subsets: ["latin"], weight: ["300", "400", "700"] })

export const WrappedLayout = ({ children }: PropsWithChildren) => {
    const bodyRef = useRef<HTMLBodyElement>(null)
    useLayoutEffect(() => {
        // Function to calculate scale based on the screen width
        const scaleContent = () => {
            const screenWidth = window.outerWidth
            const contentWidth = bodyRef.current?.clientWidth ?? 500
            // Calculate scale ratio based on screen width vs content width
            // Update the viewport meta tag dynamically based on the scale
            const metaViewport = document.querySelector("meta[name='viewport']") as HTMLMetaElement    
            const scale = screenWidth / contentWidth
            // Only update the scale if the content width is larger than the screen width
            if (scale < 1) {
                // Set the viewport scale to the calculated scale ratio
                if (metaViewport) {
                    metaViewport.content = `width=device-width, initial-scale=${scale}, maximum-scale=1, user-scalable=no`
                }
            } else {
                // Reset scale to 1 if content is smaller than screen width
                if (metaViewport) {
                    metaViewport.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                }
            }   
        }

        // Initial scaling
        scaleContent()

        // Recalculate the scale on window resize
        window.addEventListener("resize", scaleContent)

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("resize", scaleContent)
        }
    }, [])

    return (
        <body className={`${font.className} min-h-screen min-w-[500px]`} ref={bodyRef}>
            <ReduxProvider store={store}>
                <LayoutContent> {children} </LayoutContent>
            </ReduxProvider>
        </body>
    )
}
