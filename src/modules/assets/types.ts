export interface AssetData {
    assetKey: string
    assetUrl: string
}

export interface SpineData {
    assetKey: string
    assetUrl: string
}

export interface AtlasData  {
    key: string;
    assetUrl: string;
    textureUrl: string;
    version?: number;
  }
  
export interface JsonData {
    key: string;
    assetUrl: string;
    version?: number;
}

export interface ExtraOffsets {
    x?: number;
    y?: number;
}

export interface Metadata {
    name: string
    description: string
}

export interface PhaserData {
    extraOffsets?: ExtraOffsets;
    packageId?: number;
    version?: number;
    useExisting?: boolean;
}

export interface AssetTextureData extends AssetData, PhaserData {
}

export interface AssetSpineData extends PhaserData {
    atlas: AtlasData
    json: JsonData
}

export enum AssetMapType {
    Texture = "texture",
    Spine = "spine",
}

export interface AssetMapData {
    type: AssetMapType;
    texture?: AssetTextureData;
    spine?: AssetSpineData;
}