import { toast } from "../useToast"

const DURATION = 1000 // 1s

export interface AddSuccessToastParams {
  successMessage: string;
}

export const addSuccessToast = ({ successMessage }: AddSuccessToastParams) =>
    toast({
        duration: DURATION,
        description: successMessage,
    })
