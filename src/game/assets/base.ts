// Asset Enum for Base assets

export enum BootstrapAssetKey {
    Background = "background",
    Logo = "logo",
    LoadingBar = "loading-bar",
    LoadingFill = "loading-fill",
}

export enum BaseAssetKey {
    Grass = "grass",

    // Icons
    IconShop = "icon-shop",
    IconRoadsideStand = "icon-roadside-stand",
    IconNFTMarketplace = "icon-nft-marketplace",
    IconNeighbors = "icon-neighbors",

    //Shop Modals
    ModalShopAvatarShop = "shop-modal-avatar-shop",
    ModalShopBottomBar = "shop-modal-bottom-bar",
    ModalShopButtonPrice = "shop-modal-button-price",
    ModalShopIconTabOn = "shop-modal-icon-tab-on",
    ModalShopIconTabOff = "shop-modal-icon-tab-off",
    ModalShopItemCard = "shop-modal-item-card",
    ModalShopTitleShop = "shop-modal-title-shop",
    ModalShopTopBar = "shop-modal-top-bar",
    ModalShopWall = "shop-modal-wall",
    ModalShopTopDecorator = "shop-modal-top-decorator",
    ModalShopBottomDecorator = "shop-modal-bottom-decorator",
}

export const bootstrapAssetMap: Record<BootstrapAssetKey, string> = {
    [BootstrapAssetKey.Background]: "background.png",
    [BootstrapAssetKey.Logo]: "logo.png",
    [BootstrapAssetKey.LoadingBar]: "loading-bar.png",
    [BootstrapAssetKey.LoadingFill]: "loading-fill.png",
}

// updated baseAssetMap with BaseAssetKey enum values
export const baseAssetMap: Record<BaseAssetKey, string> = {
    [BaseAssetKey.Grass]: "grass.png",

    // icons
    [BaseAssetKey.IconShop]: "icons/shop.png",
    [BaseAssetKey.IconRoadsideStand]: "icons/roadside-stand.png",
    [BaseAssetKey.IconNFTMarketplace]: "icons/nft-marketplace.png",
    [BaseAssetKey.IconNeighbors]: "icons/neighbors.png",

    // shop Modals
    [BaseAssetKey.ModalShopAvatarShop]: "modals/shop/avatar-shop.png",
    [BaseAssetKey.ModalShopBottomBar]: "modals/shop/bottom-bar.png",
    [BaseAssetKey.ModalShopButtonPrice]: "modals/shop/button-price.png",
    [BaseAssetKey.ModalShopItemCard]: "modals/shop/item-card.png",
    [BaseAssetKey.ModalShopTitleShop]: "modals/shop/title-shop.png",
    [BaseAssetKey.ModalShopTopBar]: "modals/shop/top-bar.png",
    [BaseAssetKey.ModalShopWall]: "modals/shop/wall.png",
    [BaseAssetKey.ModalShopTopDecorator]: "modals/shop/top-decorator.png",
    [BaseAssetKey.ModalShopBottomDecorator]: "modals/shop/bottom-decorator.png",
    [BaseAssetKey.ModalShopIconTabOn]: "modals/shop/icon-tab-on.png",
    [BaseAssetKey.ModalShopIconTabOff]: "modals/shop/icon-tab-off.png",
}

// preload, for loading screen
export const loadBootstrapAssets = (scene: Phaser.Scene) => {
    for (const [key, value] of Object.entries(bootstrapAssetMap)) {
        scene.load.image(key, value)
    }
}

// asset Loading Function for `baseAssetMap`
export const loadBaseAssets = (scene: Phaser.Scene) => {
    for (const [key, value] of Object.entries(baseAssetMap)) {
        scene.load.image(key, value)
    }
}