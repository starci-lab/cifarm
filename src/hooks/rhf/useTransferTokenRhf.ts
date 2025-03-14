import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z, ZodType } from "zod"

export interface TransferTokenRhfInputs {
    stringAmount: string;
    tokenAddress: string;
    recipientAddress: string;
}

const Schema: ZodType<TransferTokenRhfInputs> = z.object({
    stringAmount: z.string().min(1, "Amount is required"),
    tokenAddress: z.string(). min(1, "Token address is required"),
    recipientAddress: z.string().min(1, "Recipient address is required"),
})

export const useTransferTokensRhf = () => {
    const form = useForm<TransferTokenRhfInputs>({
        resolver: zodResolver(Schema), 
    })

    const onSubmit: SubmitHandler<TransferTokenRhfInputs> = async (inputs) => {
        // check if transaction is exist
        console.log(inputs) 
    }

    return {
        form,
        onSubmit,
    }
}
