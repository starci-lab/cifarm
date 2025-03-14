"use client"
import { Container, Header } from "@/components"
import {
    setTransferTab,
    TransferTab,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { Spacer, Tab, Tabs } from "@heroui/react"
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
                    <Tabs
                        size="lg"
                        color="primary"
                        classNames={{
                            base: "w-full",
                            tabList: "w-full",
                            tabContent:
            "group-data-[selected=true]:light group-data-[selected=true]:text-background",
                        }}
                        selectedKey={transferTab}
                        onSelectionChange={(transferTab) =>
                            dispatch(setTransferTab(transferTab))
                        }
                        aria-label="Options"
                    >
                        <Tab key={TransferTab.Token} title="Token" />
                        <Tab key={TransferTab.NFTs} title="NFT" />
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
