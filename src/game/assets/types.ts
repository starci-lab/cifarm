export interface ExtraOffsets {
  x?: number;
  y?: number;
}

export interface ModalScale {
  scaleX?: number;
  scaleY?: number;
}

export interface AtlasConfig {
  key: string;
  assetUrl: string;
  textureUrl: string;
  version?: number;
}

export interface JsonConfig {
  key: string;
  assetUrl: string;
  version?: number;
}

export interface AtlasTextureConfig {
  name: string;
  assetUrl: string;
  version?: number;
}

export interface SpineConfig {
  atlas: AtlasConfig;
  json: JsonConfig;
  extraOffsets?: ExtraOffsets;
  scaleWidth?: number;
  scaleHeight?: number;
  packageId?: number;
  useExisting?: boolean;
}

// interface for configuration of textures
export interface TextureConfig {
  key: string;
  assetUrl?: string;  
  useExisting?: boolean;
  isQuality?: boolean;
  extraOffsets?: ExtraOffsets;
  scaleWidth?: number;
  scaleHeight?: number;
  packageId?: number;
  version?: number;
  // 0 is default, load from first join game
  // 1,2,3 is the package id, which is triggered when download package
}

export enum MainVisualType {
  Sprite = "sprite",
  Spine = "spine",
}

export interface MapAssetData {
  spineConfig?: SpineConfig;
  textureConfig?: TextureConfig;
  mainVisualType?: MainVisualType;
  modalScale?: ModalScale;

}

export interface ShopAssetData {
  textureConfig: TextureConfig;
}

export interface BaseData {
  textureConfig: TextureConfig;
}

export interface ItemData {
  textureConfig: TextureConfig;
}


