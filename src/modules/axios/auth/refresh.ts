import { AxiosResponse } from "axios"
import { noAuthAxios } from "../no-auth-axios"
import { AxiosOptions } from "../types"
import { Version } from "../types"

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const refresh = (
    request: RefreshRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    noAuthAxios.post<
    RefreshResponse,
    AxiosResponse<RefreshResponse, RefreshRequest>,
    RefreshRequest
  >(`${version}/gameplay/refresh`, request)