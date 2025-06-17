import { toast } from "../useToast"
import { truncateString } from "@/utils"

const DURATION = 3000 // 3s

export interface AddErrorToastParams {
  errorMessage: string;
}

export const addErrorToast = ({ errorMessage }: AddErrorToastParams) =>
    toast({
        duration: DURATION,
        description: truncateString(errorMessage, 400, 0),
        variant: "destructive",
    })
