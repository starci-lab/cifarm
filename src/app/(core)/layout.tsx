import type { Metadata } from "next"
import React, { PropsWithChildren, FC } from "react"
import "../globals.css"
import { WrappedLayout } from "./WrappedLayout" 

export const metadata: Metadata = {
    title: "CiFarm",
    description: "CiFarm",
    icons: {
        icon: "/favicon.ico",
    },
    viewport: {
        width: "device-width",
        initialScale: 1.0,
        maximumScale: 1.0,
        userScalable: false
    }
}
const Layout: FC = ({
    children,
}: PropsWithChildren) => {
    return (
        <html lang="en" suppressHydrationWarning>   
            <script
                src="https://accounts.google.com/gsi/client"
                async
                defer
            ></script>
            
            <WrappedLayout>{children}</WrappedLayout>
        </html>
    )
}
export default Layout