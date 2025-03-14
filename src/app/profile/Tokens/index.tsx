import { valuesWithKey, WithKey } from "@/modules/common"
import { useAppSelector } from "@/redux"
import { Button, Card, Divider, Spacer } from "@heroui/react"
import React, { FC } from "react"
import { Token } from "./Token"
import { ExclamationTooltip } from "@/components"
import {
    AdjustmentsHorizontalIcon,
    ArrowDownTrayIcon,
    ArrowPathIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline"
import { QrCodeIcon, SendToBackIcon } from "lucide-react"
import Operation, { OperationProps } from "./Operation"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"

export const Tokens: FC = () => {
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const tokensArray = valuesWithKey(tokens).filter((token) => token.enabled)
    const router = useRouterWithSearchParams()

    const operations: Array<WithKey<OperationProps>> = [
        {
            key: "transfer",
            icon: <PaperAirplaneIcon className="w-8 h-8" />,
            name: "Transfer",
        },
        {
            key: "receive",
            icon: <ArrowDownTrayIcon className="w-8 h-8" />,
            name: "Receive",
        },
        {
            key: "scan",
            icon: <QrCodeIcon className="w-8 h-8" strokeWidth={1.5} />,
            name: "Scan",
        },
        {
            key: "crossChainTransfer",
            icon: <SendToBackIcon className="w-8 h-8" strokeWidth={1.5} />,
            name: "Cross-chain Transfer",
        },
    ]
    return (
        <>
            <div>
                <div className="flex gap-2 items-center">
                    <div className="text-lg font-bold">Operations</div>
                    <ExclamationTooltip message="Perform operations on your tokens." />
                </div>
            </div>
            <Spacer y={4} />
            <div className="grid grid-cols-3 gap-2">
                {operations.map((operation) => {
                    return <Operation {...operation} key={operation.key} />
                })}
            </div>
            <Spacer y={6} />
            <div>
                <div className="flex gap-2 items-center">
                    <div className="text-lg font-bold">Tokens</div>
                    <ExclamationTooltip message="The tokens you have added to your wallet." />
                </div>
                <Spacer y={4} />
                <Card>
                    {tokensArray.map((token, index) => {
                        const last = index === tokensArray.length - 1
                        return (
                            <>
                                <Token token={token} />
                                {!last && <Divider />}
                            </>
                        )
                    })}
                </Card>
                <Spacer y={4} />
                <div className="flex gap-2">
                    <Button isIconOnly variant="flat" fullWidth>
                        <ArrowPathIcon className="w-5 h-5" />
                    </Button>
                    <Button onPress={() => router.push(pathConstants.adjustTokens)} isIconOnly variant="flat" fullWidth>
                        <AdjustmentsHorizontalIcon className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </>
    )
}
