
export interface ExtraOffsets {
  x?: number;
  y?: number;
}

// interface for configuration of tilesets
export interface TilesetConfig {
  gid: number;
  tilesetName: string;
  scaleTextureWidth?: number;
  textureWidth?: number;
  scaleTextureHeight?: number;
  textureHeight?: number;
  extraOffsets?: ExtraOffsets;
  tileSizeWidth?: number;
  tileSizeHeight?: number;
  starsConfig?: StarsConfig; 
}

export interface StarsConfig {
  isVisible?: boolean;
  extraOffsets?: ExtraOffsets;
}

// interface for configuration of textures
export interface TextureConfig {
    key: string;
    assetUrl: string;
    useExisting?: boolean;
    isQuality?: boolean;
}