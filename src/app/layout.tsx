import type { Metadata } from "next"
import React, { PropsWithChildren, FC } from "react"
import "./globals.css"
import { WrappedLayout } from "./WrappedLayout"
import { Open_Sans } from "next/font/google"

const font = Open_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "CiFarm",
    description: "CiFarm",
    icons: {
        icon: "logo.png",
    }
}

const Layout: FC = ({
    children,
}: PropsWithChildren) => {
    return (
        <html lang="en">
            <body className={`${font.className} min-h-screen`}>
                <WrappedLayout>{children}</WrappedLayout>
            </body>
        </html>
    )
}
export default Layout