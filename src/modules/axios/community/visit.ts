import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface VisitRequest {
    neighborUserId?: string
}

export const visit = (
    request: VisitRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, VisitRequest>,
    VisitRequest
  >(`${version}/gameplay/visit`, request)