import { valuesWithKey } from "@/modules/common"
// import { TransactionType, useAppDispatch, useAppSelector } from "@/redux"
import { ExtendedButton, List, Spacer, Title } from "@/components"
import React, { FC } from "react"
import { Token } from "./Token"
import {
    Settings2Icon,
    //UserRoundCheck,
} from "lucide-react"
//import { Action, ActionProps } from "./Action"
import {
    //useGraphQLMutationClaimHoneycombDailyRewardSwrMutation,
    useRouterWithSearchParams,
} from "@/hooks"
import { pathConstants } from "@/constants"
import { NFTCollections } from "./NFTCollections"
import { useAppSelector } from "@/redux"
export const OnChain: FC = () => {
    //const { toast } = useToast()
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const tokensArray = valuesWithKey(tokens).filter((token) => token.enabled)
    const router = useRouterWithSearchParams()
    return (
        <>
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
