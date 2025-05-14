"use client"
import {
    Button,
    Container,
    FilterBar,
    Header,
    List,
    Spacer,
    Title,
    Token,
} from "@/components"
import React, { FC } from "react"
import { useAppSelector, useAppDispatch, setTokenKey } from "@/redux"
import { valuesWithKey } from "@/modules/common"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"
import { Plus } from "@phosphor-icons/react"

const Page: FC = () => {
    // const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    // const tokensArray = valuesWithKey(tokens)
    // const selectedTokenArray = tokensArray.filter((token) => token.enabled)
    // const availableTokenArray = tokensArray.filter((token) => !token.enabled)
    const dispatch = useAppDispatch()
    const router = useRouterWithSearchParams()
    const balanceSwrs = useAppSelector(
        (state) => state.sessionReducer.balanceSwrs
    )
    return (
        <Container hasPadding>
            <div>
                <Header title="Manage Tokens" />
                <Spacer y={6} />
                <FilterBar handleSearchResult={() => {}} />
                <Spacer y={4} />
                <div className="flex justify-between w-full items-center">
                    <Title
                        title="Selected Tokens"
                        tooltipString="Selected tokens will be displayed in the wallet"
                    />
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                <Spacer y={2} />
                {/* <List
                    enableScroll={false}
                    items={selectedTokenArray}
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
                /> */}
                <Spacer y={6} />
                <div>
                    <Title
                        title="Available Tokens"
                        tooltipString="Available tokens will not display in the list, but you can add them anytime."
                    />
                    <Spacer y={2} />
                    {/* <List
                        enableScroll={false}
                        items={availableTokenArray}
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
                    /> */}
                </div>
            </div>
        </Container>
    )
}

export default Page
