import {
    useNativeCoinGeckoSWR,
    useApiAuthenticationSwrMutation,
    useApiUpdateTutorialSwrMutation,
    useApiBuySeedsSwrMutation,
    useApiBuySuppliesSwrMutation,
    useApiPlantSeedSwrMutation,
    useApiClaimDailyRewardSwrMutation,
    useApiWaterCropSwrMutation,
    useApiBuyBuildingSwrMutation,
    useApiBuyTileSwrMutation,
    useApiBuyAnimalSwrMutation,
    useApiFeedAnimalSwrMutation,
    useApiCureAnimalSwrMutation,
    useApiUseHerbicideSwrMutation,
    useApiUsePesticideSwrMutation,
    useApiHarvestCropSwrMutation,
    useApiMoveInventorySwrMutation,
    useApiDeliverProductSwrMutation,
    useApiRetainProductSwrMutation,
    useApiFollowSwrMutation,
    useApiUnfollowSwrMutation,
    useApiVisitSwrMutation,
    useApiUpgradeBuildingSwrMutation,
    useApiReturnSwrMutation,
    useApiHelpUseHerbicideSwrMutation,
    useApiHelpUsePesticideSwrMutation,
    useApiUseFertilizerSwrMutation,
    useApiHelpWaterSwrMutation,
    useApiThiefCropSwrMutation,
    useApiClaimHoneycombDailyRewardSwrMutation,
    useApiMintOffchainTokensSwrMutation,
    useApiUpdateReferralSwrMutation,
    useApiUpdateFollowXSwrMutation,
    useHoneycombSendTransactionSwrMutation,
    useGraphQLQueryUserSwrMutation,
    useGraphQLQueryUserSwr,
    useGameplayIo,
    useMintOffchainTokensRhf,
    useApiDeliverMoreProductSwrMutation,
    useApiMoveSwrMutation,
    useApiBuyToolSwrMutation,
    useApiSellSwrMutation,
    useApiBuyFruitSwrMutation,
    useApiHarvestAnimalSwrMutation,
    useApiThiefAnimalProductSwrMutation,
    useApiHelpCureAnimalSwrMutation,
    useTransferTokensRhf,
    useTransferTokenFormik,
    useTransferTokenSwrMutation,
    useApiUseFruitFertilizerSwrMutation,
    useGraphQLMutationAuthenticationSwrMutation,
    useGraphQLQueryNeighborsSwr,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryFolloweesSwrMutation,
    useGraphQLQueryNeighborsSwrMutation,
    useGraphQLQueryInventoriesSwrMutation,
    useGraphQLQueryStaticSwrMutation,
    useApiHelpUseFruitFertilizerSwrMutation,
    useApiHelpUseBugNetSwrMutation,
    useApiUseBugNetSwrMutation,
    useApiThiefFruitSwrMutation,
    useApiHarvestFruitSwrMutation,
    useApiHelpFeedAnimalSwrMutation,
    useGraphQLQueryStaticSwr,
} from "@/hooks"
import {
    SingletonHookProvider as BaseSingletonHookProvider,
    SingletonHook2Provider as BaseSingletonHook2Provider,
} from "@/modules/singleton-hook"
import { useDisclosure } from "@heroui/react"
import React, { PropsWithChildren } from "react"

export const SingletonHookProvider = ({ children }: PropsWithChildren) => (
    <BaseSingletonHookProvider
        hooks={{
            // disclosures
            NATIVE_COINGEKCO_SWR: useNativeCoinGeckoSWR(),
            PRIVATE_KEY_DISCLOSURE: useDisclosure(),
            MNEMONIC_DISCLOSURE: useDisclosure(),
            WARNING_DISCLOSURE: useDisclosure(),
            SIGN_TRANSACTION_DISCLOSURE: useDisclosure(),
            INVITE_USER_DISCLOSURE: useDisclosure(),
            NEIGHBORS_DISCLOSURE: useDisclosure(),
            QUESTS_DISCLOSURE: useDisclosure(),
            PROFILE_DISCLOSURE: useDisclosure(),
            TOKENS_OFFCHAIN_DISCLOSURE: useDisclosure(),
            MINT_AMOUNT_DISCLOSURE: useDisclosure(),
            SELECT_TOKEN_DISCLOSURE: useDisclosure(),
            //swr mutations
            API_AUTHENTICATION_SWR_MUTATION: useApiAuthenticationSwrMutation(),
            API_UPDATE_TUTORIAL_SWR_MUTATION: useApiUpdateTutorialSwrMutation(),
            API_BUY_SEEDS_SWR_MUTATION: useApiBuySeedsSwrMutation(),
            API_BUY_SUPPLIES_SWR_MUTATION: useApiBuySuppliesSwrMutation(),
            API_PLANT_SEED_SWR_MUTATION: useApiPlantSeedSwrMutation(),
            API_CLAIM_DAILY_REWARD_SWR_MUTATION: useApiClaimDailyRewardSwrMutation(),
            API_WATER_CROP_SWR_MUTATION: useApiWaterCropSwrMutation(),
            API_BUY_BUILDING_SWR_MUTATION: useApiBuyBuildingSwrMutation(),
            API_BUY_TILE_SWR_MUTATION: useApiBuyTileSwrMutation(),
            API_BUY_ANIMAL_SWR_MUTATION: useApiBuyAnimalSwrMutation(),
            API_FEED_ANIMAL_SWR_MUTATION: useApiFeedAnimalSwrMutation(),
            API_CURE_ANIMAL_SWR_MUTATION: useApiCureAnimalSwrMutation(),
            API_USE_HERBICIDE_SWR_MUTATION: useApiUseHerbicideSwrMutation(),
            API_HELP_CURE_ANIMAL_SWR_MUTATION: useApiHelpCureAnimalSwrMutation(),
            API_USE_PESTICIDE_SWR_MUTATION: useApiUsePesticideSwrMutation(),
            API_HARVEST_CROP_SWR_MUTATION: useApiHarvestCropSwrMutation(),
            API_MOVE_INVENTORY_SWR_MUTATION: useApiMoveInventorySwrMutation(),
            API_SELL_SWR_MUTATION: useApiSellSwrMutation(),
            API_DELIVER_PRODUCT_SWR_MUTATION: useApiDeliverProductSwrMutation(),
            API_DELIVER_MORE_PRODUCT_SWR_MUTATION:
        useApiDeliverMoreProductSwrMutation(),
            API_MOVE_SWR_MUTATION: useApiMoveSwrMutation(),
            API_RETAIN_PRODUCT_SWR_MUTATION: useApiRetainProductSwrMutation(),
            API_FOLLOW_SWR_MUTATION: useApiFollowSwrMutation(),
            API_UNFOLLOW_SWR_MUTATION: useApiUnfollowSwrMutation(),
            API_VISIT_SWR_MUTATION: useApiVisitSwrMutation(),
            API_UPGRADE_BUILDING_SWR_MUTATION: useApiUpgradeBuildingSwrMutation(),
            API_RETURN_SWR_MUTATION: useApiReturnSwrMutation(),
            API_HARVEST_ANIMAL_SWR_MUTATION: useApiHarvestAnimalSwrMutation(),
            API_HELP_USE_HERBICIDE_SWR_MUTATION: useApiHelpUseHerbicideSwrMutation(),
            API_HELP_USE_PESTICIDE_SWR_MUTATION: useApiHelpUsePesticideSwrMutation(),
            API_USE_FERTILIZER_SWR_MUTATION: useApiUseFertilizerSwrMutation(),
            API_HELP_WATER_SWR_MUTATION: useApiHelpWaterSwrMutation(),
            API_THIEF_CROP_SWR_MUTATION: useApiThiefCropSwrMutation(),
            API_BUY_TOOL_SWR_MUTATION: useApiBuyToolSwrMutation(),
            API_CLAIM_HONEYCOMB_DAILY_REWARD_SWR_MUTATION:
        useApiClaimHoneycombDailyRewardSwrMutation(),
            API_MINT_OFFCHAIN_TOKENS_SWR_MUTATION:
        useApiMintOffchainTokensSwrMutation(),
            API_UPDATE_REFERRAL_SWR_MUTATION: useApiUpdateReferralSwrMutation(),
            API_UPDATE_FOLLOW_X_SWR_MUTATION: useApiUpdateFollowXSwrMutation(),
            API_BUY_FRUIT_SWR_MUTATION: useApiBuyFruitSwrMutation(),
            TRANSFER_TOKEN_SWR_MUTATION: useTransferTokenSwrMutation(),
            API_THIEF_ANIMAL_PRODUCT_SWR_MUTATION: useApiThiefAnimalProductSwrMutation(),
            API_HELP_FEED_ANIMAL_SWR_MUTATION: useApiHelpFeedAnimalSwrMutation(),
            API_HARVEST_FRUIT_SWR_MUTATION: useApiHarvestFruitSwrMutation(),
            API_THIEF_FRUIT_SWR_MUTATION: useApiThiefFruitSwrMutation(),
            API_USE_BUG_NET_SWR_MUTATION: useApiUseBugNetSwrMutation(),
            API_HELP_USE_BUG_NET_SWR_MUTATION: useApiHelpUseBugNetSwrMutation(),
            API_USE_FRUIT_FERTILIZER_SWR_MUTATION: useApiUseFruitFertilizerSwrMutation(),
            API_HELP_USE_FRUIT_FERTILIZER_SWR_MUTATION: useApiHelpUseFruitFertilizerSwrMutation(),

            // honeycomb
            HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION:
        useHoneycombSendTransactionSwrMutation(),
            // queries
            QUERY_GRAPHQL_USER_SWR_MUTATION: useGraphQLQueryUserSwrMutation(),
            QUERY_GRAPHQL_STATIC_SWR_MUTATION: useGraphQLQueryStaticSwrMutation(),
            QUERY_GRAPHQL_INVENTORIES_SWR_MUTATION: useGraphQLQueryInventoriesSwrMutation(),
            QUERY_GRAPHQL_NEIGHBORS_SWR_MUTATION: useGraphQLQueryNeighborsSwrMutation(),
            QUERY_GRAPHQL_FOLLOWEES_SWR_MUTATION: useGraphQLQueryFolloweesSwrMutation(),
            QUERY_GRAPHQL_FOLLOWEES_SWR: useGraphQLQueryFolloweesSwr(),
            QUERY_GRAPHQL_NEIGHBORS_SWR: useGraphQLQueryNeighborsSwr(),
            QUERY_GRAPHQL_USER_SWR: useGraphQLQueryUserSwr(),
            QUERY_GRAPHQL_STATIC_SWR: useGraphQLQueryStaticSwr(),
                                    
            MUTATION_GRAPHQL_AUTHENTICATION_SWR_MUTATION: useGraphQLMutationAuthenticationSwrMutation(),
            //io
            GAMEPLAY_IO: useGameplayIo(),
        }}
    >
        {children}
    </BaseSingletonHookProvider>
)

export const SingletonHook2Provider = ({ children }: PropsWithChildren) => (
    <BaseSingletonHook2Provider
        hooks={{
            MINT_OFFCHAIN_TOKENS_RHF: useMintOffchainTokensRhf(),
            TRANSFER_TOKEN_RHF: useTransferTokensRhf(),
            TRANSFER_TOKEN_FORMIK: useTransferTokenFormik(),
        }}
    >
        {children}
    </BaseSingletonHook2Provider>
)
