import React, { FC } from "react"
import {
    ExtendedButton,
    ExtendedInput,
    Image,
    Link,
    PressableCard,
    Spacer,
    Title,
} from "@/components"
import { useSingletonHook2 } from "@/modules/singleton-hook"
import { useTransferNFTFormik } from "@/hooks"
import { TRANSFER_NFT_FORMIK } from "@/app/constants"
import { useAppSelector } from "@/redux"
import { AtSymbolIcon } from "@heroicons/react/24/outline"
export const NFT: FC = () => {
    const formik =
    useSingletonHook2<ReturnType<typeof useTransferNFTFormik>>(
        TRANSFER_NFT_FORMIK
    )
    const collectionSwrs = useAppSelector(
        (state) => state.sessionReducer.nftCollectionsSwrs
    )
    const collections = useAppSelector(
        (state) => state.sessionReducer.nftCollections
    )
    const collection = collections[formik.values.collectionKey]
    const collectionSwr = collectionSwrs[formik.values.collectionKey]
    const data = collectionSwr.data?.nfts.find(
        (nft) => nft.nftAddress === formik.values.nft?.nftAddress
    )
    if (!data) return null
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div>
                    <Title
                        classNames={{
                            title: "text-sm",
                            tooltip: "w-[14px] h-[14px]",
                        }}
                        title="Select NFT"
                        tooltipString="Select the NFT you want to transfer"
                    />
                    <Spacer y={1.5} />
                    <PressableCard>
                        <div className="flex gap-1.5">
                            <Image
                                src={data.imageUrl}
                                className="w-20 h-20 border rounded-md object-contain"
                            />
                            <div>
                                <div className="text-sm">{data.name}</div>
                                <div className="text-xs text-muted-foreground">
                                    {collection.name}
                                </div>
                            </div>
                        </div>
                    </PressableCard>
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
                                <AtSymbolIcon className="w-5 h-5" />
                            </Link>
                        }
                    />
                </div>
            </div>
            <Spacer y={6} />
            <ExtendedButton 
                onClick={() => formik.submitForm()}
                size="lg"
            >
                Transfer
            </ExtendedButton>
        </div>
    )
}
