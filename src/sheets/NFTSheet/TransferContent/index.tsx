import { TRANSFER_NFT_FORMIK } from "@/singleton"
import {
    ExtendedButton,
    ExtendedInput,
    Spacer,
    Title,
    Image,
    SheetTitle,
    SheetHeader,
    CardBody,
    Card,
    SheetBody,
    SheetFooter,
} from "@/components"
import { useTransferNFTFormik } from "@/singleton"
import { useSingletonHook2 } from "@/singleton"
import { NFTSheetPage, setNFTSheetPage, useAppDispatch } from "@/redux"
import { At } from "@phosphor-icons/react"
import React, { FC } from "react"

export const TransferContent: FC = () => {
    const formik =
    useSingletonHook2<ReturnType<typeof useTransferNFTFormik>>(
        TRANSFER_NFT_FORMIK
    )
    const nft = formik.values.nft
    const dispatch = useAppDispatch()
    return (
        <>
            <div>
                <SheetHeader>
                    <SheetTitle
                        showLeftChevron
                        onLeftChevronClick={() => {
                            formik.resetForm()
                            dispatch(setNFTSheetPage(NFTSheetPage.Main))
                        }}
                    >
          Transfer
                    </SheetTitle>
                </SheetHeader>
                <SheetBody>
                    <Card disabled={true} pressable className="w-full">
                        <CardBody className="flex items-center gap-2">
                            <Image
                                src={nft?.imageUrl || ""}
                                className="w-12 h-12 rounded-md object-contain"
                            />
                            <div>{formik.values.nft?.name}</div>
                        </CardBody>
                    </Card>
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
                            endContent={
                                <At className="text-secondary"/>
                            }
                        />
                    </div>
                </SheetBody>
            </div>
            <SheetFooter>
                <ExtendedButton
                    disabled={!formik.isValid}
                    isLoading={formik.isSubmitting}
                    className="w-full"
                    color="primary"
                    onClick={() => formik.submitForm()}
                >
          Transfer
                </ExtendedButton>
            </SheetFooter>
        </>
    )
}
