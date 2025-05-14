// import { TransactionType, useAppDispatch, useAppSelector } from "@/redux"
import { ExtendedButton, Spacer, Title } from "@/components"
import {
    RotateCcwIcon,
    Settings2Icon,
} from "lucide-react"
import React, { FC } from "react"
//import { Action, ActionProps } from "./Action"
import { pathConstants } from "@/constants"
import {
    //useGraphQLMutationClaimHoneycombDailyRewardSwrMutation,
    useRouterWithSearchParams,
} from "@/hooks"
import {
    triggerRefreshTokens,
    useAppDispatch,
    useAppSelector
} from "@/redux"
import { NFTCollections } from "./NFTCollections"
export const OnChain: FC = () => {
    // const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    // const tokensArray = valuesWithKey(tokens).filter((token) => token.enabled)
    const router = useRouterWithSearchParams()
    const balanceSwrs = useAppSelector(
        (state) => state.sessionReducer.balanceSwrs
    )
    const dispatch = useAppDispatch()
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <Title
                        title="Tokens"
                        tooltipString="The tokens you have added to your wallet."
                    />
                    <div className="flex gap-2 items-center">
                        <ExtendedButton
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                dispatch(triggerRefreshTokens())
                            }}
                        >
                            <RotateCcwIcon className="w-5 h-5" />
                        </ExtendedButton>
                        <ExtendedButton
                            size="icon"
                            variant="ghost"
                            onClick={() => router.push(pathConstants.manageTokens)}
                        >
                            <Settings2Icon className="w-5 h-5" />
                        </ExtendedButton>
                    </div>
                </div>
                <Spacer y={4} />
                {/* <div>
                    <List
                        enableScroll={false}
                        items={tokensArray}
                        contentCallback={(item) => {
                            return (
                                <Token
                                    token={item}
                                    balanceSwr={balanceSwrs[item.key]}
                                    onClick={() => {
                                        dispatch(setTokenKey(item.key))
                                        router.push(pathConstants.token)
                                    }}
                                />
                            )
                        }}
                    />
                </div> */}
            </div>
            <Spacer y={6} />
            <NFTCollections />
        </>
    )
}
