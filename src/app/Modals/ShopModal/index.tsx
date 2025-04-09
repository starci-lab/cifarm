import { valuesWithKey } from "@/modules/common"
import { setShopTab, useAppDispatch, useAppSelector } from "@/redux"
import React, { useMemo, useState } from "react"
import {
    FilterBar,
    Spacer,
    ExtendedButton,
    ModalHeader,
    ScrollableTabs,
    GridTable,
} from "@/components"
import { GRAPHQL_QUERY_STATIC_SWR, SHOP_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { shopTabMap } from "./config"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { ShopCard } from "./ShopCard"
import { cropAssetMap, getAssetUrl } from "@/game"

export enum ShopTab {
  Seeds = "Seeds",
  Flowers = "Flowers",
  Animals = "Animals",
  Buildings = "Buildings",
  Fruits = "Fruits",
  Tiles = "Tiles",
  Supplies = "Supplies",
  Tools = "Tools",
  Pets = "Pets",
  Decorations = "Decorations",
}

export const ShopModal = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(SHOP_DISCLOSURE)
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const tokensArray = valuesWithKey(tokens).filter((token) => token.enabled)
    const [searchString, setSearchString] = useState("")

    const shopTab = useAppSelector((state) => state.tabReducer.shopTab)
    const dispatch = useAppDispatch()

    const filteredTokensArray = useMemo(() => {
        return tokensArray.filter((token) =>
            token.name.toLowerCase().includes(searchString.toLowerCase())
        )
    }, [searchString])

    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )

    const renderGridTable = () => {
        if (!swr.data) return null
        switch (shopTab) {
        case ShopTab.Seeds: {
            const crops = swr.data.data.crops
            return (
                <GridTable
                    items={crops}
                    contentCallback={(crop) => (
                        <ShopCard
                            onClick={() => {}}
                            imageUrl={getAssetUrl(
                                cropAssetMap[crop.displayId].shop?.textureConfig.assetUrl ??
                    ""
                            )}
                            price={crop.price}
                            ownership={4}
                            limit={2}
                            locked={false}
                            unlockedLevel={2}
                            disabled={false}
                        />
                    )}
                />
            )
        }
        default:
            return null
        }
    }
    return (
        <Dialog open={true} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader
                            title="Shop"
                            description="Purchase items from the shop."
                        />
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <ScrollableTabs
                        value={shopTab}
                        onValueChange={(value) => dispatch(setShopTab(value as ShopTab))}
                        items={Object.values(shopTabMap)}
                    />
                    <Spacer y={4} />
                    <FilterBar
                        handleSearchResult={({ searchString }) => {
                            setSearchString(searchString)
                        }}
                    />
                    <Spacer y={4} />
                    {renderGridTable()}
                </div>
                <DialogFooter>
                    <ExtendedButton
                        variant="ghost"
                        onClick={() => toggle(false)}
                        className="text-muted-foreground"
                    >
            Cancel
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
