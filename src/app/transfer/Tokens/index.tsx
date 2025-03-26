"use client"
import React, { FC, useEffect } from "react"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import {
    Spacer,
    Title,
    Image,
    EnhancedNumberInput,
    EnhancedInput,
    Link,
    EnhancedButton,
} from "@/components"
import { setSelectTokenModal, useAppDispatch, useAppSelector } from "@/redux"
import {
    SELECT_TOKEN_DISCLOSURE,
    TRANSFER_TOKEN_FORMIK,
} from "@/app/constants"
import { valuesWithKey } from "@/modules/common"
import { useTransferTokenFormik } from "@/hooks"
import { useDisclosure } from "@/hooks"
import { AtSymbolIcon } from "@heroicons/react/24/outline"

export const Tokens: FC = () => {
    const balances = useAppSelector((state) => state.sessionReducer.balances)

    const formik = useSingletonHook2<ReturnType<typeof useTransferTokenFormik>>(
        TRANSFER_TOKEN_FORMIK
    )
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const tokensArray = valuesWithKey(tokens)
    const selectedTokenKey = formik.values.tokenKey || tokensArray[0].key
    const balanceSwr = balances[selectedTokenKey]
    const { onOpenChange } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SELECT_TOKEN_DISCLOSURE
    )

    useEffect(() => {
        if (balanceSwr.data) {
            formik.setFieldValue("balance", balanceSwr.data)
        }
    }, [balanceSwr.data])

    const dispatch = useAppDispatch()
    return (
        <div
            className="flex flex-col justify-between h-full"
        >
            <div>
                <div>
                    <Title
                        title="Token"
                        tooltipString="Select the token you want to transfer"
                        classNames={{
                            title: "text-sm",
                            tooltip: "w-[14px] h-[14px]",
                        }}
                    />
                    <Spacer y={1.5} />
                    <EnhancedButton 
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                            dispatch(
                                setSelectTokenModal({
                                    tokenKey: selectedTokenKey,
                                    callback: (tokenKey) => {
                                        formik.setFieldValue("tokenKey", tokenKey)
                                    },
                                })
                            )
                            onOpenChange(true)
                        }}
                    >
                        <Image
                            src={tokens[selectedTokenKey].imageUrl}
                            className="w-5 h-5"
                        />
                        {tokens[selectedTokenKey].name}
                    </EnhancedButton>
                </div>
                <Spacer y={4} />
                <div>
                    <div className="flex items-center justify-between">
                        <Title
                            title="Amount"
                            tooltipString="Enter the amount you want to transfer"
                            classNames={{
                                title: "text-sm",
                                tooltip: "w-[14px] h-[14px]",
                            }}
                        />
                        <div className="text-sm text-gray-400">{`Balance: ${balanceSwr.data}`}</div>
                    </div>
                    <Spacer y={1.5} />
                    <EnhancedNumberInput
                        className="w-full"
                        id="stringAmount"
                        value={formik.values.stringAmount}
                        onValueChange={(value) => {
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
                            title: "text-sm",
                            tooltip: "w-[14px] h-[14px]",
                        }}
                    />
                    <Spacer y={1.5} />
                    <EnhancedInput
                        className="w-full"
                        id="recipientAddress"
                        value={formik.values.recipientAddress}
                        onValueChange={(value) => {
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
                        endContent={
                            <Link>
                                <AtSymbolIcon className="w-5 h-5" />
                            </Link>
                        }
                    />
                </div>
                <Spacer y={6} />
            </div>
            <EnhancedButton 
                onClick={() => formik.submitForm()}
                size="lg"
            >
                Transfer
            </EnhancedButton>
        </div>
    )
}
