import { valuesWithKey, WithKey } from "@/modules/common"
// import { TransactionType, useAppDispatch, useAppSelector } from "@/redux"
import { ExtendedButton, List, Spacer, Title } from "@/components"
import React, { FC } from "react"
import { Token } from "./Token"
import {
    QrCodeIcon,
    SendHorizonalIcon,
    // ArrowDownToLineIcon,
    // CalendarCheck2,
    //ChevronsUpDown,
    // HandCoins,
    // PickaxeIcon,
    // QrCodeIcon,
    // SendHorizonalIcon,
    // SendToBackIcon,
    Settings2Icon,
    //UserRoundCheck,
} from "lucide-react"
//import { Action, ActionProps } from "./Action"
import {
    //useGraphQLMutationClaimHoneycombDailyRewardSwrMutation,
    useRouterWithSearchParams,
} from "@/hooks"
import { pathConstants } from "@/constants"
// import { useSingletonHook } from "@/modules/singleton-hook"
// import {
//     GRAPHQL_MUTATION_CLAIM_HONEYCOMB_DAILY_REWARD_SWR_MUTATION,
//     MINT_DISCLOSURE,
//     SIGN_TRANSACTION_DISCLOSURE,
// } from "@/app/constants"
// import { sessionDb, SessionDbKey } from "@/modules/dexie"
// import { deserialize, serialize } from "@/modules/serialization"
// import { setSignTransactionModal, setOperations, setHoneycombProtocols, setTokens, setNFTs } from "@/redux"
// import { TxResponse } from "@/modules/honeycomb"
// import { useToast } from "@/hooks"
// import { useDisclosure } from "react-use-disclosure"
// import {
//     Collapsible,
//     CollapsibleContent,
//     CollapsibleTrigger,
// } from "@/components/ui/collapsible"
//import { setTokens, useAppSelector, useAppDispatch } from "@/redux"
import { NFTCollections } from "./NFTCollections"
import { useAppSelector } from "@/redux"
import { Action, ActionProps } from "./Action"
export const OnChain: FC = () => {
    //const { toast } = useToast()
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const tokensArray = valuesWithKey(tokens).filter((token) => token.enabled)
    const router = useRouterWithSearchParams()
    //const dispatch = useAppDispatch()
    //     const { swrMutation: claimHoneycombDailyRewardSwrMutation } =
    //     useSingletonHook<
    //       ReturnType<typeof useGraphQLMutationClaimHoneycombDailyRewardSwrMutation>
    //     >(GRAPHQL_MUTATION_CLAIM_HONEYCOMB_DAILY_REWARD_SWR_MUTATION)
    //     const { open: openSignTransactionModal } = useSingletonHook<
    //     ReturnType<typeof useDisclosure>
    //   >(SIGN_TRANSACTION_DISCLOSURE)

    //     const { open: openMintModal } = useSingletonHook<
    //     ReturnType<typeof useDisclosure>
    //     >(MINT_DISCLOSURE)
    //     const dispatch = useAppDispatch()

    const operations: Array<WithKey<ActionProps>> = [
        {
            key: "transfer",
            icon: <SendHorizonalIcon className="w-5 h-5 min-w-5 min-h-5" />,
            onClick: () => router.push(pathConstants.transfer),
            name: "Transfer",
        },
        {
            key: "receive",
            icon: <QrCodeIcon className="w-5 h-5 min-w-5 min-h-5" />,
            name: "Receive",
        },
    ]

    // const honeycombProtocols: Array<WithKey<ActionProps>> = [
    //     {
    //         key: "claimDailyReward",
    //         icon: <CalendarCheck2 className="w-8 h-8 min-w-8 min-h-8" />,
    //         name: "Claim daily reward",
    //         onClick: async () => {
    //             try {
    //                 // check if the transaction is stored in the indexedDB
    //                 const transaction = await sessionDb.keyValueStore.get(
    //                     SessionDbKey.HoneycombDailyRewardTransaction
    //                 )
    //                 let txResponse: TxResponse
    //                 if (!transaction) {
    //                 // call api
    //                     const result = await claimHoneycombDailyRewardSwrMutation.trigger({})
    //                     if (!result.data?.claimHoneycombDailyReward) {
    //                         throw new Error("Failed to claim daily reward")
    //                     }
    //                     if (!result.data.claimHoneycombDailyReward.data) {
    //                         throw new Error("Failed to claim daily reward")
    //                     }
    //                     txResponse = result.data.claimHoneycombDailyReward.data
    //                     // store the transaction in the indexedDB
    //                     await sessionDb.keyValueStore.put({
    //                         key: SessionDbKey.HoneycombDailyRewardTransaction,
    //                         value: serialize(result.data.claimHoneycombDailyReward),
    //                     })
    //                 } else {
    //                     txResponse = deserialize<TxResponse>(transaction.value)
    //                 }

    //                 dispatch(
    //                     setSignTransactionModal({
    //                         type: TransactionType.HoneycombProtocolRawTx,
    //                         data: {
    //                             txResponse,
    //                         },
    //                     })
    //                 )

    //                 openSignTransactionModal()
    //             } catch (error: unknown) {
    //                 if (error instanceof Error) {
    //                     toast({
    //                         variant: "destructive",
    //                         description: error.message,
    //                     })
    //                 }
    //             }
    //         },
    //     },
    //     {
    //         key: "staking",
    //         icon: <HandCoins className="w-8 h-8 min-w-8 min-h-8" />,
    //         name: "Staking",
    //     },
    //     {
    //         key: "kyc",
    //         icon: <UserRoundCheck className="w-8 h-8 min-w-8 min-h-8" />,
    //         name: "KYC",
    //     },
    //     {
    //         key: "mint",
    //         icon: <PickaxeIcon className="w-8 h-8 min-w-8 min-h-8" />,
    //         name: "Mint",
    //         onClick: () => openMintModal()
    //     }
    // ]
    //const isOperationsOpen = useAppSelector((state) => state.collapsibleReducer.operations)
    //const isHoneycombProtocolsOpen = useAppSelector((state) => state.collapsibleReducer.honeycombProtocols)
    // const isTokensOpen = useAppSelector(
    //     (state) => state.collapsibleReducer.tokens
    // )
    // const isNFTsOpen = useAppSelector((state) => state.collapsibleReducer.nfts)
    return (
        <>
            <div>
                <Title title="Operations" tooltipString="Perform operations on your tokens." />
                <Spacer y={4} />
                <div className="grid grid-cols-5 gap-2 w-full">
                    {operations.map((operation) => {
                        return <Action {...operation} key={operation.key} />
                    })}
                </div>
            </div>
            <Spacer y={6} />
            <div>
                <div className="flex justify-between items-center">
                    <Title
                        title="Tokens"
                        tooltipString="The tokens you have added to your wallet."
                    />
                    <ExtendedButton
                        size="icon"
                        variant="ghost"
                        onClick={() => router.push(pathConstants.manageTokens)}
                    >
                        <Settings2Icon className="w-5 h-5" />
                    </ExtendedButton>
                </div>
                <Spacer y={4} />
                <div>
                    <List
                        enableScroll={false}
                        items={tokensArray}
                        contentCallback={(item) => {
                            return <Token token={item} />
                        }}
                    />
                </div>
            </div>
            <Spacer y={6} />
            <NFTCollections />
        </>
    )
}
