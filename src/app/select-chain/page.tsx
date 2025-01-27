"use client"
import { Container } from "@/components"
import { useRouterWithSearchParams } from "@/hooks"
import { blockchainMap, ChainKey } from "@/modules/blockchain"
import { Button, Image, Link, Spacer } from "@heroui/react"
import { ArrowLeftIcon } from "lucide-react"
import React, { FC } from "react"

const Page: FC = () => {
    const router = useRouterWithSearchParams()
    return (
        <Container hasPadding>
            <div className="h-full">
                <div>
                    <div className="flex gap-2 items-center">
                        <Link as="button" onPress={() => router.back()} color="foreground">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </Link>
                        <div className="text-2xl font-bold">Select Chain</div>
                    </div>
                    <Spacer y={4} />
                    <div className="text-xs text-foreground-400">
            Please select the chain you want to use.
                    </div>
                </div>
                <Spacer y={12} />
                <div className="grid gap-4">
                    {Object.values(ChainKey).map((chain) => {
                        return (
                            <Button
                                size="lg"
                                key={chain}
                                className="justify-start"
                                variant="flat"
                                startContent={
                                    <Image
                                        src={blockchainMap[chain].imageUrl}
                                        radius="none"
                                        className="w-6 h-6"
                                    />
                                }
                            >
                                {blockchainMap[chain].name}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </Container>
    )
}

export default Page
