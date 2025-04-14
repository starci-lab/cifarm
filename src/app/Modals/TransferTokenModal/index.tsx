"use client"
import { TRANSFER_TOKEN_DISCLOSURE, TRANSFER_TOKEN_FORMIK } from "@/app/constants"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import {
    useAppSelector,
} from "@/redux"
import React, { FC, useEffect } from "react"
import { 
    ExtendedButton, 
    ModalHeader, 
    Spacer,
    Title,
    ExtendedNumberInput,
    ExtendedInput,
    Link,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Image,
    DialogFooter,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { AtSignIcon } from "lucide-react"
import { useTransferTokenFormik } from "@/hooks"
import { DefaultToken } from "@/modules/blockchain"

export const TransferTokenModal: FC = () => {
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const account = accounts.find((account) => account.id === currentId)
    const { tokenKey } = useAppSelector((state) => state.modalReducer.tokenModal)
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(TRANSFER_TOKEN_DISCLOSURE)
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const formik = useSingletonHook2<ReturnType<typeof useTransferTokenFormik>>(
        TRANSFER_TOKEN_FORMIK
    )
    const balanceSwrs = useAppSelector(
        (state) => state.sessionReducer.balanceSwrs
    )
    const balanceSwr = balanceSwrs[tokenKey ?? DefaultToken.Native]

    useEffect(() => {
        if (balanceSwr.data) {
            formik.setFieldValue("balance", balanceSwr.data)
        }
    }, [balanceSwr.data])

    if (!account) {
        return null
    }
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Transfer" />
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <ExtendedButton 
                        disabled={true}
                        variant="outline"
                        className="w-full justify-start"
                    >
                        <Image
                            src={tokens[tokenKey ?? DefaultToken.Native].imageUrl}
                            alt={tokens[tokenKey ?? DefaultToken.Native].name}
                            width={20}
                            height={20}
                            className="w-5 h-5"
                        />
                        {tokens[tokenKey ?? DefaultToken.Native].name}
                    </ExtendedButton>
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
                                title: "text-sm",
                                tooltip: "w-[14px] h-[14px]",
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
                            endContent={
                                <Link>
                                    <AtSignIcon className="w-5 h-5" />
                                </Link>
                            }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <ExtendedButton 
                        className="w-full"
                        onClick={() => formik.submitForm()}
                        size="lg"
                    >
                    Transfer
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
