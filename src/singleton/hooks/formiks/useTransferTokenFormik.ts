import { FormikProps, useFormik } from "formik"
import * as Yup from "yup" // Import Yup
import { useSingletonHook } from "../../core"
import { SIGN_TRANSACTION_MODAL_DISCLOSURE } from "../../keys"
import { useDisclosure } from "react-use-disclosure"
import {
    setSignTransactionModalContent,
    TransactionType,
    useAppDispatch,
} from "@/redux"
import { TokenKey } from "@/types"

export interface TransferFormikValues {
    recipientAddress: string
    stringAmount: string
    tokenKey?: TokenKey
    balance: number
}

export const useTransferTokenFormik = (): FormikProps<TransferFormikValues> => {
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SIGN_TRANSACTION_MODAL_DISCLOSURE
    )
    const dispatch = useAppDispatch()
    const initialValues: TransferFormikValues = {
        stringAmount: "",
        recipientAddress: "",
        balance: 0,
    }

    // Yup validation schema
    const validationSchema = Yup.object({
        stringAmount: Yup.string()
            .required("Amount is required")
            .test(
                "greater-than-zero",
                "Amount must be greater than 0",
                function (value) {
                    return Number.parseFloat(value) > 0
                }
            )
            .test("is-less-than-balance", "Insufficient balance", function (value) {
                const { balance } = this.parent // Access other values (balance in this case)
                return Number.parseFloat(value) <= balance // Check if amount is less than or equal to balance
            }),
        recipientAddress: Yup.string().required("Recipient address is required"),
        balance: Yup.number().min(0, "Balance cannot be negative"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema, // Pass Yup validation schema directly
        onSubmit: async ({ recipientAddress, stringAmount, tokenKey }) => {
            // onpen the sign transaction moda
            dispatch(
                setSignTransactionModalContent({
                    type: TransactionType.TransferToken,
                    data: {
                        recipientAddress,
                        amount: Number.parseFloat(stringAmount),
                        tokenKey: tokenKey || TokenKey.Native,
                    },
                    saveAddress: recipientAddress,
                })
            )
            open()
        },
    })

    return formik
}
