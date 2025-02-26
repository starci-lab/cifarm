import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"
import { TxResponse } from "@/modules/honeycomb"

export type ClaimHoneycombDailyRewardResponse = TxResponse

export const claimHoneycombDailyReward = (
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    ClaimHoneycombDailyRewardResponse,
    AxiosResponse<ClaimHoneycombDailyRewardResponse, EmptyObject>,
    EmptyObject
  >(`${version}/gameplay/claim-honeycomb-daily-reward`)