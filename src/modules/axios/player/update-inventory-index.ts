import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { EmptyObject } from "@/modules/common"

export interface UpdateInventoryIndexRequest {
    inToolbar: boolean
    index: number
    inventoryId: string
}

export const updateInventoryIndex = (
    request: UpdateInventoryIndexRequest,
    { version = Version.V1 }: AxiosOptions = {}) =>
    authAxios.post<EmptyObject, AxiosResponse<EmptyObject>, UpdateInventoryIndexRequest>(
        `${version}/gameplay/update-inventory-index`, request
    )
