// Asset Enum for Base assets
export enum BaseAssetKey {
    Background = "background",
    Logo = "logo",
    LoadingBar = "loading-bar",
    LoadingFill = "loading-fill",
    Grass = "grass",

    // Icons
    IconShop = "icon-shop",
    IconRoadsideStand = "icon-roadside-stand",
    IconNFTMarketplace = "icon-nft-marketplace",
    IconNeighbors = "icon-neighbors",
}

// Updated baseAssetMap with BaseAssetKey enum values
export const baseAssetMap: Record<BaseAssetKey, string> = {
    [BaseAssetKey.Background]: "background.png",
    [BaseAssetKey.Logo]: "logo.png",
    [BaseAssetKey.LoadingBar]: "loading-bar.png",
    [BaseAssetKey.LoadingFill]: "loading-fill.png",
    [BaseAssetKey.Grass]: "grass.png",

    // icons
    [BaseAssetKey.IconShop]: "icons/shop.png",
    [BaseAssetKey.IconRoadsideStand]: "icons/roadside-stand.png",
    [BaseAssetKey.IconNFTMarketplace]: "icons/nft-marketplace.png",
    [BaseAssetKey.IconNeighbors]: "icons/neighbors.png",
}

// Asset Loading Function for `baseAssetMap`
export const loadBaseAssets = (scene: Phaser.Scene) => {
    for (const [key, value] of Object.entries(baseAssetMap)) {
        scene.load.image(key, value)
    }
}