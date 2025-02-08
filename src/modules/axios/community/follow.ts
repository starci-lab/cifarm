import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface FollowRequest {
    followeeUserId: string
}

export const follow = (
    request: FollowRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, FollowRequest>,
    FollowRequest
  >(`${version}/gameplay/follow`, request)