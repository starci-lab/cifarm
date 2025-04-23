"use client"
import { GRAPHQL_QUERY_STATIC_SWR, TRANSFER_NFT_DISCLOSURE, TRANSFER_NFT_FORMIK } from "@/app/constants"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import {
    useAppSelector,
} from "@/redux"
import React, { FC } from "react"
import { 
    ExtendedButton, 
    ModalHeader, 
    Spacer,
    Title,
    ExtendedInput,
    Link,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    PressableCard,
    Image,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { AtSignIcon } from "lucide-react"
import { useGraphQLQueryStaticSwr, useTransferNFTFormik } from "@/hooks"
import { getNFTImage } from "@/app/utils"

export const TransferNFTModal: FC = () => {
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const account = accounts.find((account) => account.id === currentId)
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(TRANSFER_NFT_DISCLOSURE)
    const formik = useSingletonHook2<ReturnType<typeof useTransferNFTFormik>>(
        TRANSFER_NFT_FORMIK
    )
    const { swr: swrStatic } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )
    const collections = useAppSelector(
        (state) => state.sessionReducer.nftCollections
    )
    const collectionKey = useAppSelector(
        (state) => state.sessionReducer.collectionKey
    )
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
                    <PressableCard disabled={true}>
                        <div className="flex gap-2 items-center">
                            <Image 
                                src={(() => {
                                    if (!formik.values.nft) return ""
                                    if (!swrStatic.data?.data) return ""
                                    return getNFTImage({
                                        collectionKey,
                                        nft: formik.values.nft,
                                        collections,
                                        staticData: swrStatic.data?.data,
                                    })
                                })()}
                                className="w-12 h-12 rounded-md object-contain"
                            />
                            <div>
                                {formik.values.nft?.name}
                            </div>
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
