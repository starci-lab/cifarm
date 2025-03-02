import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { EmptyObject } from "@/modules/common"

export interface UpdateReferralRequest {
    referralUserId: string
}

export const updateReferral = (
    request: UpdateReferralRequest,
    { version = Version.V1 }: AxiosOptions = {}) =>
    authAxios.post<EmptyObject, AxiosResponse<EmptyObject>, UpdateReferralRequest>(
        `${version}/gameplay/update-referral`,
        request
    )
