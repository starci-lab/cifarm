import type { Metadata } from "next"
import React, { PropsWithChildren, FC } from "react"
import "./globals.css"
import { WrappedLayout } from "./WrappedLayout" 

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
            <WrappedLayout>{children}</WrappedLayout>
        </html>
    )
}
export default Layout