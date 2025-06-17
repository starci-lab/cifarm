"use client"
import {
    PURCHASE_NFT_BOXES_FORMIK,
    PURCHASE_NFT_BOXES_MODAL_DISCLOSURE,
} from "@/singleton"
import { useSingletonHook, useSingletonHook2 } from "@/singleton"
import React, { FC, useEffect } from "react"
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { ExtendedButton, Image, Slider, Spacer, Title } from "@/components"
import { AssetIconId } from "@/modules/assets"
import { assetIconMap } from "@/modules/assets"
import { usePurchaseNFTBoxesFormik } from "@/singleton"
import { useAppSelector } from "@/redux/hooks"
import { TokenKey } from "@/types"

export const PurchaseNFTBoxesModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        PURCHASE_NFT_BOXES_MODAL_DISCLOSURE
    )
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const formik = useSingletonHook2<
    ReturnType<typeof usePurchaseNFTBoxesFormik>
  >(PURCHASE_NFT_BOXES_FORMIK)

    const balanceSwr = useAppSelector(
        (state) =>
            state.swrsReducer.balanceSwrs[
                staticData?.nftBoxInfo.tokenKey ?? TokenKey.Native
            ]
    )
    const balance = balanceSwr?.data?.balance.balance ?? 0

    useEffect(() => {
        formik.setFieldValue("balance", balance)
    }, [balance])

    useEffect(() => {
        if (staticData) {
            formik.setFieldValue("price", staticData.nftBoxInfo.boxPrice)
        }
    }, [staticData])

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Purchase NFT Boxes</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div>
                        <div className="flex items-center justify-between">
                            <Title
                                title="Quantity"
                                tooltipString="This is the quantity of NFT boxes you are purchasing."
                            />
                            <div>{formik.values.quantity}</div>
                        </div>
                        <Spacer y={2} />
                        <Slider
                            value={[formik.values.quantity]}
                            min={1}
                            onValueChange={(value) =>
                                formik.setFieldValue("quantity", value[0])
                            }
                        />
                    </div>
                    <Spacer y={4} />
                    <div className="flex items-center justify-between">
                        <Title
                            title="Estimated price"
                            tooltipString="This is the estimated price of the NFT boxes you are purchasing."
                        />
                        <div className="text-muted-foreground">Balance: {balance}</div>
                    </div>
                    <Spacer y={2} />
                    <div className="text-4xl font-bold flex items-center gap-2">
                        <Image
                            src={assetIconMap[AssetIconId.USDC].base.assetUrl}
                            alt="USDC"
                            className="w-10 h-10"
                        />
                        {(staticData?.nftBoxInfo.boxPrice ?? 0) * formik.values.quantity}
                    </div>
                    {!formik.isValid && (
                        <>
                            <Spacer y={4} />
                            <div className="text-destructive text-sm">
                                {formik.errors.quantity}
                            </div>
                        </>
                    )}
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        disabled={!formik.isValid}
                        isLoading={formik.isSubmitting}
                        className="w-full"
                        onClick={async () => {
                            await formik.submitForm()
                        }}
                    >
            Purchase
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
