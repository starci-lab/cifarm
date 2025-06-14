"use client"
import { GRAPHQL_QUERY_STATIC_SWR, PURCHASE_NFT_BOXES_DISCLOSURE, PURCHASE_NFT_BOXES_FORMIK } from "@/app/(core)/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
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
import { usePurchaseNFTBoxesFormik } from "@/hooks"
import { useAppSelector } from "@/redux/hooks"
import { TokenKey } from "@/modules/entities"

export const PurchaseNFTBoxesModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(PURCHASE_NFT_BOXES_DISCLOSURE)
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(GRAPHQL_QUERY_STATIC_SWR)
    const formik = useSingletonHook2<ReturnType<typeof usePurchaseNFTBoxesFormik>>(PURCHASE_NFT_BOXES_FORMIK)
    
    const balanceSwrs = useAppSelector((state) => state.sessionReducer.balanceSwrs)
    
    const balance = balanceSwrs[staticSwr.data?.data.nftBoxInfo.tokenKey ?? TokenKey.Native]?.data?.balance.balance ?? 0
    
    useEffect(() => {
        formik.setFieldValue("balance", balance)
    }, [balance])
    
    useEffect(() => {
        if (staticSwr.data) {
            formik.setFieldValue("price", staticSwr.data.data.nftBoxInfo.boxPrice)
        }
    }, [staticSwr.data])

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Purchase NFT Boxes
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div>
                        <div className="flex items-center justify-between">
                            <Title title="Quantity" tooltipString="This is the quantity of NFT boxes you are purchasing." />
                            <div>{formik.values.quantity}</div>
                        </div>
                        <Spacer y={2} />
                        <Slider value={[formik.values.quantity]} min={1} onValueChange={(value) => formik.setFieldValue("quantity", value[0])} />
                    </div>
                    <Spacer y={4}/>
                    <div className="flex items-center justify-between">
                        <Title title="Estimated price" tooltipString="This is the estimated price of the NFT boxes you are purchasing." />
                        <div className="text-muted-foreground">
                            Balance: {balance}
                        </div>
                    </div>
                    <Spacer y={2} />
                    <div className="text-4xl font-bold flex items-center gap-2">
                        <Image src={assetIconMap[AssetIconId.USDC].base.assetUrl} alt="USDC" className="w-10 h-10" />
                        {(staticSwr.data?.data.nftBoxInfo.boxPrice ?? 0) * formik.values.quantity}
                    </div>
                    {
                        !formik.isValid && (
                            <>
                                <Spacer y={4}/>
                                <div className="text-destructive text-sm">
                                    {formik.errors.quantity}
                                </div>
                            </>
                        )
                    }
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton disabled={!formik.isValid} isLoading={formik.isSubmitting} className="w-full" onClick={async () => {
                        await formik.submitForm()
                    }}>
                        Purchase
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
