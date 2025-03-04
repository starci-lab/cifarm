"use client"

import React, { PropsWithChildren, Suspense } from "react"
import { HeroUIProvider, useDisclosure } from "@heroui/react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SingletonHookProvider } from "@/modules/singleton-hook"
import {
    useApiAuthenticationSwrMutation,
    useApiBuySeedsSwrMutation,
    useApiBuyTileSwrMutation,
    useApiConstructBuildingSwrMutation,
    useApiHarvestCropSwrMutation,
    useApiPlantSeedSwrMutation,
    useApiUpdateTutorialSwrMutation,
    useApiUseHerbicideSwrMutation,
    useApiUsePesticideSwrMutation,
    useApiWaterSwrMutation,
    UseEffects,
    useGameplayIo,
    useNativeCoinGeckoSWR,
    useApiMoveInventorySwrMutation,
    useApiDeliverProductSwrMutation,
    useApiRetainProductSwrMutation,
    useQueryUserSwrMutation,
    useQueryStaticSwrMutation,
    useQueryInventoriesSwrMutation,
    useQueryNeighborsSwrMutation,
    useApiFollowSwrMutation,
    useApiUnfollowSwrMutation,
    useQueryFolloweesSwrMutation,
    useApiReturnSwrMutation,
    useApiVisitSwrMutation,
    useApiHelpUseHerbicideSwrMutation,
    useApiHelpUsePesticideSwrMutation,
    useApiHelpWaterSwrMutation,
    useApiThiefCropSwrMutation,
    useApiClaimHoneycombDailyRewardSwrMutation,
    useHoneycombSendTransactionSwrMutation,
    useApiBuyAnimalSwrMutation,
    useApiClaimDailyRewardSwrMutation,
    useApiFeedAnimalSwrMutation,
    useApiBuySuppliesSwrMutation,
    useApiCureAnimalSwrMutation,
    useApiUpdateReferralSwrMutation,
    useApiUseFertilizerSwrMutation,
    useApiUpdateFollowXSwrMutation,
    useQueryFolloweesSwr,
    useQueryNeighborsSwr,
    useQueryUserSwr
} from "@/hooks"
import { useAppSelector } from "@/redux"
import { LoadingScreen } from "@/components"
import { SWRConfig } from "swr"
import { Toast } from "@/modules/toast"
import dynamic from "next/dynamic"

const Modals = dynamic(() => import("./Modals"), {
    ssr: false,
})

export const LayoutContent = ({ children }: PropsWithChildren) => {
    
    
    const loaded = useAppSelector((state) => state.sessionReducer.loaded)
    return (
        <Suspense>
            <NextThemesProvider attribute="class" enableSystem>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <SingletonHookProvider
                        hooks={{
                            NATIVE_COINGEKCO_SWR: useNativeCoinGeckoSWR(),
                            PRIVATE_KEY_DISCLOSURE: useDisclosure(),
                            MNEMONIC_DISCLOSURE: useDisclosure(),
                            WARNING_DISCLOSURE: useDisclosure(),
                            SIGN_TRANSACTION_DISCLOSURE: useDisclosure(),
                            REFERRAL_LINK_DISCLOSURE: useDisclosure(),
                            NEIGHBORS_DISCLOSURE: useDisclosure(),
                            //swr mutations
                            API_AUTHENTICATION_SWR_MUTATION: useApiAuthenticationSwrMutation(),
                            API_UPDATE_TUTORIAL_SWR_MUTATION: useApiUpdateTutorialSwrMutation(),
                            API_BUY_SEEDS_SWR_MUTATION: useApiBuySeedsSwrMutation(),
                            API_BUY_SUPPLIES_SWR_MUTATION: useApiBuySuppliesSwrMutation(),
                            API_PLANT_SEED_SWR_MUTATION: useApiPlantSeedSwrMutation(),
                            API_CLAIM_DAILY_REWARD_SWR_MUTATION: useApiClaimDailyRewardSwrMutation(),
                            API_WATER_SWR_MUTATION: useApiWaterSwrMutation(),
                            API_CONSTRUCT_BUILDING_SWR_MUTATION: useApiConstructBuildingSwrMutation(),
                            API_BUY_TILE_SWR_MUTATION: useApiBuyTileSwrMutation(),
                            API_BUY_ANIMAL_SWR_MUTATION: useApiBuyAnimalSwrMutation(),
                            API_FEED_ANIMAL_SWR_MUTATION: useApiFeedAnimalSwrMutation(),
                            API_CURE_ANIMAL_SWR_MUTATION: useApiCureAnimalSwrMutation(),
                            API_USE_HERBICIDE_SWR_MUTATION: useApiUseHerbicideSwrMutation(),
                            API_USE_PESTICIDE_SWR_MUTATION: useApiUsePesticideSwrMutation(),
                            API_HARVEST_CROP_SWR_MUTATION: useApiHarvestCropSwrMutation(),
                            API_MOVE_INVENTORY_SWR_MUTATION: useApiMoveInventorySwrMutation(),
                            API_DELIVER_PRODUCT_SWR_MUTATION: useApiDeliverProductSwrMutation(),
                            API_RETAIN_PRODUCT_SWR_MUTATION: useApiRetainProductSwrMutation(),
                            API_FOLLOW_SWR_MUTATION: useApiFollowSwrMutation(),
                            API_UNFOLLOW_SWR_MUTATION: useApiUnfollowSwrMutation(),
                            API_VISIT_SWR_MUTATION: useApiVisitSwrMutation(),
                            API_RETURN_SWR_MUTATION: useApiReturnSwrMutation(),
                            API_HELP_USE_HERBICIDE_SWR_MUTATION: useApiHelpUseHerbicideSwrMutation(),
                            API_HELP_USE_PESTICIDE_SWR_MUTATION: useApiHelpUsePesticideSwrMutation(),
                            API_USE_FERTILIZER_SWR_MUTATION: useApiUseFertilizerSwrMutation(),
                            API_HELP_WATER_SWR_MUTATION: useApiHelpWaterSwrMutation(),
                            API_THIEF_CROP_SWR_MUTATION: useApiThiefCropSwrMutation(),
                            API_CLAIM_HONEYCOMB_DAILY_REWARD_SWR_MUTATION: useApiClaimHoneycombDailyRewardSwrMutation(),
                            API_UPDATE_REFERRAL_SWR_MUTATION: useApiUpdateReferralSwrMutation(),
                            API_UPDATE_FOLLOW_X_SWR_MUTATION: useApiUpdateFollowXSwrMutation(),
                            // honeycomb
                            HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION: useHoneycombSendTransactionSwrMutation(),
                            
                            // queries
                            QUERY_USER_SWR_MUTATION: useQueryUserSwrMutation(),
                            QUERY_STATIC_SWR_MUTATION: useQueryStaticSwrMutation(),
                            QUERY_INVENTORIES_SWR_MUTATION: useQueryInventoriesSwrMutation(),
                            QUERY_NEIGHBORS_SWR_MUTATION: useQueryNeighborsSwrMutation(),
                            QUERY_FOLLOWEES_SWR_MUTATION: useQueryFolloweesSwrMutation(),
                            QUERY_FOLLOWEES_SWR: useQueryFolloweesSwr(),
                            QUERY_NEIGHBORS_SWR: useQueryNeighborsSwr(),
                            QUERY_USER_SWR: useQueryUserSwr(),
                            //io
                            GAMEPLAY_IO: useGameplayIo(),
                        }}
                    >
                        {loaded ? children : <LoadingScreen />}
                        <UseEffects />
                        <Modals />
                        <Toast />
                    </SingletonHookProvider>
                </SWRConfig>
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
