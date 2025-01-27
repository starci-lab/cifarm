"use client"
import { Container, QuestionTooltip } from "@/components"
import { useRouterWithSearchParams } from "@/hooks"
import { blockchainMap, ChainKey, Network, networkMap } from "@/modules/blockchain"
import { setChainKey, setNetwork, useAppDispatch, useAppSelector } from "@/redux"
import { Alert, Button, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Link, Spacer } from "@heroui/react"
import { ArrowLeftIcon } from "lucide-react"
import React, { FC } from "react"

const Page: FC = () => {
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()
    const chainKey = useAppSelector(
        (state) => state.sessionReducer.chainKey
    )
    const network = useAppSelector(
        (state) => state.sessionReducer.network
    )
    const networkName = networkMap[network].name
    const isTestnet = network === Network.Testnet
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
                <div>
                    <div className="flex gap-2 items-center">
                        <div className="text-lg font-bold">Supported Chains</div>
                        <QuestionTooltip message="Select the chain you want to use."  />
                    </div>
                    <Spacer y={4} />
                    <Card>
                        <div className="grid">
                            {Object.values(ChainKey).map((_chainKey, index) => {
                                const isSelected = chainKey === _chainKey
                                const last = index === Object.values(ChainKey).length - 1
                                return (
                                    <>
                                        <Card
                                            radius="none"
                                            shadow="none"
                                            key={_chainKey}
                                            isPressable={true}
                                            disableRipple={true}
                                            onPress={() => {
                                                dispatch(setChainKey(_chainKey))
                                            }}
                                            className={isSelected ? "bg-default/40" : ""}
                                        >
                                            <CardBody className="flex gap-2">
                                                <div className="flex gap-2 items-center">
                                                    <Image
                                                        src={blockchainMap[_chainKey].imageUrl}
                                                        radius="none"
                                                        className="w-6 h-6"
                                                    />
                                                    <div>{blockchainMap[_chainKey].name}</div>
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
                <Spacer y={12} />
                <div>
                    <div className="flex gap-2 items-center">
                        <div className="text-lg font-bold">Network</div>
                        <QuestionTooltip message="Select the network you want to use."  />
                    </div>
                    <Spacer y={4} />
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="flat">{networkName}</Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            {
                                Object.values(Network).map((_network) => (
                                    <DropdownItem
                                        key={_network}
                                        onPress={() => {
                                            dispatch(setNetwork(_network))
                                        }}
                                    >
                                        {networkMap[_network].name}
                                    </DropdownItem>
                                ))
                            }
                        </DropdownMenu>
                    </Dropdown>
                    {
                        isTestnet && (
                            <>
                                <Spacer y={4} />
                                <Alert color="warning">
                                    <div className="text-sm">
                                        The testnet mode is only for testing purposes, and all assets have no value.
                                    </div>
                                </Alert>
                            </>
                        )
                    }
                </div>
            </div>
        </Container>
    )
}

export default Page
