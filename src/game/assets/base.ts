// Asset Enum for Base assets

export enum BootstrapAssetKey {
    Background = "background",
    Logo = "logo",
    LoadingBar = "loading-bar",
    LoadingFill = "loading-fill",
}

export enum BaseAssetKey {
    Grass = "grass",
    FlowerGrass = "flower-grass",
    
    // Icons
    UIIconShop = "ui-icon-shop",
    UIIconRoadsideStand = "ui-icon-roadside-stand",
    UIIconNFTMarketplace = "ui-icon-nft-marketplace",
    UIIconNeighbors = "ui-icon-neighbors",
    UIIconInventory = "ui-icon-inventory",
    UIIconDaily = "ui-icon-daily",
    UIIconQuests = "ui-icon-quest",
    UIIconSetting = "ui-icon-setting",
    UIIconReturn = "ui-icon-return",
    UIIconNext = "ui-icon-next",
    UIIconPrevious = "ui-icon-previous",
    UIIconSpin = "ui-icon-spin",
    UIIconMove = "ui-icon-move",
    UIIconSell = "ui-icon-sell",

    // UI Backgrounds
    UIBackgroundLarge = "ui-background-large",
    UIBackgroundMedium = "ui-background-medium",
    UIBackgroundXLarge = "ui-background-x-large",
    UIBackgroundLargeContainer = "ui-background-large-container",
    UIBackgroundSmallContainer = "ui-background-small-container",
    UIBackgroundSmall = "ui-background-small",
    UIBackgroundXLargeWrapperContainer = "ui-background-xlarge-wrapper-container",
    UIBackgroundXXLarge = "ui-background-xx-large",
    UIBackgroundXXLargeTabContainer = "ui-background-xx-large-tab-container",
    UIBackgroundLargeWrapperContainer = "ui-background-large-wrapper-container",
    UIBackgroundXXLargeWrapperContainer = "ui-background-xx-large-wrapper-container",
    UIBackgroundMediumContainer = "ui-background-medium-container",
    
    // Tab
    UITabFrame = "ui-tab-frame",
    UITabSlat = "ui-tab-slat",

    // Shop Modal
    UIModalShopCard = "ui-modal-shop-card",
    UIModalShopLock = "ui-modal-shop-lock",
    UIModalShopOff = "ui-modal-shop-off",
    UIModalShopAnimalsTab = "ui-modal-shop-animal-tab",
    UIModalShopBuildingTab = "ui-modal-shop-building-tab",
    UIModalShopDecorationTab = "ui-modal-shop-decoration-tab",
    UIModalShopToolsTab = "ui-modal-shop-tool-tab",
    UIModalShopFruitsTab = "ui-modal-shop-fruit-tab",
    UIModalShopPetsTab = "ui-modal-shop-pet-tab",
    UIModalShopTilesTab = "ui-modal-shop-tile-tab",
    UIModalShopSeedsTab = "ui-modal-shop-seed-tab",
    UIModalShopSuppliesTab = "ui-modal-shop-supply-tab",

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

    // Spin ui-modal
    UIModalSpinBackground = "ui-modal-spin-background",
    UIModalSpinCenter = "ui-modal-spin-center",
    UIModalSpinLight = "ui-modal-spin-light",
    UIModalSpinPointer = "ui-modal-spin-pointer",
    UIModalSpinSegments = "ui-modal-spin-segments",

    // Quest ui-modal
    UIModalQuestCardTitle = "ui-modal-quest-card-title",
    UIModalQuestPin = "ui-modal-quest-pin",
    UIModalQuestCardItem = "ui-modal-quest-card-item",
    UIModalQuestIconClose = "ui-modal-quest-icon-close",
    UIModalQuestSocialTab = "ui-modal-quest-social-tab",
    UIModalQuestDailyTab = "ui-modal-quest-daily-tab",

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

    //Neighbors
    UIModalNeighborsQuestion = "ui-modal-neighbors-button-icon-question",
    UIModalNeighborsButton = "ui-modal-neighbors-button",
    UIModalNeighborsCard = "ui-modal-neighbors-card",
    UIModalNeighborsFrame = "ui-modal-neighbors-frame",
    UIModalNeighborsIconHome = "ui-modal-neighbor-icon-home",
    UIModalNeighborsIconRandom = "ui-modal-neighbors-icon-random",
    UIModalNeighborsTabWorld = "ui-modal-neighbors-tab-world",
    UIModalNeighborsTabFollowees = "ui-modal-neighbors-tab-followees",

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
    UICommonIconMagnifyingGlass = "ui-common-icon-magnifying-glass",
    UICommonMinus = "ui-common-minus",
    UICommonPlus = "ui-common-plus",
    UICommonIconCoin = "ui-common-icon-coin",
    UICommonIconCarrot = "ui-common-icon-carrot",
    UICommonCheck = "ui-common-check",
    UICommonX2 = "ui-common-x2",
    UICommonExperience = "ui-common-experience",
    UICommonCheckRound = "ui-common-check-round",
    UICommonXRound = "ui-common-x-round",

    // Slider
    UICommonSliderThumb = "ui-common-slider-thumb",
    UICommonSliderTrack = "ui-common-slider-track",
    UICommonCheckboxContainer = "ui-common-checkbox-container",

    //Topbar
    UITopbarHeader = "ui-topbar-header",
    UITopbarIconEnergy = "ui-topbar-icon-energy",
    UITopbarResource = "ui-topbar-resource",
    UITopbarAvatar = "ui-topbar-avatar",
    UITopbarAvatarMask = "ui-topbar-avatar-mask",
    UITopbarAvatarWrapper = "ui-topbar-avatar-wrapper",
    UITopbarLevelBox = "ui-topbar-level-box",
    UITopbarName = "ui-topbar-name",

    //Bubble
    Bubble = "bubble",
    FertilizerParticle = "fertilizer-particle",

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
    [BaseAssetKey.FlowerGrass]: "flower-grass.png",

    // icons
    [BaseAssetKey.UIIconShop]: "ui/icons/shop.png",
    [BaseAssetKey.UIIconRoadsideStand]: "ui/icons/roadside-stand.png",
    [BaseAssetKey.UIIconNFTMarketplace]: "ui/icons/nft-marketplace.png",
    [BaseAssetKey.UIIconNeighbors]: "ui/icons/neighbors.png",
    [BaseAssetKey.UIIconInventory]: "ui/icons/inventory.png",
    [BaseAssetKey.UIIconDaily]: "ui/icons/daily.png",
    [BaseAssetKey.UIIconQuests]: "ui/icons/quests.png",
    [BaseAssetKey.UIIconSetting]: "ui/icons/settings.png",
    [BaseAssetKey.UIIconReturn]: "ui/icons/return.png",
    [BaseAssetKey.UIIconNext]: "ui/icons/next.png",
    [BaseAssetKey.UIIconPrevious]: "ui/icons/previous.png",
    [BaseAssetKey.UIIconSpin]: "ui/icons/spin.png",
    [BaseAssetKey.UIIconMove]: "ui/icons/move.png",
    [BaseAssetKey.UIIconSell]: "ui/icons/sell.png",

    // backgrounds
    [BaseAssetKey.UIBackgroundLarge]: "ui/backgrounds/large.png",
    [BaseAssetKey.UIBackgroundMedium]: "ui/backgrounds/medium.png",
    [BaseAssetKey.UIBackgroundXLarge]: "ui/backgrounds/xlarge.png",
    [BaseAssetKey.UIBackgroundLargeContainer]: "ui/backgrounds/large-container.png",
    [BaseAssetKey.UIBackgroundSmallContainer]: "ui/backgrounds/small-container.png",
    [BaseAssetKey.UIBackgroundSmall]: "ui/backgrounds/small.png",
    [BaseAssetKey.UIBackgroundXLargeWrapperContainer]: "ui/backgrounds/xlarge-wrapper-container.png",
    [BaseAssetKey.UIBackgroundXXLarge]: "ui/backgrounds/xxlarge.png",
    [BaseAssetKey.UIBackgroundXXLargeTabContainer]: "ui/backgrounds/xxlarge-tab-container.png",
    [BaseAssetKey.UIBackgroundLargeWrapperContainer]: "ui/backgrounds/large-wrapper-container.png",
    [BaseAssetKey.UIBackgroundXXLargeWrapperContainer]: "ui/backgrounds/xxlarge-wrapper-container.png",
    [BaseAssetKey.UIBackgroundMediumContainer]: "ui/backgrounds/medium-container.png",
    // tab
    [BaseAssetKey.UITabFrame]: "ui/tab/frame.png",
    [BaseAssetKey.UITabSlat]: "ui/tab/slat.png",

    // shop UIModals
    [BaseAssetKey.UIModalShopCard]: "ui/modals/shop/card.png",
    [BaseAssetKey.UIModalShopLock]: "ui/modals/shop/lock.png",
    [BaseAssetKey.UIModalShopOff]: "ui/modals/shop/off.png",
    [BaseAssetKey.UIModalShopAnimalsTab]: "ui/modals/shop/animals-tab.png",
    [BaseAssetKey.UIModalShopBuildingTab]: "ui/modals/shop/buildings-tab.png",
    [BaseAssetKey.UIModalShopDecorationTab]: "ui/modals/shop/decoration-tab.png",
    [BaseAssetKey.UIModalShopPetsTab]: "ui/modals/shop/pets-tab.png",
    [BaseAssetKey.UIModalShopToolsTab]: "ui/modals/shop/tools-tab.png",
    [BaseAssetKey.UIModalShopTilesTab]: "ui/modals/shop/tiles-tab.png",
    [BaseAssetKey.UIModalShopSeedsTab]: "ui/modals/shop/seeds-tab.png",
    [BaseAssetKey.UIModalShopSuppliesTab]: "ui/modals/shop/supplies-tab.png",
    [BaseAssetKey.UIModalShopFruitsTab]: "ui/modals/shop/fruits-tab.png",

    // Spin UIModals
    [BaseAssetKey.UIModalSpinBackground]: "ui/modals/spin/background.png",
    [BaseAssetKey.UIModalSpinCenter]: "ui/modals/spin/center.png",
    [BaseAssetKey.UIModalSpinLight]: "ui/modals/spin/light.png",
    [BaseAssetKey.UIModalSpinPointer]: "ui/modals/spin/pointer.png",
    [BaseAssetKey.UIModalSpinSegments]: "ui/modals/spin/segments.png",

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
    [BaseAssetKey.UIModalQuestCardTitle]: "ui/modals/quest/card-title.png",
    [BaseAssetKey.UIModalQuestPin]: "ui/modals/quest/pin.png",
    [BaseAssetKey.UIModalQuestCardItem]: "ui/modals/quest/card-item.png",
    [BaseAssetKey.UIModalQuestIconClose]: "ui/modals/quest/icon-close.png",
    [BaseAssetKey.UIModalQuestSocialTab]: "ui/modals/quest/social-tab.png",
    [BaseAssetKey.UIModalQuestDailyTab]: "ui/modals/quest/daily-tab.png",

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
    //Neighbors
    [BaseAssetKey.UIModalNeighborsIconRandom]: "ui/modals/neighbors/icon-random.png",
    [BaseAssetKey.UIModalNeighborsIconHome]: "ui/modals/neighbors/icon-home.png",
    [BaseAssetKey.UIModalNeighborsQuestion]: "ui/modals/neighbors/question.png",
    [BaseAssetKey.UIModalNeighborsButton]: "ui/modals/neighbors/button.png",
    [BaseAssetKey.UIModalNeighborsCard]: "ui/modals/neighbors/card.png",
    [BaseAssetKey.UIModalNeighborsFrame]: "ui/modals/neighbors/frame.png",
    [BaseAssetKey.UIModalNeighborsTabWorld]: "ui/modals/neighbors/tab-world.png",
    [BaseAssetKey.UIModalNeighborsTabFollowees]: "ui/modals/neighbors/tab-followees.png",
    //Topbar
    [BaseAssetKey.UITopbarHeader]: "ui/topbar/header.png",
    [BaseAssetKey.UITopbarIconEnergy]: "ui/topbar/icon-energy.png",
    [BaseAssetKey.UITopbarResource]: "ui/topbar/resource.png",
    [BaseAssetKey.UITopbarAvatar]: "ui/topbar/avatar.png",
    [BaseAssetKey.UITopbarAvatarMask]: "ui/topbar/avatar-mask.png",
    [BaseAssetKey.UITopbarAvatarWrapper]: "ui/topbar/avatar-wrapper.png",
    [BaseAssetKey.UITopbarLevelBox]: "ui/topbar/level-box.png",
    [BaseAssetKey.UITopbarName]: "ui/topbar/name.png",

    //Bubble
    [BaseAssetKey.Bubble]: "bubble.png",
    [BaseAssetKey.FertilizerParticle]: "tiles/fertilizer-particle.png",

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
    [BaseAssetKey.UICommonX2]: "ui/common/x2.png",
    [BaseAssetKey.UICommonIconMagnifyingGlass]: "ui/common/icon-magnifying-glass.png",
    [BaseAssetKey.UICommonMinus]: "ui/common/minus.png",
    [BaseAssetKey.UICommonPlus]: "ui/common/plus.png",
    [BaseAssetKey.UICommonIconCoin]: "ui/common/icon-coin.png",
    [BaseAssetKey.UICommonIconCarrot]: "ui/common/icon-carrot.png",
    [BaseAssetKey.UICommonCheck]: "ui/common/check.png",
    [BaseAssetKey.UICommonExperience]: "ui/common/experience.png",
    [BaseAssetKey.UICommonSliderThumb]: "ui/common/slider-thumb.png",
    [BaseAssetKey.UICommonSliderTrack]: "ui/common/slider-track.png",
    [BaseAssetKey.UICommonCheckboxContainer]: "ui/common/checkbox-container.png",
    [BaseAssetKey.UICommonCheckRound]: "ui/common/check-round.png",
    [BaseAssetKey.UICommonXRound]: "ui/common/x-round.png",

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