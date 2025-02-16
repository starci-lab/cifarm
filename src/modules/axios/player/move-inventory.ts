import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { EmptyObject } from "@/modules/common"

export interface MoveInventoryRequest {
    isTool: boolean
    index: number
    inventoryId: string
}

export const moveInventory = (
    request: MoveInventoryRequest,
    { version = Version.V1 }: AxiosOptions = {}) =>
    authAxios.post<EmptyObject, AxiosResponse<EmptyObject>, MoveInventoryRequest>(
        `${version}/gameplay/move-inventory`, request
    )
