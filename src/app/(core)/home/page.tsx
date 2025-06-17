"use client"
import { AppTabs, BlurEffect, ExtendedButton, Header, Image, Spacer } from "@/components"
import { HomeTab, setHomeTab, useAppDispatch, useAppSelector } from "@/redux"
import { FC } from "react"
import { OverviewTab } from "./OverviewTab"
import React from "react"
import { ItemsTab } from "./ItemsTab"
import { useScroll } from "@/hooks/useScroll"
import { Plant } from "@phosphor-icons/react"
import { useIsMobile, useRouterWithSearchParams } from "@/hooks"
import { TokenomicsTab } from "./TokenomicsTab"
import { cn } from "@/utils"

const Page: FC = () => {
    const homeTab = useAppSelector((state) => state.tabReducer.homeTab)
    const show = useScroll(150)
    const dispatch = useAppDispatch()
    const router = useRouterWithSearchParams()
    const isMobile = useIsMobile()

    const renderContent = () => {
        switch (homeTab) {
        case HomeTab.Overview:
            return <OverviewTab />
        case HomeTab.Items:
            return <ItemsTab />
        case HomeTab.Tokenomics:
            return <TokenomicsTab />
        }
    }
    return (
        <div className="relative">
            <BlurEffect size="lg" position="top" />
            <Header title="Home" />
            {/* fixed motion scroll down */}
            <div className={`z-[60] hidden md:block fixed top-0 left-64 right-0 transition-all duration-500 transform mx-auto ${show ? "translate-y-0" : "-translate-y-full"} ${show ? "bg-background/60 backdrop-blur-xl" : ""}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between flex-col items-start max-w-[1200px]">
                    <div className="flex gap-4 items-center justify-between w-full">   
                        <div className="flex gap-4 items-center flex-1" >
                            <Image src="https://cifarm.sgp1.cdn.digitaloceanspaces.com/logo.png" alt="logo" className="w-12 h-12 md:w-20 md:h-20 rounded-lg  hover:opacity-70"
                                onClick={() => router.push("/")}
                            />
                            <div>
                                <div className="text-2xl md:text-4xl font-bold text-foreground">CiFarm</div>
                                <div className="text-sm md:text-base text-muted-foreground">A Farm-Thief-Earn social MMO game</div>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            <ExtendedButton color="primary" 
                                onPress={() => router.push("/play")}
                                onClick={() => {
                                    router.push("/play")
                                }}
                            >
                                <Plant />
                                Play
                            </ExtendedButton>
                        </div>
                    </div>
                </div>
            </div>

            <Spacer y={4} />
            <div className="flex gap-4 items-center">   
                <Image src="https://cifarm.sgp1.cdn.digitaloceanspaces.com/logo.png" alt="logo" className="w-20 h-20 rounded-lg" />
                <div>
                    <div className="text-4xl font-bold text-foreground">CiFarm</div>
                    <div className="text-muted-foreground">A Farm-Thief-Earn social MMO game</div>
                </div>
            </div>

            <Spacer y={6}/>
            <AppTabs    
                tabs={[
                    {
                        label: "Overview",
                        value: HomeTab.Overview,
                    },
                    {
                        label: "Items",
                        value: HomeTab.Items,
                    },
                    {
                        label: "Tokenomics",
                        value: HomeTab.Tokenomics,
                    },
                ]}
                classNames={{
                    list: cn({
                        "w-full": isMobile,
                    }),
                }}
                color="secondary"
                selectedTab={homeTab}
                onSelectTab={(tab) => {
                    dispatch(setHomeTab(tab as HomeTab))
                }}
            />
            <Spacer y={4} />
            {renderContent()}
        </div>
    )
}

export default Page
