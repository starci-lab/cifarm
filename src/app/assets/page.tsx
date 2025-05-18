"use client"

import React, { FC } from "react"
import { AssetTab, setAssetTab, useAppDispatch, useAppSelector } from "@/redux"
import { Container, Header, Spacer, Tabs, TabsList, TabsTrigger } from "@/components"  // ShadCN UI Button

const Page: FC = () => {
    const assetTab = useAppSelector((state) => state.tabReducer.assetTab)
    const dispatch = useAppDispatch()

    return (
        <Container hasPadding> 
            <div>
                <Header 
                    title="Assets"
                />
                <Spacer y={6}/>
                <div>
                    <Tabs className="w-full" value={assetTab} onValueChange={(value) => dispatch(setAssetTab(value as AssetTab))}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value={AssetTab.InGame}>
                                In-game
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <Spacer y={6}/>
                {/* {renderContent()} */}
            </div>
        </Container>
    )
}

export default Page
