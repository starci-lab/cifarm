import { GRAPHQL_QUERY_STATIC_SWR, TRANSFER_TOKEN_FORMIK } from "@/app/constants"
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
import { useGraphQLQueryStaticSwr, useTransferTokenFormik } from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import { useAppSelector, setTokenSheetPage, TokenSheetPage, useAppDispatch } from "@/redux"
import React, { FC, useEffect } from "react"

export const TransferContent: FC = () => {
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

    useEffect(() => {
        if (!tokenKey) {
            return
        }
        const balanceSwr = balanceSwrs[tokenKey]
        formik.setFieldValue("balance", balanceSwr.data)
    }, [balanceSwrs])

    const dispatch = useAppDispatch()

    if (!tokenKey) {
        return null
    }

    const balanceSwr = balanceSwrs[tokenKey]
    const token = staticSwr.data?.data.tokens[tokenKey]?.[chainKey]?.[network]

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
                            <div className="text-muted-foreground">{`Balance: ${balanceSwr.data}`}</div>
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
