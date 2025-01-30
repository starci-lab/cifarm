import { AxiosResponse } from "axios"
import { noAuthAxios } from "../no-auth-axios"
import { AxiosOptions } from "../types"
import { ChainKey, Network } from "@/modules/blockchain"
import { Version } from "../types"

export interface VerifySignatureRequest {
  message: string;
  publicKey: string;
  signature: string;
  chainKey?: ChainKey;
  network?: Network;
  accountAddress?: string;
}

export interface VerifySignatureResponse {
  accessToken: string;
  refreshToken: string;
}

export const verifySignature = (
    request: VerifySignatureRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    noAuthAxios.post<
    VerifySignatureResponse,
    AxiosResponse<VerifySignatureResponse, VerifySignatureRequest>,
    VerifySignatureRequest
  >(`${version}/gameplay/verify-signature`, request)
