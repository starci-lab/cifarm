import { TRANSFER_TOKEN_FORMIK } from "@/singleton"
import {
    ExtendedButton,
    ExtendedInput,
    Spacer,
    Title,
    Image,
    SheetTitle,
    SheetHeader,
    ExtendedNumberInput,
    SheetBody,
    Card,
    CardBody,
    SheetFooter,
} from "@/components"
import { envConfig } from "@/env"
import { useTransferTokenFormik } from "@/singleton"
import { useSingletonHook2 } from "@/singleton"
import { useAppSelector, setTokenSheetPage, TokenSheetPage, useAppDispatch } from "@/redux"
import React, { FC, useEffect } from "react"

export const TransferContent: FC = () => {
    const tokenKey = useAppSelector(
        (state) => state.sheetsReducer.tokenSheet.tokenKey
    )
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = envConfig().network

    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const formik = useSingletonHook2<ReturnType<typeof useTransferTokenFormik>>(
        TRANSFER_TOKEN_FORMIK
    )

    useEffect(() => {
        if (!tokenKey) {
            return
        }
        // const balanceSwr = blockchainBalancesSwr.data?.data.blockchainBalances.tokens.find((token) => token.tokenKey === tokenKey)
        // formik.setFieldValue("balance", balanceSwr?.balance)
    }, [staticData])

    const dispatch = useAppDispatch()

    if (!tokenKey) {
        return null
    }

    // const balanceSwr = blockchainBalancesSwr.data?.data.blockchainBalances.tokens.find((token) => token.tokenKey === tokenKey)
    const token = staticData?.tokens[tokenKey]?.[chainKey]?.[network]

    if (!token) {
        return null
    }

    return (
        <>
            <div>
                <SheetHeader>
                    <SheetTitle showLeftChevron onLeftChevronClick={() => {
                        formik.resetForm()
                        dispatch(setTokenSheetPage(TokenSheetPage.Main))
                    }}>Transfer</SheetTitle>
                </SheetHeader>
                <SheetBody>
                    <Title
                        title="Token"
                        tooltipString="Select the token you want to transfer"
                        classNames={{
                            title: "text-base",
                            tooltip: "w-4 h-4",
                        }}
                    />
                    <Spacer y={1.5} />
                    <Card disabled={true} pressable className="w-full">
                        <CardBody className="flex items-center gap-2">
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
                        </CardBody>
                    </Card>
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
                            <div className="text-muted-foreground">{`Balance: ${formik.values.balance}`}</div>
                        </div>
                        <Spacer y={2} />
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
                        <Spacer y={2} />
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
                        />
                    </div>
                </SheetBody>
            </div>
            <Spacer y={6} />
            <SheetFooter>
                <ExtendedButton 
                    className="w-full"
                    disabled={!formik.isValid}
                    isLoading={formik.isSubmitting}
                    onClick={() => formik.submitForm()}
                >
                    Transfer
                </ExtendedButton>
            </SheetFooter>
        </>
    )
}
