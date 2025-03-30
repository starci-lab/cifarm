import {
    useNativeCoinGeckoSWR,
    useGraphQLMutationAuthenticationSwrMutation,
    useGraphQLMutationMintOffchainTokensSwrMutation,
    useGameplayIo,
    useMintOffchainTokensRhf,
    useTransferTokensRhf,
    useTransferTokenFormik,
    useTransferTokenSwrMutation,
    useHoneycombSendTransactionSwrMutation,
    useGraphQLMutationUnfollowSwrMutation,
    useGraphQLMutationFollowSwrMutation,
    useGraphQLMutationClaimHoneycombDailyRewardSwrMutation,
    useGraphQLQueryInventoriesSwr,
    useGraphQLQueryStaticSwr,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
    useGraphQLQueryUserSwr,
    useGraphQLQueryPlacedItemsSwrMutation,
    useGraphQLMutationUpdateFollowXSwrMutation,
} from "@/hooks"
import {
    SingletonHookProvider as BaseSingletonHookProvider,
    SingletonHook2Provider as BaseSingletonHook2Provider,
} from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import React, { PropsWithChildren } from "react"
import { useGraphQLMutationUpdateReferralSwrMutation } from "@/hooks/swr/graphql/mutations/useGraphQLMutationUpdateReferralSwrMutation"

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
            MINT_DISCLOSURE: useDisclosure(),
            MINT_AMOUNT_DISCLOSURE: useDisclosure(),
            SELECT_TOKEN_DISCLOSURE: useDisclosure(),
            
            // Using new constants with GraphQL mutations
            GRAPHQL_MUTATION_AUTHENTICATION_SWR_MUTATION: useGraphQLMutationAuthenticationSwrMutation(),
            GRAPHQL_MUTATION_MINT_OFFCHAIN_TOKENS_SWR_MUTATION: useGraphQLMutationMintOffchainTokensSwrMutation(),
            GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION: useGraphQLMutationUnfollowSwrMutation(),
            GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION: useGraphQLMutationFollowSwrMutation(),
            GRAPHQL_MUTATION_CLAIM_HONEYCOMB_DAILY_REWARD_SWR_MUTATION: useGraphQLMutationClaimHoneycombDailyRewardSwrMutation(),
            GRAPHQL_MUTATION_UPDATE_FOLLOW_X_SWR_MUTATION: useGraphQLMutationUpdateFollowXSwrMutation(),
            GRAPHQL_MUTATION_UPDATE_REFERRAL_SWR_MUTATION: useGraphQLMutationUpdateReferralSwrMutation(),
            // transfer token
            TRANSFER_TOKEN_SWR_MUTATION: useTransferTokenSwrMutation(),
            // honeycomb
            HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION: useHoneycombSendTransactionSwrMutation(),  
            // queries
            GRAPHQL_QUERY_INVENTORIES_SWR: useGraphQLQueryInventoriesSwr(),
            GRAPHQL_QUERY_STATIC_SWR: useGraphQLQueryStaticSwr(),
            GRAPHQL_QUERY_FOLLOWEES_SWR: useGraphQLQueryFolloweesSwr(),
            GRAPHQL_QUERY_NEIGHBORS_SWR: useGraphQLQueryNeighborsSwr(),
            GRAPHQL_QUERY_USER_SWR: useGraphQLQueryUserSwr(),
            GRAPHQL_QUERY_PLACED_ITEMS_SWR_MUTATION: useGraphQLQueryPlacedItemsSwrMutation(),        
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
