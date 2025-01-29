"use client"

import React, { FC } from "react"
import { Button, Navbar as HeroUiNavbar, Link, NavbarContent } from "@heroui/react"
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline"
import { CiBitcoin, CiGift } from "react-icons/ci"
import { RiTwitterXLine } from "react-icons/ri"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"

export const BottomNavbar: FC = () => {
    const router = useRouterWithSearchParams()
    return (
        <HeroUiNavbar
            isBlurred={false}
            classNames={{
                base: "m-auto fixed top-auto bottom-0 left-0 border-t h-16",
                wrapper: "px-4 max-w-full",
            }}
        >
            <NavbarContent justify="start">
                <Link as="button" onPress={() => router.push(pathConstants.assets)} className="flex-1" color="foreground">
                    <div className="grid place-items-center">
                        <CiBitcoin className="w-6 h-6" />
                        <div className="text-[10px] h-4 flex items-center">Assets</div>
                    </div>
                </Link>
                <Link as="button" className="flex-1 flex justify-end" color="foreground">
                    <div className="grid place-items-center">
                        <CiGift className="w-6 h-6" />
                        <div className="text-[10px] h-4 flex items-center">Airdrop</div>
                    </div>
                </Link>
                
            </NavbarContent>
            <NavbarContent justify="center">
                <Button size="lg" color="primary" className="light text-background" onPress={() => router.push(pathConstants.play) }>
          Play
                </Button>
            </NavbarContent>
            <NavbarContent justify="end">
                <Link as="button" className="flex-1" color="foreground">
                    <div className="grid place-items-center">
                        <BuildingStorefrontIcon className="w-6 h-6" strokeWidth={1} />
                        <div className="text-[10px] h-4 flex items-center">Marketplace</div>
                    </div>
                </Link>
                <Link as="button" className="flex-1 flex justify-end" color="foreground">
                    <div className="grid place-items-center">
                        <RiTwitterXLine className="w-6 h-6"/>
                        <div className="text-[10px] h-4 flex items-center">Social</div>
                    </div>
                </Link>
            </NavbarContent>
        </HeroUiNavbar>
    )
}
