"use client"
import React, { FC, useEffect } from "react"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import {
    Spacer,
    Title,
    Image,
    ExtendedNumberInput,
    ExtendedInput,
    Link,
    ExtendedButton,
} from "@/components"
import { setSelectTokenModal, useAppDispatch, useAppSelector } from "@/redux"
import {
    SELECT_TOKEN_DISCLOSURE,
    TRANSFER_TOKEN_FORMIK,
} from "@/app/constants"
import { valuesWithKey } from "@/modules/common"
import { useTransferTokenFormik } from "@/hooks"
import { useDisclosure } from "react-use-disclosure"
import { AtSignIcon } from "lucide-react"

export const Token: FC = () => {
    const balanceSwrs = useAppSelector((state) => state.sessionReducer.balanceSwrs)

    const formik = useSingletonHook2<ReturnType<typeof useTransferTokenFormik>>(
        TRANSFER_TOKEN_FORMIK
    )
    // const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    // const tokensArray = valuesWithKey(tokens)
    // const selectedTokenKey = formik.values.tokenKey || tokensArray[0].key
    // const balanceSwr = balanceSwrs[selectedTokenKey]
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SELECT_TOKEN_DISCLOSURE
    )

    // useEffect(() => {
    //     if (balanceSwr.data) {
    //         formik.setFieldValue("balance", balanceSwr.data)
    //     }
    // }, [balanceSwr.data])

    // const dispatch = useAppDispatch()
    return (
        <div
            className="flex flex-col justify-between h-full"
        >
            {/* <div>
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
                    <ExtendedButton 
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
                            open()
                        }}
                    >
                        <Image
                            src={tokens[selectedTokenKey].imageUrl}
                            className="w-5 h-5"
                        />
                        {tokens[selectedTokenKey].name}
                    </ExtendedButton>
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
                    <ExtendedNumberInput
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
                    <ExtendedInput
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
                                <AtSignIcon className="w-5 h-5" />
                            </Link>
                        }
                    />
                </div>
                <Spacer y={6} />
            </div> */}
            <ExtendedButton 
                onClick={() => formik.submitForm()}
                size="lg"
            >
                Transfer
            </ExtendedButton>
        </div>
    )
}
