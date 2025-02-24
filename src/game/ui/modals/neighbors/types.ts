import { BaseAssetKey } from "@/game/assets"

export interface NeighborsTabData {
    iconKey: BaseAssetKey,
    text: string,
}

export interface GetPageResult {
    currentPage: number;
    maxPage: number;
}
  