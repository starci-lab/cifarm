import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    Spacer,
    ExtendedNumberInput,
    Title,
    Image,
    PressableCard,
    ExtendedButton,
    ExtendedInput,
    //Addresses,
} from "@/components"
import React, { FC, useEffect } from "react"
import {
    useGraphQLQueryStaticSwr,
    useIsMobile,
    useTransferTokenFormik,
} from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import {
    GRAPHQL_QUERY_STATIC_SWR,
    SHEET_TRANSFER_TOKEN_DISCLOSURE,
    TRANSFER_TOKEN_FORMIK,
} from "@/app/constants"
import { useAppSelector } from "@/redux"
import { envConfig } from "@/env"

export const TransferTokenSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_TRANSFER_TOKEN_DISCLOSURE
    )
    const isMobile = useIsMobile()

    const tokenKey = useAppSelector(
        (state) => state.sheetReducer.tokenSheet.tokenKey
    )
    const balanceSwrs = useAppSelector(
        (state) => state.sessionReducer.balanceSwrs
    )
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = envConfig().network

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

    const formik = useSingletonHook2<ReturnType<typeof useTransferTokenFormik>>(
        TRANSFER_TOKEN_FORMIK
    )
    console.log(formik.values)

    useEffect(() => {
        if (!tokenKey) return
        formik.setFieldValue("balance", balanceSwrs[tokenKey].data)
    }, [balanceSwrs, tokenKey])

    if (!tokenKey) {
        return null
    }

    const balanceSwr = balanceSwrs[tokenKey]
    const token = staticSwr.data?.data.tokens[tokenKey]?.[chainKey]?.[network]

    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent
                side={isMobile ? "bottom" : "right"}
                className="flex flex-col justify-between gap-6"
            >
                <div>
                    <SheetHeader>
                        <SheetTitle>Transfer</SheetTitle>
                    </SheetHeader>
                    <Spacer y={6} />
                    <div>
                        <Title
                            title="Token"
                            tooltipString="Select the token you want to transfer"
                            classNames={{
                                title: "text-base",
                                tooltip: "w-4 h-4",
                            }}
                        />
                        <Spacer y={1.5} />
                        <PressableCard className="p-3" disabled={true}>
                            <div className="flex items-center gap-2">
                                <Image
                                    src={token?.imageUrl ?? ""}
                                    alt={token?.name ?? ""}
                                    className="w-10 h-10"
                                />
                                <div>
                                    <div>{token?.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {token?.symbol}
                                    </div>
                                </div>
                            </div>
                        </PressableCard>
                    </div>
                    <Spacer y={4} />
                    <div>
                        <div className="flex items-center justify-between">
                            <Title
                                title="Amount"
                                tooltipString="Enter the amount you want to transfer"
                                classNames={{
                                    title: "text-base",
                                    tooltip: "w-4 h-4",
                                }}
                            />
                            <div className="text-gray-400">{`Balance: ${balanceSwr.data}`}</div>
                        </div>
                        <Spacer y={1.5} />
                        <ExtendedNumberInput
                            className="w-full"
                            id="stringAmount"
                            value={formik.values.stringAmount}
                            onValueChange={(value: string) => {
                                formik.setFieldValue("stringAmount", value)
                            }}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                !!(formik.touched.stringAmount && formik.errors.stringAmount)
                            }
                            errorMessage={
                                (formik.touched.stringAmount && formik.errors.stringAmount) ||
                undefined
                            }
                        />
                    </div>
                    <Spacer y={4} />
                    <div>
                        <Title
                            title="Recipient"
                            tooltipString="Enter the recipient address"
                            classNames={{
                                title: "text-base",
                                tooltip: "w-4 h-4",
                            }}
                        />
                        <Spacer y={1.5} />
                        <ExtendedInput
                            className="w-full"
                            id="recipientAddress"
                            value={formik.values.recipientAddress}
                            onValueChange={(value: string) => {
                                formik.setFieldValue("recipientAddress", value)
                            }}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                !!(
                                    formik.touched.recipientAddress &&
                                formik.errors.recipientAddress
                                )
                            }
                            errorMessage={
                                (formik.touched.recipientAddress &&
                                formik.errors.recipientAddress) ||
                            undefined
                            }
                            // endContent={
                            //     <Addresses 
                            //         addresses={addresses}
                            //         onAddressClick={(address: string) => {
                            //             formik.setFieldValue("recipientAddress", address)
                            //         }}
                            //     />
                            // }
                        />
                    </div>
                </div>
                <ExtendedButton 
                    className="w-full"
                    onClick={() => formik.submitForm()}
                    size="lg"
                >
                    Transfer
                </ExtendedButton>
            </SheetContent>
        </Sheet>
    )
}
