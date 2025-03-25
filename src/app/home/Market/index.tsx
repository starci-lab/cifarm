import { NATIVE_COINGEKCO_SWR } from "@/app/constants"
import { ExclamationTooltip } from "@/components"
import { useNativeCoinGeckoSWR } from "@/hooks"
import { blockchainMap, DefaultToken } from "@/modules/blockchain"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import React, { FC, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
                <ExclamationTooltip message="The current market prices and trends are based on the last 24 hours." />
            </div>
            <div className="h-4" />
            <Card>
                <div className="grid">
                    <Card className="border-0 shadow-none cursor-pointer hover:bg-accent/50 transition-colors">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex gap-2 items-center">
                                    <Image
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                        src={
                                            blockchainMap[chainKey].defaultTokens[network][
                                                DefaultToken.Native
                                            ].imageUrl
                                        }
                                        alt={blockchainMap[chainKey].defaultTokens[network][
                                            DefaultToken.Native
                                        ].name}
                                    />
                                    <div>
                                        <div className="text-sm">
                                            {
                                                blockchainMap[chainKey].defaultTokens[network][
                                                    DefaultToken.Native
                                                ].name
                                            }
                                        </div>
                                        <div className="text-xs text-muted-foreground">
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
                                    <Badge 
                                        variant="secondary" 
                                        className={cn(
                                            "border-0",
                                            (data?.priceChange ?? 0) >= 0 
                                                ? "bg-green-500 hover:bg-green-600" 
                                                : "bg-red-500 hover:bg-red-600"
                                        )}
                                    >
                                        {`${(data?.priceChange ?? 0) >= 0 ? "+" : ""}${
                                            data?.priceChange
                                        }%`}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Separator />
                    <Card className="border-0 shadow-none cursor-pointer hover:bg-accent/50 transition-colors">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex gap-2 items-center">
                                    <Image
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                        src={
                                            blockchainMap[chainKey].defaultTokens[network][
                                                DefaultToken.$CARROT
                                            ].imageUrl
                                        }
                                        alt={blockchainMap[chainKey].defaultTokens[network][
                                            DefaultToken.$CARROT
                                        ].name}
                                    />
                                    <div>
                                        <div className="text-sm">
                                            {
                                                blockchainMap[chainKey].defaultTokens[network][
                                                    DefaultToken.$CARROT
                                                ].name
                                            }
                                        </div>
                                        <div className="text-xs text-muted-foreground">
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
                                    <Badge 
                                        variant="secondary" 
                                        className={cn(
                                            "border-0",
                                            "bg-green-500 hover:bg-green-600"
                                        )}
                                    >
                                        {"+0%"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Separator />
                    <Card className="border-0 shadow-none cursor-pointer hover:bg-accent/50 transition-colors">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex gap-2 items-center">
                                    <Image
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                        src={
                                            blockchainMap[chainKey].defaultTokens[network][
                                                DefaultToken.$CAULI
                                            ].imageUrl
                                        }
                                        alt={blockchainMap[chainKey].defaultTokens[network][
                                            DefaultToken.$CAULI
                                        ].name}
                                    />
                                    <div>
                                        <div className="text-sm">
                                            {
                                                blockchainMap[chainKey].defaultTokens[network][
                                                    DefaultToken.$CAULI
                                                ].name
                                            }
                                        </div>
                                        <div className="text-xs text-muted-foreground">
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
                                    <Badge 
                                        variant="secondary" 
                                        className={cn(
                                            "border-0",
                                            "bg-green-500 hover:bg-green-600"
                                        )}
                                    >
                                        {"+0%"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Card>
        </div>
    )
}
