"use client"
import { API_CLAIM_HONEYCOMB_DAILY_REWARD_SWR_MUTATION, SIGN_TRANSACTION_DISCLOSURE } from "@/app/constants"
import { Container, ExclamationTooltip } from "@/components"
import { useApiClaimHoneycombDailyRewardSwrMutation, useRouterWithSearchParams } from "@/hooks"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { TxResponse } from "@/modules/honeycomb"
import { deserialize, serialize } from "@/modules/serialization"
import { useSingletonHook } from "@/modules/singleton-hook"
import { setSignTransactionModal, TransactionFrom, useAppDispatch } from "@/redux"
import { Spacer, Link, Card, CardBody, Divider, Image, Button, useDisclosure } from "@heroui/react"
import { ArrowLeftIcon } from "lucide-react"
import React, { FC } from "react"

const Page: FC = () => {
    const router = useRouterWithSearchParams()

    const { swrMutation } = useSingletonHook<
            ReturnType<typeof useApiClaimHoneycombDailyRewardSwrMutation>
          >(API_CLAIM_HONEYCOMB_DAILY_REWARD_SWR_MUTATION)
    const dispatch = useAppDispatch()
    const signTransactionDiscloresure = useSingletonHook<ReturnType<typeof useDisclosure>
    >(SIGN_TRANSACTION_DISCLOSURE)
    return (
        <Container hasPadding>
            <div className="h-full">
                <div className="flex gap-2 items-center">
                    <Link as="button" onPress={() => router.back()} color="foreground">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </Link>
                    <div className="text-2xl font-bold">Honeycomb Protocol</div>
                </div>
                <Spacer y={4} />
                <div className="text-xs text-foreground-400">
                    The partnerships of CiFarm engage in integration and simplify the platform, also boosting the user experience.
                </div>
                <Spacer y={6} />
                <div>
                    <div className="flex gap-2 items-center">
                        <div className="text-lg font-bold">Available Features</div>
                        <ExclamationTooltip message="Select the chain you want to use."  />
                    </div>
                    <Spacer y={4} />
                    <Card>
                        <div className="grid">
                            <Card radius="none" shadow="none" disableRipple={true}>
                                <CardBody className="flex gap-2 w-full">
                                    <div className="flex justify-between w-full items-center">
                                        <div className="w-full flex gap-2">
                                            <Image src={"/honeycomb-protocol.svg"} radius="none" className="w-12 h-12 min-w-12" />
                                            <div>
                                                <div className="text-sm">Honeycomb Daily Reward</div>
                                                <div className="text-xs text-foreground-400">Clain $CARROT daily with Honeycomb Protocol</div>
                                            </div>
                                        </div>
                                        <Button color="primary" variant="flat" onPress={async () => {
                                            // check if transaction is exist
                                            let tx: TxResponse
                                            const transaction = await sessionDb.keyValueStore.get(SessionDbKey.HoneycombDailyRewardTransaction)
                                            if (!transaction) {
                                                const { data } = await swrMutation.trigger({})
                                                await sessionDb.keyValueStore.put({
                                                    key: SessionDbKey.HoneycombDailyRewardTransaction,
                                                    value: serialize(data)
                                                })
                                                tx = data
                                            } else {
                                                tx = deserialize(transaction.value)
                                            }
                                            dispatch(setSignTransactionModal({
                                                serializedTx: tx.transaction,
                                                transactionFrom: TransactionFrom.Honeycomb,
                                                data: tx,
                                                extraAction: () => {
                                                    // remove the transaction
                                                    sessionDb.keyValueStore.delete(SessionDbKey.HoneycombDailyRewardTransaction)
                                                }
                                            }))
                                            // call the sign modal
                                            //fetch data
                                            signTransactionDiscloresure.onOpen()
                                        }}>Claim</Button>
                                    </div>
                                </CardBody>
                            </Card>
                            <Divider />
                            <Card radius="none" shadow="none" disableRipple={true}>
                                <CardBody className="flex gap-2 w-full">
                                    <div className="flex justify-between w-full items-center">
                                        <div className="w-full flex gap-2">
                                            <Image src={"/honeycomb-protocol.svg"} radius="none" className="w-12 h-12 min-w-12" />
                                            <div>
                                                <div className="text-sm">Honeycomb Staking</div>
                                                <div className="text-xs text-foreground-400">Stake $CARROT to earn more $CARROT</div>
                                            </div>
                                        </div>
                                        <Button color="primary" variant="flat">Stake</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Card>
                </div>
            </div>
        </Container>
    )
}

export default Page