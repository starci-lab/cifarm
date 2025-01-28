import { NATIVE_COINGEKCO_SWR } from "@/app/constants"
import { QuestionTooltip } from "@/components"
import { useNativeCoinGeckoSWR } from "@/hooks"
import { blockchainMap, DefaultToken } from "@/modules/blockchain"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import { Card, CardBody, Chip, Divider, Image, Spacer } from "@heroui/react"
import React, { FC, useEffect } from "react"

export const Market: FC = () => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)

    //get the singleton hook for native coin gecko swr
    const {
        swr: { data, mutate },
    } =
    useSingletonHook<ReturnType<typeof useNativeCoinGeckoSWR>>(
        NATIVE_COINGEKCO_SWR
    )

    //when this component is mounted, set the loaded state to true
    useEffect(() => {
        const handleEffect = async () => {
            await mutate()
        }
        handleEffect()
    }, [])

    return (
        <div>
            <div className="flex gap-2 items-center">
                <div className="text-lg font-bold">Market</div>
                <QuestionTooltip message="The current market prices and trends are based on the last 24 hours." />
            </div>
            <Spacer y={4} />
            <Card>
                <div className="grid">
                    <Card
                        radius="none"
                        shadow="none"
                        isPressable={true}
                        disableRipple={true}
                        onPress={() => {
                            console.log("pressed")
                        }}
                    >
                        <CardBody>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex gap-2 items-center">
                                    <Image
                                        className="w-8 h-8"
                                        src={
                                            blockchainMap[chainKey].defaultTokens[network][
                                                DefaultToken.Native
                                            ].imageUrl
                                        }
                                    />
                                    <div>
                                        <div className="text-sm">
                                            {
                                                blockchainMap[chainKey].defaultTokens[network][
                                                    DefaultToken.Native
                                                ].name
                                            }
                                        </div>
                                        <div className="text-xs text-foreground-400">
                                            {`${
                                                blockchainMap[chainKey].defaultTokens[network][
                                                    DefaultToken.Native
                                                ].symbol
                                            }`}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className="text-sm">{`${data?.price} USD`}</div>
                                    <Chip
                                        classNames={{
                                            content: "text-light",
                                        }}
                                        color={(data?.priceChange ?? 0) >= 0 ? "success" : "danger"}
                                    >{`${(data?.priceChange ?? 0) >= 0 ? "+" : ""}${
                                            data?.priceChange
                                        }%`}</Chip>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Divider />
                    <Card
                        radius="none"
                        shadow="none"
                        isPressable={true}
                        disableRipple={true}
                        onPress={() => {
                            console.log("pressed")
                        }}
                    >
                        <CardBody>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex gap-2 items-center">
                                    <Image
                                        className="w-8 h-8"
                                        src={
                                            blockchainMap[chainKey].defaultTokens[network][
                                                DefaultToken.$CARROT
                                            ].imageUrl
                                        }
                                    />
                                    <div>
                                        <div className="text-sm">
                                            {
                                                blockchainMap[chainKey].defaultTokens[network][
                                                    DefaultToken.$CARROT
                                                ].name
                                            }
                                        </div>
                                        <div className="text-xs text-foreground-400">
                                            {`${
                                                blockchainMap[chainKey].defaultTokens[network][
                                                    DefaultToken.$CARROT
                                                ].symbol
                                            }`}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className="text-sm">{"0 USD"}</div>
                                    <Chip
                                        classNames={{
                                            content: "text-light",
                                        }}
                                        color="success">{"+0%"}</Chip>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Divider />
                    <Card
                        radius="none"
                        shadow="none"
                        isPressable={true}
                        disableRipple={true}
                        onPress={() => {
                            console.log("pressed")
                        }}
                    >
                        <CardBody>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex gap-2 items-center">
                                    <Image
                                        className="w-8 h-8"
                                        src={
                                            blockchainMap[chainKey].defaultTokens[network][
                                                DefaultToken.$CAULI
                                            ].imageUrl
                                        }
                                    />
                                    <div>
                                        <div className="text-sm">
                                            {
                                                blockchainMap[chainKey].defaultTokens[network][
                                                    DefaultToken.$CAULI
                                                ].name
                                            }
                                        </div>
                                        <div className="text-xs text-foreground-400">
                                            {`${
                                                blockchainMap[chainKey].defaultTokens[network][
                                                    DefaultToken.$CAULI
                                                ].symbol
                                            }`}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className="text-sm">{"0 USD"}</div>
                                    <Chip
                                        classNames={{
                                            content: "text-light",
                                        }}
                                        color="success">{"+0%"}</Chip>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Card>
        </div>
    )
}
