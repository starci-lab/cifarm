import {
    Sheet,
    SheetContent,
} from "@/components"
import React, { FC, useMemo } from "react"
import {
    useIsMobile,
} from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import {
    SHEET_GAME_ITEM_DISCLOSURE,
} from "@/app/(core)/constantsd"
import { useSelector } from "react-redux"
import { RootState } from "@/redux"
import { assetProductMap, assetShopMap, assetSuppliesMap, assetTerrainsMap, assetTileMap, assetToolsMap } from "@/modules/assets"
import Image from "next/image"

export const GameItemSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(SHEET_GAME_ITEM_DISCLOSURE)
    const isMobile = useIsMobile()
    const gameItemKey = useSelector((state: RootState) => state.sheetReducer.gameItemSheet.gameItemKey)

    const itemData = useMemo(() => {
        if (!gameItemKey) return null

        // Search through all asset maps to find the item
        const allMaps = [
            assetProductMap,
            assetShopMap.animals,
            assetShopMap.buildings,
            assetShopMap.pets,
            assetSuppliesMap,
            assetTerrainsMap,
            assetTileMap,
            assetToolsMap
        ]

        for (const map of allMaps) {
            const item = Object.values(map).find(item => item.base.assetKey === gameItemKey)
            if (item) {
                return {
                    name: item.name,
                    description: item.description,
                    assetUrl: item.base.assetUrl
                }
            }
        }

        return null
    }, [gameItemKey])

    const renderContent = () => {
        if (!itemData) return null

        return (
            <div className="flex flex-col gap-6 p-4">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Image
                        src={itemData.assetUrl}
                        alt={itemData.name}
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{itemData.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{itemData.description}</p>
                </div>
            </div>
        )
    }

    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent
                side={isMobile ? "bottom" : "right"}
                className="flex flex-col justify-between w-full sm:w-[400px]"
            >
                {renderContent()}
            </SheetContent>
        </Sheet>
    )
}
