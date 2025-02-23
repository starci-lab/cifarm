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
    IconSetting = "icon-setting",

    // UI Backgrounds
    UIBackgroundLarge = "ui-background-large",
    UIBackgroundMedium = "ui-background-medium",
    UIBackgroundXLarge = "ui-background-x-large",
    UIBackgroundLargeContainer = "ui-background-large-container",
    UIBackgroundSmallContainer = "ui-background-small-container",
    UIBackgroundSmall = "ui-background-small",
    UIBackgroundXLargeDarkContainer = "ui-background-xlarge-dark-container",

    // Tab
    UITabFrame = "ui-tab-frame",
    UITabSlat = "ui-tab-slat",

    // Shop Modal
    UIModalShopCard = "ui-modal-shop-card",
    UIModalShopLock = "ui-modal-shop-lock",
    UIModalShopOff = "ui-modal-shop-off",

    // Inventory ui-modal
    UIModalInventoryChain = "ui-modal-inventory-chain",
    UIModalInventoryToolbar = "ui-modal-inventory-toolbar",
    UIModalInventoryToolbarContainer = "ui-modal-inventory-toolbar-container",

    // Daily ui-modal
    UIModalDailyWall = "ui-modal-daily-wall",
    UIModalDailyTitle = "ui-modal-daily-title",
    UIModalDailyIconCheck = "ui-modal-daily-icon-check",
    UIModalDailyIconClose = "ui-modal-daily-icon-close",
    UIModalDailyLastDayAvatar = "ui-modal-daily-last-day-avatar",
    UIModalDailyBaseDayAvatar = "ui-modal-daily-base-day-avatar",
    UIModalDailyCoin1 = "ui-modal-daily-coin1",
    UIModalDailyCoin2 = "ui-modal-daily-coin2",
    UIModalDailyCoin3 = "ui-modal-daily-coin3",
    UIModalDailyDay = "ui-modal-daily-day",

    // Quest ui-modal
    UIModalQuestWall = "ui-modal-quest-wall",
    UIModalQuestCardTitle = "ui-modal-quest-card-title",
    UIModalQuestPin = "ui-modal-quest-pin",
    UIModalQuestCardItem = "ui-modal-quest-card-item",
    UIModalQuestIconClose = "ui-modal-quest-icon-close",

    // Toolbar
    UIToolbarBackground = "ui-toolbar-background",
    UIToolbarSelectedArrow = "ui-toolbar-selected",

    //Stand
    UIModalStandWall = "ui-modal-stand-wall",
    UIModalStandHeader = "ui-modal-stand-header",
    UIModalStandTag = "ui-modal-stand-tag",
    UIModalStand = "ui-modal-stand-stand",
    UIModalStandWhiteStar = "ui-modal-stand-white-star",
    UIModalStandPurpleStar = "ui-modal-stand-purple-star",
    UIModalStandShadow = "ui-modal-stand-shadow",
    UIModalStandAddButton = "ui-modal-stand-add-button",

    //Neighbors
    UIModalNeighborsWall = "ui-modal-neighbors-wall",
    UIModalNeighborsAvatarFriends = "ui-modal-neighbors-avatar-friends",
    UIModalNeighborsAvatarRandom = "ui-modal-neighbors-avatar-random",
    UIModalNeighborsIconClose = "ui-modal-neighbors-icon-close",
    UIModalNeighborsIconQuestion = "ui-modal-neighbors-icon-question",
    UIModalNeighborsIconSearch = "ui-modal-neighbors-icon-search",
    UIModalNeighborsIconRandom = "ui-modal-neighbors-icon-random",
    UIModalNeighborsCardBackground = "ui-modal-neighbors-frame-friends",
    UIModalNeighborsFrameSearch = "ui-modal-neighbors-frame-search",
    UIModalNeighborsIconAdd = "ui-modal-neighbors-icon-add",
    UIModalNeighborsIconHome = "ui-modal-neighbors-icon-home",
    UIModalNeighborsFrameVisit = "ui-modal-neighbors-frame-visit",

    //Common Modal
    UIModalCommonFrame = "ui-modal-common-frame",
    UIModalCommonThumb = "ui-modal-common-thumb",
    UIModalCommonQuantityFrame = "ui-modal-common-quantity-frame",
    UIModalCommonGrass = "ui-modal-common-grass",

    //Common UI
    UICommonNextAvatar = "ui-common-next-avatar",
    UICommonPrevAvatar = "ui-common-prev-avatar",
    UICommonNextIcon = "ui-common-next-icon",
    UICommonPrevIcon = "ui-common-prev-icon",
    UICommonInput = "ui-common-input",
    UICommonButtonRed = "ui-common-button-red",
    UICommonX = "ui-common-x",
    UICommonButtonGreen = "ui-common-button-green",

    //Topbar
    TopbarHeader = "topbar-header",
    TopbarIconCoin = "topbar-icon-coin",
    TopbarBackgroundCurrency = "topbar-background-currency",
    TopbarAvatar = "topbar-avatar",
    TopbarInfo = "topbar-info",
    TopbarLevelBar = "topbar-level-bar",
    TopbarLevelBarBackground = "topbar-level-bar-background",
    TopbarLevelBox = "topbar-level-box",

    //Bubble
    Bubble = "bubble",
    TopbarIconCarrot = "topbar-icon-carrot",
    TopbarIconEnergy = "topbar-icon-energy",

    //Press here arrow
    PressHereArrow = "press-here-arrow",

    //State
    BubbleState = "bubble-state",

    //Popup
    //PlacementPopup
    PopupPlacementIconYes = "popup-placement-icon-yes",
    PopupPlacementIconNo = "popup-placement-icon-no",
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
    [BaseAssetKey.IconSetting]: "icons/setting.png",

    // backgrounds
    [BaseAssetKey.UIBackgroundLarge]: "ui/backgrounds/large.png",
    [BaseAssetKey.UIBackgroundMedium]: "ui/backgrounds/medium.png",
    [BaseAssetKey.UIBackgroundXLarge]: "ui/backgrounds/xlarge.png",
    [BaseAssetKey.UIBackgroundLargeContainer]: "ui/backgrounds/large-container.png",
    [BaseAssetKey.UIBackgroundSmallContainer]: "ui/backgrounds/small-container.png",
    [BaseAssetKey.UIBackgroundSmall]: "ui/backgrounds/small.png",
    [BaseAssetKey.UIBackgroundXLargeDarkContainer]: "ui/backgrounds/xlarge-dark-container.png",

    // tab
    [BaseAssetKey.UITabFrame]: "ui/tab/frame.png",
    [BaseAssetKey.UITabSlat]: "ui/tab/slat.png",

    // shop UIModals
    [BaseAssetKey.UIModalShopCard]: "ui/modals/shop/card.png",
    [BaseAssetKey.UIModalShopLock]: "ui/modals/shop/lock.png",
    [BaseAssetKey.UIModalShopOff]: "ui/modals/shop/off.png",

    // Inventory UIModals
    [BaseAssetKey.UIModalInventoryChain]: "ui/modals/inventory/chain.png",
    [BaseAssetKey.UIModalInventoryToolbar]: "ui/modals/inventory/toolbar.png",
    [BaseAssetKey.UIModalInventoryToolbarContainer]: "ui/modals/inventory/toolbar-container.png",

    // Daily UIModals
    [BaseAssetKey.UIModalDailyWall]: "ui/modals/daily/wall.png",
    [BaseAssetKey.UIModalDailyTitle]: "ui/modals/daily/title.png",
    [BaseAssetKey.UIModalDailyIconCheck]: "ui/modals/daily/icon-check.png",
    [BaseAssetKey.UIModalDailyIconClose]: "ui/modals/daily/icon-close.png",
    [BaseAssetKey.UIModalDailyLastDayAvatar]: "ui/modals/daily/last-day-avatar.png",
    [BaseAssetKey.UIModalDailyBaseDayAvatar]: "ui/modals/daily/base-day-avatar.png",
    [BaseAssetKey.UIModalDailyCoin1]: "ui/modals/daily/coin-1.png",
    [BaseAssetKey.UIModalDailyCoin2]: "ui/modals/daily/coin-2.png",
    [BaseAssetKey.UIModalDailyCoin3]: "ui/modals/daily/coin-3.png",
    [BaseAssetKey.UIModalDailyDay]: "ui/modals/daily/day.png",

    // Quest
    [BaseAssetKey.UIModalQuestWall]: "ui/modals/quest/wall.png",
    [BaseAssetKey.UIModalQuestCardTitle]: "ui/modals/quest/card-title.png",
    [BaseAssetKey.UIModalQuestPin]: "ui/modals/quest/pin.png",
    [BaseAssetKey.UIModalQuestCardItem]: "ui/modals/quest/card-item.png",
    [BaseAssetKey.UIModalQuestIconClose]: "ui/modals/quest/icon-close.png",

    // Toolbar
    [BaseAssetKey.UIToolbarBackground]: "ui/toolbar/background.png",
    [BaseAssetKey.UIToolbarSelectedArrow]: "ui/toolbar/selected-arrow.png",
    //Stand
    [BaseAssetKey.UIModalStandWall]: "ui/modals/stand/wall.png",
    [BaseAssetKey.UIModalStandHeader]: "ui/modals/stand/header.png",
    [BaseAssetKey.UIModalStandTag]: "ui/modals/stand/tag.png",
    [BaseAssetKey.UIModalStand]: "ui/modals/stand/stand.png",
    [BaseAssetKey.UIModalStandWhiteStar]: "ui/modals/stand/star-white.png",
    [BaseAssetKey.UIModalStandPurpleStar]: "ui/modals/stand/star-purple.png",
    [BaseAssetKey.UIModalStandShadow]: "ui/modals/stand/shadow.png",
    [BaseAssetKey.UIModalStandAddButton]: "ui/modals/stand/add-button.png",
    //Neighbors
    [BaseAssetKey.UIModalNeighborsWall]: "ui/modals/neighbors/wall.png",
    [BaseAssetKey.UIModalNeighborsAvatarFriends]: "ui/modals/neighbors/ava-friends.png",
    [BaseAssetKey.UIModalNeighborsAvatarRandom]: "ui/modals/neighbors/ava-random.png",
    [BaseAssetKey.UIModalNeighborsIconClose]: "ui/modals/neighbors/btn-icon-close.png",
    [BaseAssetKey.UIModalNeighborsIconQuestion]: "ui/modals/neighbors/btn-icon-question.png",
    [BaseAssetKey.UIModalNeighborsIconSearch]: "ui/modals/neighbors/btn-icon-search.png",
    [BaseAssetKey.UIModalNeighborsIconRandom]: "ui/modals/neighbors/btn-random.png",
    [BaseAssetKey.UIModalNeighborsCardBackground]: "ui/modals/neighbors/card-background.png",
    [BaseAssetKey.UIModalNeighborsFrameSearch]: "ui/modals/neighbors/frame-search.png",
    [BaseAssetKey.UIModalNeighborsIconAdd]: "ui/modals/neighbors/icon-add.png",
    [BaseAssetKey.UIModalNeighborsIconHome]: "ui/modals/neighbors/icon-home.png",
    [BaseAssetKey.UIModalNeighborsFrameVisit]: "ui/modals/neighbors/frame-visit.png",

    //Topbar
    [BaseAssetKey.TopbarHeader]: "topbar/header.png",
    [BaseAssetKey.TopbarIconCoin]: "topbar/coin.png",
    [BaseAssetKey.TopbarBackgroundCurrency]: "topbar/background-currency.png",
    [BaseAssetKey.TopbarAvatar]: "topbar/avatar.png",
    [BaseAssetKey.TopbarInfo]: "topbar/info.png",
    [BaseAssetKey.TopbarLevelBar]: "topbar/level-bar.png",
    [BaseAssetKey.TopbarLevelBarBackground]: "topbar/level-bar-background.png",
    [BaseAssetKey.TopbarLevelBox]: "topbar/lv.png",

    //Bubble
    [BaseAssetKey.Bubble]: "bubble.png",
    [BaseAssetKey.TopbarIconCarrot]: "topbar/icon-carrot.png",
    [BaseAssetKey.TopbarIconEnergy]: "topbar/icon-energy.png",

    //Press here arrow
    [BaseAssetKey.PressHereArrow]: "press-here-arrow.png",

    //Common UI Modals
    [BaseAssetKey.UIModalCommonFrame]: "ui/modals/common/frame.png",
    [BaseAssetKey.UIModalCommonQuantityFrame]: "ui/modals/common/quantity-frame.png",
    [BaseAssetKey.UIModalCommonThumb]: "ui/modals/common/thumb.png",
    [BaseAssetKey.UIModalCommonGrass]: "ui/modals/common/grass.png",
    
    //Common UI
    [BaseAssetKey.UICommonNextAvatar]: "ui/common/next-avatar.png",
    [BaseAssetKey.UICommonPrevAvatar]: "ui/common/prev-avatar.png",
    [BaseAssetKey.UICommonNextIcon]: "ui/common/next-icon.png",
    [BaseAssetKey.UICommonPrevIcon]: "ui/common/prev-icon.png",
    [BaseAssetKey.UICommonInput]: "ui/common/input.png",
    [BaseAssetKey.UICommonButtonRed]: "ui/common/button-red.png",
    [BaseAssetKey.UICommonButtonGreen]: "ui/common/button-green.png",
    [BaseAssetKey.UICommonX]: "ui/common/x.png",

    //State
    [BaseAssetKey.BubbleState]: "bubble-state.png",

    //Popup
    //PlacementPopup
    [BaseAssetKey.PopupPlacementIconYes]: "popup/placement/yes.png",
    [BaseAssetKey.PopupPlacementIconNo]: "popup/placement/no.png",
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