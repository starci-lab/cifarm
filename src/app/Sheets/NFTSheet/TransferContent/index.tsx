import { TRANSFER_NFT_FORMIK } from "@/app/constants"
import {
    DialogFooter,
    ExtendedButton,
    ExtendedInput,
    PressableCard,
    Spacer,
    Title,
    Image,
    SheetTitle,
    SheetHeader,
} from "@/components"
import { useTransferNFTFormik } from "@/hooks"
import { useSingletonHook2 } from "@/modules/singleton-hook"
import { NFTSheetPage, setNFTSheetPage, useAppDispatch } from "@/redux"
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
                <Spacer y={6} />
                <div>
                    <PressableCard disabled={true}>
                        <div className="flex gap-2 items-center">
                            <Image
                                src={nft?.image || ""}
                                className="w-12 h-12 rounded-md object-contain"
                            />
                            <div>{formik.values.nft?.name}</div>
                        </div>
                    </PressableCard>
                    <Spacer y={6} />
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
                        />
                    </div>
                    <Spacer y={6} />
                </div>
            </div>
            <DialogFooter>
                <ExtendedButton
                    disabled={!formik.isValid}
                    isLoading={formik.isSubmitting}
                    className="w-full"
                    onClick={() => formik.submitForm()}
                    size="lg"
                >
          Transfer
                </ExtendedButton>
            </DialogFooter>
        </>
    )
}
