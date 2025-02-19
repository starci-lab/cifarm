import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface UnfollowRequest {
    followeeUserId: string
}

export const unfollow = (
    request: UnfollowRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, UnfollowRequest>,
    UnfollowRequest
  >(`${version}/gameplay/unfollow`, request)