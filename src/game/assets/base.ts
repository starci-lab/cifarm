//assets
export enum AssetKey {
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

    // Tiles
    TileStarter = "tile-starter",
    // Homes
    BuildingHome = "building-home",
}

export const assetMap: Record<AssetKey, string> = {
    [AssetKey.Background]: "background.png",
    [AssetKey.Logo]: "logo.png",
    [AssetKey.LoadingBar]: "loading-bar.png",
    [AssetKey.LoadingFill]: "loading-fill.png",
    [AssetKey.Grass]: "grass.png",

    // Icons
    [AssetKey.IconShop]: "icons/shop.png",
    [AssetKey.IconRoadsideStand]: "icons/roadside-stand.png",
    [AssetKey.IconNFTMarketplace]: "icons/nft-marketplace.png",
    [AssetKey.IconNeighbors]: "icons/neighbors.png",
    // Tiles
    [AssetKey.TileStarter]: "tiles/starter-tile.png",
    // Buildings
    [AssetKey.BuildingHome]: "buildings/home.png",
}