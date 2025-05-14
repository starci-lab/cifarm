import React, { FC } from "react"
import {
    ExtendedButton,
    ExtendedInput,
    Link,
    Spacer,
    Title,
} from "@/components"
import { TRANSFER_NFT_FORMIK } from "@/app/constants"
import { useTransferNFTFormik } from "@/hooks"
import { useSingletonHook2 } from "@/modules/singleton-hook"
import { NFTSection } from "./NFTSection"
import { At } from "@phosphor-icons/react"

export const NFT: FC = () => {
    const formik =
    useSingletonHook2<ReturnType<typeof useTransferNFTFormik>>(
        TRANSFER_NFT_FORMIK
    ) 
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <NFTSection />
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
                                <At className="w-5 h-5" />
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
