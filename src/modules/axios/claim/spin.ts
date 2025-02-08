import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface SpinResponse {
    spinSlotId: string
}

export const spin = (
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    SpinResponse,
    AxiosResponse<SpinResponse, EmptyObject>,
    EmptyObject
  >(`${version}/gameplay/spin`)