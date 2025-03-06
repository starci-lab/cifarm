import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"
import { TxResponse } from "@/modules/honeycomb"

export interface MintOffchainTokensRequest {
    amount: number
}

export type MintOffchainTokensResponse = TxResponse

export const mintOffchainTokens = (
    request: MintOffchainTokensRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    MintOffchainTokensResponse,
    AxiosResponse<MintOffchainTokensResponse, MintOffchainTokensRequest>,
    MintOffchainTokensRequest
  >(`${version}/gameplay/mint-offchain-tokens`, request)