import { AxiosOptions, Version } from "../types"
import { authAxios } from "../auth-axios"
import { AxiosResponse } from "axios"
import { EmptyObject } from "@/modules/common"
import { ToolId } from "@/modules/entities"

export interface BuyToolRequest {
  toolId: ToolId;
}

export const buyTool = (
    request: BuyToolRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, BuyToolRequest>,
    BuyToolRequest
  >(`${version}/gameplay/buy-tool`, request)
