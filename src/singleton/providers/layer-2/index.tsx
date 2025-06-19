import React, { PropsWithChildren } from "react"
import {
    useTransferNFTSwrMutation,
    useTransferTokenFormik,
    useTransferTokenSwrMutation,
    useTransferNFTFormik,
    usePurchaseNFTBoxesFormik,
    useEditDisplayInformationFormik,
} from "../../hooks"
import { BaseSingletonHook2Provider } from "../../core"
import { TRANSFER_TOKEN_FORMIK, TRANSFER_NFT_FORMIK, TRANSFER_TOKEN_SWR_MUTATION, TRANSFER_NFT_SWR_MUTATION, PURCHASE_NFT_BOXES_FORMIK, EDIT_DISPLAY_INFORMATION_FORMIK } from "../../keys"

// layer 2 can use layer 1 hooks
export const SingletonHook2Provider = ({ children }: PropsWithChildren) => (
    <BaseSingletonHook2Provider
        hooks={{
            [TRANSFER_TOKEN_FORMIK]: useTransferTokenFormik(),
            // IMPORT_ACCOUNT_FORMIK: useImportAccountFormik(),
            [TRANSFER_NFT_FORMIK]: useTransferNFTFormik(),
            [TRANSFER_TOKEN_SWR_MUTATION]: useTransferTokenSwrMutation(),
            // transfer token
            [TRANSFER_NFT_SWR_MUTATION]: useTransferNFTSwrMutation(),
            [PURCHASE_NFT_BOXES_FORMIK]: usePurchaseNFTBoxesFormik(),
            [EDIT_DISPLAY_INFORMATION_FORMIK]: useEditDisplayInformationFormik(),
        }}
    >
        {children}
    </BaseSingletonHook2Provider>
)
