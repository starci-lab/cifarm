import {
    GOLD_IMAGE_URL,
    GRAPHQL_QUERY_USER_SWR,
    TOKEN_IMAGE_URL,
    TOKENS_OFFCHAIN_DISCLOSURE,
} from "@/app/constants"
import { ExclamationTooltip } from "@/components"
import { useDisclosure, useGraphQLQueryUserSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"

export const GameAssets : FC = () => {
    const { onOpen: onTokensOffchainPress } = useSingletonHook<ReturnType<typeof useDisclosure>>(TOKENS_OFFCHAIN_DISCLOSURE)
    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryUserSwr>>(GRAPHQL_QUERY_USER_SWR)
    const user = swr.data?.data.user
    return (
        <div>
            {/* <div>
                <div className="flex gap-2 items-center">
                    <div className="text-lg font-bold">Assets</div>
                    <ExclamationTooltip message="Achievements and badges earned by the user." />
                </div>
                <Spacer y={4} />
                <Card>
                    <div className="grid">
                        <Card
                            radius="none"
                            shadow="none"
                            isPressable
                            disableRipple
                        >
                            <CardBody className="flex gap-2">
                                <div  className="flex gap-2 items-center">
                                    <div className="w-full flex gap-2 items-center">
                                        <Image
                                            src={GOLD_IMAGE_URL}
                                            radius="none"
                                            className="w-12 h-12 min-w-12"
                                        />
                                        <div>
                                            <div className="text-sm">Golds</div>
                                        </div>
                                    </div>
                                    <div className="text-sm">{user?.golds}</div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card
                            radius="none"
                            shadow="none"
                            isPressable
                            disableRipple
                            onPress={onTokensOffchainPress}
                        >
                            <CardBody>
                                <div  className="flex gap-2 items-center">
                                    <div className="w-full flex gap-2 items-center">
                                        <Image
                                            src={TOKEN_IMAGE_URL}
                                            radius="none"
                                            className="w-12 h-12 min-w-12"
                                        />
                                        <div>
                                            <div className="text-sm">$CARROT</div>
                                        </div>
                                    </div>
                                    <div className="text-sm">{user?.tokens}</div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Card>
            </div> */}
        </div>
    )
}