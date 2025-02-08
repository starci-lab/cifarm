import { Position, TileId } from "@/modules/entities"
import { AxiosOptions, Version } from "../types"
import { authAxios } from "../auth-axios"
import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"

export interface BuyTileRequest {
  position: Position;
  tileId: TileId;
}

export const buyTile = (
    request: BuyTileRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, BuyTileRequest>,
    BuyTileRequest
  >(`${version}/gameplay/buy-tile`, request)
