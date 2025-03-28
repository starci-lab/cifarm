import { valuesWithKey, WithKey } from "@/modules/common"
import { TransactionType, useAppDispatch, useAppSelector } from "@/redux"
import { Button, List, Spacer } from "@/components"
import React, { FC } from "react"
import { Token } from "./Token"
import { ExclamationTooltip } from "@/components"
import {
    ArrowDownToLineIcon,
    CalendarCheck2,
    HandCoins,
    PickaxeIcon,
    QrCodeIcon,
    RefreshCcwIcon,
    SendHorizonalIcon,
    SendToBackIcon,
    Settings2Icon,
    UserRoundCheck,
} from "lucide-react"
import { Action, ActionProps } from "./Action"
import {
    useDisclosure,
    useGraphQLMutationClaimHoneycombDailyRewardSwrMutation,
    useRouterWithSearchParams,
} from "@/hooks"
import { pathConstants } from "@/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    GRAPHQL_MUTATION_CLAIM_HONEYCOMB_DAILY_REWARD_SWR_MUTATION,
    MINT_DISCLOSURE,
    SIGN_TRANSACTION_DISCLOSURE,
} from "@/app/constants"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { deserialize, serialize } from "@/modules/serialization"
import { setSignTransactionModal } from "@/redux"
import { TxResponse } from "@/modules/honeycomb"
import { useToast } from "@/hooks/use-toast"
export const OnChainAssets: FC = () => {
    const { toast } = useToast()
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const tokensArray = valuesWithKey(tokens).filter((token) => token.enabled)
    const router = useRouterWithSearchParams()

    const { swrMutation: claimHoneycombDailyRewardSwrMutation } =
    useSingletonHook<
      ReturnType<typeof useGraphQLMutationClaimHoneycombDailyRewardSwrMutation>
    >(GRAPHQL_MUTATION_CLAIM_HONEYCOMB_DAILY_REWARD_SWR_MUTATION)
    const { onOpen: onSignTransactionModalOpen } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SIGN_TRANSACTION_DISCLOSURE)

    const { onOpen: onMintModalOpen } = useSingletonHook<
    ReturnType<typeof useDisclosure>
    >(MINT_DISCLOSURE)
    const dispatch = useAppDispatch()

    const operations: Array<WithKey<ActionProps>> = [
        {
            key: "transfer",
            icon: <SendHorizonalIcon className="w-8 h-8 min-w-8 min-h-8" />,
            onClick: () => router.push(pathConstants.transfer),
            name: "Transfer",
        },
        {
            key: "receive",
            icon: <ArrowDownToLineIcon className="w-8 h-8 min-w-8 min-h-8" />,
            name: "Receive",
        },
        {
            key: "scan",
            icon: <QrCodeIcon className="w-8 h-8 min-w-8 min-h-8" />,
            name: "Scan",
        },
        {
            key: "crossChainTransfer",
            icon: <SendToBackIcon className="w-8 h-8 min-w-8 min-h-8" />,
            name: "Cross-chain transfer",
        },
    ]

    const honeycombProtocols: Array<WithKey<ActionProps>> = [
        {
            key: "claimDailyReward",
            icon: <CalendarCheck2 className="w-8 h-8 min-w-8 min-h-8" />,
            name: "Claim daily reward",
            onClick: async () => {
                try {
                    // check if the transaction is stored in the indexedDB
                    const transaction = await sessionDb.keyValueStore.get(
                        SessionDbKey.HoneycombDailyRewardTransaction
                    )
                    let txResponse: TxResponse
                    if (!transaction) {
                    // call api
                        const result = await claimHoneycombDailyRewardSwrMutation.trigger({})
                        if (!result.data?.claimHoneycombDailyReward) {
                            throw new Error("Failed to claim daily reward")
                        }
                        txResponse = result.data.claimHoneycombDailyReward
                        // store the transaction in the indexedDB
                        await sessionDb.keyValueStore.put({
                            key: SessionDbKey.HoneycombDailyRewardTransaction,
                            value: serialize(result.data.claimHoneycombDailyReward),
                        })
                    } else {
                        txResponse = deserialize<TxResponse>(transaction.value)
                    }

                    dispatch(
                        setSignTransactionModal({
                            type: TransactionType.HoneycombProtocolRawTx,
                            data: {
                                txResponse,
                            },
                        })
                    )

                    onSignTransactionModalOpen()
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        toast({
                            variant: "destructive",
                            description: error.message,
                        })
                    }
                }
            },
        },
        {
            key: "staking",
            icon: <HandCoins className="w-8 h-8 min-w-8 min-h-8" />,
            name: "Staking",
        },
        {
            key: "kyc",
            icon: <UserRoundCheck className="w-8 h-8 min-w-8 min-h-8" />,
            name: "KYC",
        },
        {
            key: "mint",
            icon: <PickaxeIcon className="w-8 h-8 min-w-8 min-h-8" />,
            name: "Mint",
            onClick: () => onMintModalOpen()
        }
    ]

    return (
        <>
            <div>
                <div className="flex gap-2 items-center">
                    <div className="text-lg font-bold">Operations</div>
                    <ExclamationTooltip message="Perform operations on your tokens." />
                </div>
            </div>
            <Spacer y={4} />
            <div className="grid grid-cols-3 gap-2">
                {operations.map((operation) => {
                    return <Action {...operation} key={operation.key} />
                })}
            </div>
            <Spacer y={6} />
            <div>
                <div className="flex gap-2 items-center">
                    <div className="text-lg font-bold">Honeycomb Protocol</div>
                    <ExclamationTooltip message="Actions on Honeycomb Protocol." />
                </div>
            </div>
            <Spacer y={4} />
            <div className="grid grid-cols-3 gap-2">
                {honeycombProtocols.map((honeycombProtocol) => {
                    return <Action {...honeycombProtocol} key={honeycombProtocol.key} />
                })}
            </div>
            <Spacer y={6} />
            <div>
                <div className="flex gap-2 items-center">
                    <div className="tBext-lg font-bold">Tokens</div>
                    <ExclamationTooltip message="The tokens you have added to your wallet." />
                </div>
                <Spacer y={4} />
                <List
                    enableScroll={false}
                    items={tokensArray}
                    contentCallback={(item) => {
                        return <Token token={item} />
                    }}
                />
                <Spacer y={4} />
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                        <RefreshCcwIcon className="w-5 h-5" />
                    </Button>
                    <Button
                        onClick={() => router.push(pathConstants.adjustTokens)}
                        variant="ghost"
                        size="icon"
                    >
                        <Settings2Icon className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </>
    )
}
