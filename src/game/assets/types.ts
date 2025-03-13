
export interface ExtraOffsets {
  x?: number;
  y?: number;
}

export interface AtlasConfig {
  key: string;
  assetUrl: string;
}

export interface JsonConfig {
  key: string;
  assetUrl: string;
}

export interface SpineConfig {
  atlas: AtlasConfig;
  json: JsonConfig;
}

// interface for configuration of tilesets
export interface TilesetConfig {
  gid?: number;
  tilesetName?: string;
  scaleTextureWidth?: number;
  textureWidth?: number;
  scaleTextureHeight?: number;
  textureHeight?: number;
  extraOffsets?: ExtraOffsets;
  starsConfig?: StarsConfig; 
}

export interface StarsConfig {
  extraOffsets?: ExtraOffsets;
}

// interface for configuration of textures
export interface TextureConfig {
    key: string;
    assetUrl?: string;
    useExisting?: boolean;
    isQuality?: boolean;
    spineConfig?: SpineConfig;
}

export interface ShopAssetData {
  textureConfig: TextureConfig;
}