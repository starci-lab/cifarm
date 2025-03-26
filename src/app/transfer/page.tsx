"use client"
import { Container, Header, TabsList } from "@/components"
import {
    AssetTab,
    setTransferTab,
    TransferTab,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { Spacer, Tabs, TabsTrigger } from "@/components"
import React, { FC } from "react"
import { Tokens } from "./Tokens"

const Page: FC = () => {
    const renderContent = () => {
        const map = {
            [TransferTab.Token]: <Tokens />,
            [TransferTab.NFTs]: <div />,
        }
        return map[transferTab]
    }
    const transferTab = useAppSelector((state) => state.tabReducer.transferTab)
    const dispatch = useAppDispatch()
    return (
        <Container hasPadding>
            <div className="flex flex-col justify-between gap-6">
                <div>
                    <Header title="Transfer" description="Transfer your tokens" />
                    <Spacer y={6} />
                    <Tabs className="w-full" value={transferTab} onValueChange={(value) => dispatch(setTransferTab(value as AssetTab))}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value={TransferTab.Token}>
                                Tokens
                            </TabsTrigger>
                            <TabsTrigger value={TransferTab.NFTs}>
                                NFTs
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex-1">
                    {renderContent()}
                </div>
            </div>
        </Container>
    )
}

export default Page
