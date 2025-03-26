import { FormikProps, useFormik } from "formik"
import * as Yup from "yup" // Import Yup
import { useSingletonHook } from "@/modules/singleton-hook"
import { SIGN_TRANSACTION_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "@/hooks"
import {
    setSignTransactionModal,
    TransactionType,
    useAppDispatch,
} from "@/redux"
import { DefaultToken } from "@/modules/blockchain"
export interface TransferFormikValues {
  recipientAddress: string;
  stringAmount: string;
  tokenKey?: string;
  balance: number;
}

export const useTransferTokenFormik = (): FormikProps<TransferFormikValues> => {
    const { onOpenChange } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SIGN_TRANSACTION_DISCLOSURE
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
                setSignTransactionModal({
                    type: TransactionType.TransferToken,
                    data: {
                        recipientAddress,
                        amount: Number.parseFloat(stringAmount),
                        tokenKey: tokenKey || DefaultToken.Native,
                    },
                })
            )
            onOpenChange(true)
        },
    })

    return formik
}
