import { FormikProps, useFormik } from "formik"
import * as Yup from "yup" // Import Yup
import { useSingletonHook } from "@/modules/singleton-hook"
import { SIGN_TRANSACTION_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"
import {
    setSignTransactionModal,
    TransactionType,
    useAppDispatch,
} from "@/redux"
import { NFTData } from "@/modules/blockchain"
import { NFTType } from "@/modules/entities"

export interface TransferNFTFormikValues {
  nft?: NFTData;
  collectionKey: NFTType;
  recipientAddress: string;
}

export const useTransferNFTFormik = (): FormikProps<TransferNFTFormikValues> => {
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SIGN_TRANSACTION_DISCLOSURE
    )
    const dispatch = useAppDispatch()
    const initialValues: TransferNFTFormikValues = {
        collectionKey: NFTType.DragonFruit,
        recipientAddress: "",
    }

    // Yup validation schema
    const validationSchema = Yup.object({
        recipientAddress: Yup.string().required("Recipient address is required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema, // Pass Yup validation schema directly
        onSubmit: async ({ recipientAddress, collectionKey, nft }) => {
            if (!nft) throw new Error("NFT is required")
            // onpen the sign transaction moda
            dispatch(
                setSignTransactionModal({
                    type: TransactionType.TransferNFT,
                    data: {
                        recipientAddress,
                        collectionKey,
                        nft,
                    },
                    saveAddress: recipientAddress,
                })
            )
            open()
        },
    })

    return formik
}
