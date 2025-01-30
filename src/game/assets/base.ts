//assets
export enum AssetName {
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

export const assetMap: Record<AssetName, string> = {
    [AssetName.Background]: "background.png",
    [AssetName.Logo]: "logo.png",
    [AssetName.LoadingBar]: "loading-bar.png",
    [AssetName.LoadingFill]: "loading-fill.png",
    [AssetName.Grass]: "grass.png",

    // Icons
    [AssetName.IconShop]: "icons/shop.png",
    [AssetName.IconRoadsideStand]: "icons/roadside-stand.png",
    [AssetName.IconNFTMarketplace]: "icons/nft-marketplace.png",
    [AssetName.IconNeighbors]: "icons/neighbors.png",
    // Tiles
    [AssetName.TileStarter]: "tiles/starter-tile.png",
    // Buildings
    [AssetName.BuildingHome]: "buildings/home.png",
}