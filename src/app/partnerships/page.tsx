"use client"

import { Container, QuestionTooltip } from "@/components"
import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { valuesWithKey } from "@/modules/common"
import { Card, CardBody,Divider, Image, Link, Spacer } from "@heroui/react"
import { ArrowLeftIcon } from "lucide-react"
import React, { FC } from "react"
import { Partnership, PartnershipKey } from "./types"

const Page: FC = () => {
    const router = useRouterWithSearchParams()

    const partnerships: Record<PartnershipKey, Partnership> = {
        [PartnershipKey.HoneycombProtocol]: {
            name: "Honeycomb Protocol",
            description: "Honeycomb Protocol, developed on top of the robust Solana blockchain, addresses this gap by offering a comprehensive suite of tools designed specifically for game developers.",
            logo: "/honeycomb-protocol.svg",
            onPress: () => {
                router.push(pathConstants.partnershipsHoneycombProtocol)
            },
        }
    }

    return (
        <Container hasPadding >
            <div className="h-full">
                <div>
                    <div className="flex gap-2 items-center">
                        <Link as="button" onPress={() => router.back()} color="foreground">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </Link>
                        <div className="text-2xl font-bold">Partnerships</div>
                    </div>
                    <Spacer y={4} />
                    <div className="text-xs text-foreground-400">
                    The partnerships of CiFarm engage in integration and simplify the platform, also boosting the user experience.
                    </div>
                </div>
                <Spacer y={6} />
                <div>
                    <div className="flex gap-2 items-center">
                        <div className="text-lg font-bold">Available Partnerships</div>
                        <QuestionTooltip message="Select the chain you want to use."  />
                    </div>
                    <Spacer y={4} />
                    <Card>
                        <div className="grid">
                            {valuesWithKey(partnerships).map(({ key, name, description, logo, onPress }, index) => {
                                const last = index === Object.values(partnerships).length - 1
                                return (
                                    <>
                                        <Card
                                            radius="none"
                                            shadow="none"
                                            key={key}
                                            isPressable={true}
                                            disableRipple={true}
                                            onPress={onPress}
                                        >
                                            <CardBody className="flex gap-2">
                                                <div className="w-full flex gap-2">
                                                    <Image
                                                        src={logo}
                                                        radius="none"
                                                        className="w-12 h-12 min-w-12"
                                                    />
                                                    <div>
                                                        <div className="text-sm">{name}</div>
                                                        <div className="text-xs text-foreground-400">{description}</div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        {!last && <Divider/>}
                                    </>
                                )
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        </Container>
    )
}

export default Page