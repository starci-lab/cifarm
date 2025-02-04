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
    IconInventory = "icon-inventory",
    IconDaily = "icon-daily",
    IconQuest = "icon-quest",

    //Shop modal
    ModalShopAvatarShop = "modal-shop-avatar-shop",
    ModalShopBottomBar = "modal-shop-bottom-bar",
    ModalShopButtonPrice = "modal-shop-button-price",
    ModalShopIconTabOn = "modal-shop-icon-tab-on",
    ModalShopIconTabOff = "modal-shop-icon-tab-off",
    ModalShopItemCard = "modal-shop-item-card",
    ModalShopTitleShop = "modal-shop-title-shop",
    ModalShopTopBar = "modal-shop-top-bar",
    ModalShopWall = "modal-shop-wall",
    ModalShopTopDecorator = "modal-shop-top-decorator",
    ModalShopBottomDecorator = "modal-shop-bottom-decorator",
    ModalShopCardTitle = "modal-shop-card-title",
    ModalShopX = "modal-shop-x",

    // Inventory modal
    ModalInventoryTopRibbon = "modal-inventory-top-ribbon",
    ModalInventoryBtnClose = "modal-inventory-btn-close",
    ModalInventoryCell = "modal-inventory-cell",
    ModalInventoryCellQuantity = "modal-inventory-cell-quantity",
    ModalInventoryWall = "modal-inventory-wall",
    ModalInventoryIconTabOn = "modal-inventory-icon-tab-on",
    ModalInventoryIconTabOff = "modal-inventory-icon-tab-off",
    ModalInventoryIconAnimal = "modal-inventory-icon-animal",
    ModalInventoryIconCan = "modal-inventory-icon-can",
    ModalInventoryIconCrop = "modal-inventory-icon-crop",
    ModalInventoryIconMenu = "modal-inventory-icon-menu",
    ModalInventoryIconProduct = "modal-inventory-icon-product",
    ModalInventoryIconTile = "modal-inventory-icon-tile",

    // Daily modal
    ModalDailyWall = "modal-daily-wall",
    ModalDailyTitle = "modal-daily-title",
    ModalDailyIconCheck = "modal-daily-icon-check",
    ModalDailyIconClose = "modal-daily-icon-close",
    ModalDailyLastDayAvatar = "modal-daily-last-day-avatar",
    ModalDailyBaseDayAvatar = "modal-daily-base-day-avatar",
    ModalDailyCoin1 = "modal-daily-coin1",
    ModalDailyCoin2 = "modal-daily-coin2",
    ModalDailyCoin3 = "modal-daily-coin3",
    ModalDailyDay = "modal-daily-day",

    // Quest modal
    ModalQuestWall = "modal-quest-wall",
    ModalQuestCardTitle = "modal-quest-card-title",
    ModalQuestPin = "modal-quest-pin",
    ModalQuestCardItem = "modal-quest-card-item",
    ModalQuestIconClose = "modal-quest-icon-close",
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
    [BaseAssetKey.IconInventory]: "icons/inventory.png",
    [BaseAssetKey.IconDaily]: "icons/daily.png",
    [BaseAssetKey.IconQuest]: "icons/quest.png",

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
    [BaseAssetKey.ModalShopCardTitle]: "modals/shop/card-title.png",
    [BaseAssetKey.ModalShopX]: "modals/shop/x.png",

    // Inventory Modals
    [BaseAssetKey.ModalInventoryTopRibbon]: "modals/inventory/top-ribbon.png",
    [BaseAssetKey.ModalInventoryBtnClose]: "modals/inventory/btn-close.png",
    [BaseAssetKey.ModalInventoryCell]: "modals/inventory/cell.png",
    [BaseAssetKey.ModalInventoryCellQuantity]: "modals/inventory/cell-quantity.png",
    [BaseAssetKey.ModalInventoryWall]: "modals/inventory/wall.png",
    [BaseAssetKey.ModalInventoryIconTabOn]: "modals/inventory/icon-tab-on.png",
    [BaseAssetKey.ModalInventoryIconTabOff]: "modals/inventory/icon-tab-off.png",
    [BaseAssetKey.ModalInventoryIconAnimal]: "modals/inventory/icon-animal.png",
    [BaseAssetKey.ModalInventoryIconCan]: "modals/inventory/icon-can.png",
    [BaseAssetKey.ModalInventoryIconCrop]: "modals/inventory/icon-crop.png",
    [BaseAssetKey.ModalInventoryIconMenu]: "modals/inventory/icon-menu.png",
    [BaseAssetKey.ModalInventoryIconProduct]: "modals/inventory/icon-product.png",
    [BaseAssetKey.ModalInventoryIconTile]: "modals/inventory/icon-tile.png",

    // Daily Modals
    [BaseAssetKey.ModalDailyWall]: "modals/daily/wall.png",
    [BaseAssetKey.ModalDailyTitle]: "modals/daily/title.png",
    [BaseAssetKey.ModalDailyIconCheck]: "modals/daily/icon-check.png",
    [BaseAssetKey.ModalDailyIconClose]: "modals/daily/icon-close.png",
    [BaseAssetKey.ModalDailyLastDayAvatar]: "modals/daily/last-day-avatar.png",
    [BaseAssetKey.ModalDailyBaseDayAvatar]: "modals/daily/base-day-avatar.png",
    [BaseAssetKey.ModalDailyCoin1]: "modals/daily/coin-1.png",
    [BaseAssetKey.ModalDailyCoin2]: "modals/daily/coin-2.png",
    [BaseAssetKey.ModalDailyCoin3]: "modals/daily/coin-3.png",
    [BaseAssetKey.ModalDailyDay]: "modals/daily/day.png",

    // Quest
    [BaseAssetKey.ModalQuestWall]: "modals/quest/wall.png",
    [BaseAssetKey.ModalQuestCardTitle]: "modals/quest/card-title.png",
    [BaseAssetKey.ModalQuestPin]: "modals/quest/pin.png",
    [BaseAssetKey.ModalQuestCardItem]: "modals/quest/card-item.png",
    [BaseAssetKey.ModalQuestIconClose]: "modals/quest/icon-close.png",
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