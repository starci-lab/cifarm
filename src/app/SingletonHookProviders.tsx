import {
    useNativeCoinGeckoSWR,
    useGraphQLMutationAuthenticationSwrMutation,
    useGraphQLMutationBuySeedsSwrMutation,
    useGraphQLMutationBuySuppliesSwrMutation,
    useGraphQLMutationPlantSeedSwrMutation,
    useGraphQLMutationClaimDailyRewardSwrMutation,
    useGraphQLMutationWaterCropSwrMutation,
    useGraphQLMutationBuyBuildingSwrMutation,
    useGraphQLMutationBuyTileSwrMutation,
    useGraphQLMutationBuyAnimalSwrMutation,
    useGraphQLMutationHarvestCropSwrMutation,
    useGraphQLMutationMoveInventorySwrMutation,
    useGraphQLMutationUpgradeBuildingSwrMutation,
    useGraphQLMutationHelpUsePesticideSwrMutation,
    useGraphQLMutationHelpWaterCropSwrMutation,
    useGraphQLMutationThiefCropSwrMutation,
    useGraphQLMutationMintOffchainTokensSwrMutation,
    useGraphQLMutationDeliverMoreProductSwrMutation,
    useGraphQLMutationMoveSwrMutation,
    useGraphQLMutationBuyToolSwrMutation,
    useGraphQLMutationSellSwrMutation,
    useGraphQLMutationBuyFruitSwrMutation,
    useGraphQLMutationHarvestAnimalSwrMutation,
    useGraphQLMutationThiefAnimalProductSwrMutation,
    useGraphQLMutationHelpCureAnimalSwrMutation,
    useGraphQLMutationUseFruitFertilizerSwrMutation,
    useGraphQLQueryNeighborsSwr,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryFolloweesSwrMutation,
    useGraphQLQueryNeighborsSwrMutation,
    useGraphQLQueryInventoriesSwrMutation,
    useGraphQLQueryStaticSwrMutation,
    useGraphQLMutationHelpUseFruitFertilizerSwrMutation,
    useGraphQLMutationHelpUseBugNetSwrMutation,
    useGraphQLMutationUseBugNetSwrMutation,
    useGraphQLMutationThiefFruitSwrMutation,
    useGraphQLMutationHarvestFruitSwrMutation,
    useGraphQLMutationHelpFeedAnimalSwrMutation,
    useGraphQLQueryStaticSwr,
    useGraphQLQueryUserSwr,
    useGraphQLQueryUserSwrMutation,
    useGameplayIo,
    useMintOffchainTokensRhf,
    useTransferTokensRhf,
    useTransferTokenFormik,
    useTransferTokenSwrMutation,
    useHoneycombSendTransactionSwrMutation,
    useGraphQLMutationUpdateReferralSwrMutation,
    useGraphQLMutationUpdateTutorialSwrMutation,
    useGraphQLMutationUpdateFollowXSwrMutation,
    useGraphQLMutationVisitSwrMutation,
    useGraphQLMutationUsePesticideSwrMutation,
    useGraphQLMutationDeliverProductSwrMutation,
    useGraphQLMutationRetainProductSwrMutation,
    useGraphQLMutationReturnSwrMutation,
    useGraphQLMutationUnfollowSwrMutation,
    useGraphQLMutationFollowSwrMutation,
    useGraphQLMutationUseHerbicideSwrMutation,
    useGraphQLMutationHelpUseHerbicideSwrMutation,
    useGraphQLMutationFeedAnimalSwrMutation,
    useGraphQLMutationCureAnimalSwrMutation,
    useGraphQLMutationUseFertilizerSwrMutation,
    useGraphQLMutationClaimHoneycombDailyRewardSwrMutation,
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
            
            // Using new constants with GraphQL mutations
            GRAPHQL_MUTATION_AUTHENTICATION_SWR_MUTATION: useGraphQLMutationAuthenticationSwrMutation(),
            GRAPHQL_MUTATION_BUY_SEEDS_SWR_MUTATION: useGraphQLMutationBuySeedsSwrMutation(),
            GRAPHQL_MUTATION_BUY_SUPPLIES_SWR_MUTATION: useGraphQLMutationBuySuppliesSwrMutation(),
            GRAPHQL_MUTATION_PLANT_SEED_SWR_MUTATION: useGraphQLMutationPlantSeedSwrMutation(),
            GRAPHQL_MUTATION_CLAIM_DAILY_REWARD_SWR_MUTATION: useGraphQLMutationClaimDailyRewardSwrMutation(),
            GRAPHQL_MUTATION_WATER_CROP_SWR_MUTATION: useGraphQLMutationWaterCropSwrMutation(),
            GRAPHQL_MUTATION_BUY_BUILDING_SWR_MUTATION: useGraphQLMutationBuyBuildingSwrMutation(),
            GRAPHQL_MUTATION_BUY_TILE_SWR_MUTATION: useGraphQLMutationBuyTileSwrMutation(),
            GRAPHQL_MUTATION_BUY_ANIMAL_SWR_MUTATION: useGraphQLMutationBuyAnimalSwrMutation(),
            GRAPHQL_MUTATION_HARVEST_CROP_SWR_MUTATION: useGraphQLMutationHarvestCropSwrMutation(),
            GRAPHQL_MUTATION_MOVE_INVENTORY_SWR_MUTATION: useGraphQLMutationMoveInventorySwrMutation(),
            GRAPHQL_MUTATION_UPGRADE_BUILDING_SWR_MUTATION: useGraphQLMutationUpgradeBuildingSwrMutation(),
            GRAPHQL_MUTATION_HELP_USE_PESTICIDE_SWR_MUTATION: useGraphQLMutationHelpUsePesticideSwrMutation(),
            GRAPHQL_MUTATION_HELP_WATER_CROP_SWR_MUTATION: useGraphQLMutationHelpWaterCropSwrMutation(),
            GRAPHQL_MUTATION_THIEF_CROP_SWR_MUTATION: useGraphQLMutationThiefCropSwrMutation(),
            GRAPHQL_MUTATION_MINT_OFFCHAIN_TOKENS_SWR_MUTATION: useGraphQLMutationMintOffchainTokensSwrMutation(),
            GRAPHQL_MUTATION_DELIVER_MORE_PRODUCT_SWR_MUTATION: useGraphQLMutationDeliverMoreProductSwrMutation(),
            GRAPHQL_MUTATION_MOVE_SWR_MUTATION: useGraphQLMutationMoveSwrMutation(),
            GRAPHQL_MUTATION_BUY_TOOL_SWR_MUTATION: useGraphQLMutationBuyToolSwrMutation(),
            GRAPHQL_MUTATION_SELL_SWR_MUTATION: useGraphQLMutationSellSwrMutation(),
            GRAPHQL_MUTATION_BUY_FRUIT_SWR_MUTATION: useGraphQLMutationBuyFruitSwrMutation(),
            GRAPHQL_MUTATION_HARVEST_ANIMAL_SWR_MUTATION: useGraphQLMutationHarvestAnimalSwrMutation(),
            GRAPHQL_MUTATION_THIEF_ANIMAL_PRODUCT_SWR_MUTATION: useGraphQLMutationThiefAnimalProductSwrMutation(),
            GRAPHQL_MUTATION_HELP_CURE_ANIMAL_SWR_MUTATION: useGraphQLMutationHelpCureAnimalSwrMutation(),
            GRAPHQL_MUTATION_USE_FRUIT_FERTILIZER_SWR_MUTATION: useGraphQLMutationUseFruitFertilizerSwrMutation(),
            GRAPHQL_MUTATION_HELP_USE_FRUIT_FERTILIZER_SWR_MUTATION: useGraphQLMutationHelpUseFruitFertilizerSwrMutation(),
            GRAPHQL_MUTATION_HELP_USE_BUG_NET_SWR_MUTATION: useGraphQLMutationHelpUseBugNetSwrMutation(),
            GRAPHQL_MUTATION_USE_BUG_NET_SWR_MUTATION: useGraphQLMutationUseBugNetSwrMutation(),
            GRAPHQL_MUTATION_THIEF_FRUIT_SWR_MUTATION: useGraphQLMutationThiefFruitSwrMutation(),
            GRAPHQL_MUTATION_HARVEST_FRUIT_SWR_MUTATION: useGraphQLMutationHarvestFruitSwrMutation(),
            GRAPHQL_MUTATION_HELP_FEED_ANIMAL_SWR_MUTATION: useGraphQLMutationHelpFeedAnimalSwrMutation(),
            GRAPHQL_MUTATION_UPDATE_REFERRAL_SWR_MUTATION: useGraphQLMutationUpdateReferralSwrMutation(),   
            GRAPHQL_MUTATION_UPDATE_TUTORIAL_SWR_MUTATION: useGraphQLMutationUpdateTutorialSwrMutation(),
            GRAPHQL_MUTATION_UPDATE_FOLLOW_X_SWR_MUTATION: useGraphQLMutationUpdateFollowXSwrMutation(),
            GRAPHQL_MUTATION_VISIT_SWR_MUTATION: useGraphQLMutationVisitSwrMutation(),
            GRAPHQL_MUTATION_USE_PESTICIDE_SWR_MUTATION: useGraphQLMutationUsePesticideSwrMutation(),
            GRAPHQL_MUTATION_DELIVER_PRODUCT_SWR_MUTATION: useGraphQLMutationDeliverProductSwrMutation(),
            GRAPHQL_MUTATION_RETAIN_PRODUCT_SWR_MUTATION: useGraphQLMutationRetainProductSwrMutation(), 
            GRAPHQL_MUTATION_RETURN_SWR_MUTATION: useGraphQLMutationReturnSwrMutation(),
            GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION: useGraphQLMutationUnfollowSwrMutation(),
            GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION: useGraphQLMutationFollowSwrMutation(),
            GRAPHQL_MUTATION_USE_HERBICIDE_SWR_MUTATION: useGraphQLMutationUseHerbicideSwrMutation(),
            GRAPHQL_MUTATION_HELP_USE_HERBICIDE_SWR_MUTATION: useGraphQLMutationHelpUseHerbicideSwrMutation(),  
            GRAPHQL_MUTATION_FEED_ANIMAL_SWR_MUTATION: useGraphQLMutationFeedAnimalSwrMutation(),
            GRAPHQL_MUTATION_CURE_ANIMAL_SWR_MUTATION: useGraphQLMutationCureAnimalSwrMutation(),
            GRAPHQL_MUTATION_USE_FERTILIZER_SWR_MUTATION: useGraphQLMutationUseFertilizerSwrMutation(),
            GRAPHQL_MUTATION_CLAIM_HONEYCOMB_DAILY_REWARD_SWR_MUTATION: useGraphQLMutationClaimHoneycombDailyRewardSwrMutation(),
            // transfer token
            TRANSFER_TOKEN_SWR_MUTATION: useTransferTokenSwrMutation(),

            // honeycomb
            HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION: useHoneycombSendTransactionSwrMutation(),
            
            // queries
            GRAPHQL_QUERY_USER_SWR_MUTATION: useGraphQLQueryUserSwrMutation(),
            GRAPHQL_QUERY_STATIC_SWR_MUTATION: useGraphQLQueryStaticSwrMutation(),
            GRAPHQL_QUERY_INVENTORIES_SWR_MUTATION: useGraphQLQueryInventoriesSwrMutation(),
            GRAPHQL_QUERY_NEIGHBORS_SWR_MUTATION: useGraphQLQueryNeighborsSwrMutation(),
            GRAPHQL_QUERY_FOLLOWEES_SWR_MUTATION: useGraphQLQueryFolloweesSwrMutation(),
            GRAPHQL_QUERY_FOLLOWEES_SWR: useGraphQLQueryFolloweesSwr(),
            GRAPHQL_QUERY_NEIGHBORS_SWR: useGraphQLQueryNeighborsSwr(),
            GRAPHQL_QUERY_USER_SWR: useGraphQLQueryUserSwr(),
            GRAPHQL_QUERY_STATIC_SWR: useGraphQLQueryStaticSwr(),
                                    
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
