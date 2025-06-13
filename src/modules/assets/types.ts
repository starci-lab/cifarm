export interface AssetData {
    assetKey: string
    assetUrl: string
}

export interface SpineData {
    assetKey: string
    assetUrl: string
}

export interface AtlasData  {
    assetKey: string;
    assetUrl: string;
    textureUrl: string;
    version?: number;
  }
  
export interface JsonData {
    assetKey: string;
    assetUrl: string;
    version?: number;
}

export interface FontData {
    assetKey: string;
    assetUrl: string;
    version?: number;
}

export interface MusicData {
    assetKey: string;
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

export interface BubbleStateConfig {
    extraOffsets?: { x: number; y: number };
}

export interface AnimatedItemConfig {
    extraOffsets?: { x: number; y: number };
}

export interface SelectedConfig {
    extraOffsets?: { x: number; y: number };
}

export enum Direction {
    Horizontal = "horizontal",
    Vertical = "vertical",
}