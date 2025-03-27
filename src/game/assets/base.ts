// Asset Enum for Base assets

import { TextureConfig } from "./types"

export enum BootstrapAssetKey {
    Background = "background",
    Logo = "logo",
    LoadingBar = "loading-bar",
    LoadingFill = "loading-fill",
}

export enum BaseAssetKey {
    Grass = "grass",
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
    UIModalShopFlowersTab = "ui-modal-shop-flower-tab",

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
export const baseAssetMap: Record<BaseAssetKey, TextureConfig> = {
    [BaseAssetKey.Grass]: {
        assetUrl: "grass.png",
        key: "grass",
    },
    [BaseAssetKey.Bubble]: {
        assetUrl: "bubble.png",
        key: "bubble",
    },
    [BaseAssetKey.FertilizerParticle]: {
        assetUrl: "fertilizer-particle.png",
        key: "fertilizer-particle",
    },
    [BaseAssetKey.PressHereArrow]: {
        assetUrl: "press-here-arrow.png",
        key: "press-here-arrow",
    },
    [BaseAssetKey.BubbleState]: {
        assetUrl: "bubble-state.png",
        key: "bubble-state",
    },
    [BaseAssetKey.UICommonPlus]: {
        assetUrl: "ui/common/plus.png",
        key: "ui-common-plus",
    },
    [BaseAssetKey.UICommonIconCoin]: {
        assetUrl: "ui/common/icon-coin.png",
        key: "ui-common-icon-coin",
    },
    [BaseAssetKey.UICommonMinus]: {
        assetUrl: "ui/common/minus.png",
        key: "ui-common-minus",
    },
    [BaseAssetKey.UICommonIconMagnifyingGlass]: {
        assetUrl: "ui/common/icon-magnifying-glass.png",
        key: "ui-common-icon-magnifying-glass",
    },  
    [BaseAssetKey.UICommonSliderThumb]: {
        assetUrl: "ui/common/slider-thumb.png",
        key: "ui-common-slider-thumb",
    },
    [BaseAssetKey.UICommonSliderTrack]: {
        assetUrl: "ui/common/slider-track.png",
        key: "ui-common-slider-track",
    },
    [BaseAssetKey.UICommonCheck]: {
        assetUrl: "ui/common/check.png",
        key: "ui-common-check",
    },
    [BaseAssetKey.UICommonX2]: {
        assetUrl: "ui/common/x2.png",
        key: "ui-common-x2",
    },
    [BaseAssetKey.UICommonExperience]: {
        assetUrl: "ui/common/experience.png",
        key: "ui-common-experience",
    },
    [BaseAssetKey.UICommonCheckRound]: {
        assetUrl: "ui/common/check-round.png",  
        key: "ui-common-check-round",
    // icons
    [BaseAssetKey.UIIconShop]: {
        assetUrl: "ui/icons/shop.png",
        key: "ui-icon-shop",
    },
    [BaseAssetKey.UIIconRoadsideStand]: {
        assetUrl: "ui/icons/roadside-stand.png",
        key: "ui-icon-roadside-stand",
    },
    [BaseAssetKey.UIIconNFTMarketplace]: {
        assetUrl: "ui/icons/nft-marketplace.png",
        key: "ui-icon-nft-marketplace",
    },
    [BaseAssetKey.UIIconNeighbors]: {
        assetUrl: "ui/icons/neighbors.png",
        key: "ui-icon-neighbors",
    },
    [BaseAssetKey.UIIconInventory]: {
        assetUrl: "ui/icons/inventory.png",
        key: "ui-icon-inventory",
    },
    [BaseAssetKey.UIIconDaily]: {
        assetUrl: "ui/icons/daily.png",
        key: "ui-icon-daily",
    },
    [BaseAssetKey.UIIconQuests]: {
        assetUrl: "ui/icons/quests.png",
        key: "ui-icon-quest",
    },
    [BaseAssetKey.UIIconNext]: {
        assetUrl: "ui/icons/next.png",
        key: "ui-icon-next",
    },
    [BaseAssetKey.UIIconPrevious]: {
        assetUrl: "ui/icons/previous.png",
        key: "ui-icon-previous",
    },
    [BaseAssetKey.UIIconSpin]: {
        assetUrl: "ui/icons/spin.png",
        key: "ui-icon-spin",
    },
    [BaseAssetKey.UIIconMove]: {
        assetUrl: "ui/icons/move.png",
        key: "ui-icon-move",
    },
    [BaseAssetKey.UIIconSell]: {
        assetUrl: "ui/icons/sell.png",
        key: "ui-icon-sell",
    },

    // backgrounds
    [BaseAssetKey.UIBackgroundLarge]: {
        assetUrl: "ui/backgrounds/large.png",
        key: "ui-background-large",
    },
    [BaseAssetKey.UIBackgroundMedium]: {
        assetUrl: "ui/backgrounds/medium.png",
        key: "ui-background-medium",
    },
    [BaseAssetKey.UIBackgroundXLarge]: {
        assetUrl: "ui/backgrounds/xlarge.png",
        key: "ui-background-xlarge",
    },
    [BaseAssetKey.UIBackgroundLargeContainer]: {
        assetUrl: "ui/backgrounds/large-container.png",
        key: "ui-background-large-container",
    },
    [BaseAssetKey.UIBackgroundSmallContainer]: {
        assetUrl: "ui/backgrounds/small-container.png",
        key: "ui-background-small-container",
    },
    [BaseAssetKey.UIBackgroundSmall]: {
        assetUrl: "ui/backgrounds/small.png",
        key: "ui-background-small",
    },
    [BaseAssetKey.UIBackgroundXLargeWrapperContainer]: {
        assetUrl: "ui/backgrounds/xlarge-wrapper-container.png",
        key: "ui-background-xlarge-wrapper-container",
    },
    [BaseAssetKey.UIBackgroundXXLarge]: {
        assetUrl: "ui/backgrounds/xxlarge.png",
        key: "ui-background-xx-large",
    },
    [BaseAssetKey.UIBackgroundXXLargeTabContainer]: {
        assetUrl: "ui/backgrounds/xxlarge-tab-container.png",
        key: "ui-background-xx-large-tab-container",
    },
    [BaseAssetKey.UIBackgroundLargeWrapperContainer]: {
        assetUrl: "ui/backgrounds/large-wrapper-container.png",
        key: "ui-background-large-wrapper-container",
    },
    [BaseAssetKey.UIBackgroundXXLargeWrapperContainer]: {
        assetUrl: "ui/backgrounds/xxlarge-wrapper-container.png",
        key: "ui-background-xx-large-wrapper-container",
    },
    [BaseAssetKey.UIBackgroundMediumContainer]: {
        assetUrl: "ui/backgrounds/medium-container.png",
        key: "ui-background-medium-container",
    },
    // tab
    [BaseAssetKey.UITabFrame]: {
        assetUrl: "ui/tab/frame.png",
        key: "ui-tab-frame",
    },
    [BaseAssetKey.UITabSlat]: {
        assetUrl: "ui/tab/slat.png",
        key: "ui-tab-slat",
    },

    // shop UIModals
    [BaseAssetKey.UIModalShopCard]: {
        assetUrl: "ui/modals/shop/card.png",
        key: "ui-modal-shop-card",
    },
    [BaseAssetKey.UIModalShopLock]: {
        assetUrl: "ui/modals/shop/lock.png",
        key: "ui-modal-shop-lock",
    },
    [BaseAssetKey.UIModalShopOff]: {
        assetUrl: "ui/modals/shop/off.png",
        key: "ui-modal-shop-off",
    },
    [BaseAssetKey.UIModalShopAnimalsTab]: {
        assetUrl: "ui/modals/shop/animals-tab.png",
        key: "ui-modal-shop-animals-tab",
    },
    [BaseAssetKey.UIModalShopBuildingTab]: {
        assetUrl: "ui/modals/shop/buildings-tab.png",
        key: "ui-modal-shop-buildings-tab",
    },
    [BaseAssetKey.UIModalShopDecorationTab]: {
        assetUrl: "ui/modals/shop/decoration-tab.png",
        key: "ui-modal-shop-decoration-tab",
    },
    [BaseAssetKey.UIModalShopPetsTab]: {
        assetUrl: "ui/modals/shop/pets-tab.png",
        key: "ui-modal-shop-pets-tab",
    },
    [BaseAssetKey.UIModalShopToolsTab]: {
        assetUrl: "ui/modals/shop/tools-tab.png",
        key: "ui-modal-shop-tools-tab",
    },
    [BaseAssetKey.UIModalShopTilesTab]: {
        assetUrl: "ui/modals/shop/tiles-tab.png",
        key: "ui-modal-shop-tiles-tab",
    },
    [BaseAssetKey.UIModalShopSeedsTab]: {
        assetUrl: "ui/modals/shop/seeds-tab.png",
        key: "ui-modal-shop-seeds-tab",
    },
    [BaseAssetKey.UIModalShopSuppliesTab]: {
        assetUrl: "ui/modals/shop/supplies-tab.png",
        key: "ui-modal-shop-supplies-tab",
    },
    [BaseAssetKey.UIModalShopFruitsTab]: {
        assetUrl: "ui/modals/shop/fruits-tab.png",
        key: "ui-modal-shop-fruits-tab",
    },
    [BaseAssetKey.UIModalShopFlowersTab]: {
        assetUrl: "ui/modals/shop/flowers-tab.png",
        key: "ui-modal-shop-flowers-tab",
    },

    // Spin UIModals
    [BaseAssetKey.UIModalSpinBackground]: {
        assetUrl: "ui/modals/spin/background.png",
        key: "ui-modal-spin-background",
    },
    [BaseAssetKey.UIModalSpinCenter]: {
        assetUrl: "ui/modals/spin/center.png",
        key: "ui-modal-spin-center",
    },
    [BaseAssetKey.UIModalSpinLight]: {
        assetUrl: "ui/modals/spin/light.png",
        key: "ui-modal-spin-light",
    },
    [BaseAssetKey.UIModalSpinPointer]: {
        assetUrl: "ui/modals/spin/pointer.png",
        key: "ui-modal-spin-pointer",
    },
    [BaseAssetKey.UIModalSpinSegments]: {
        assetUrl: "ui/modals/spin/segments.png",
        key: "ui-modal-spin-segments",
    },

    // Inventory UIModals
    [BaseAssetKey.UIModalInventoryChain]: {
        assetUrl: "ui/modals/inventory/chain.png",
        key: "ui-modal-inventory-chain",
    },
    [BaseAssetKey.UIModalInventoryToolbar]: {
        assetUrl: "ui/modals/inventory/toolbar.png",
        key: "ui-modal-inventory-toolbar",
    },
    [BaseAssetKey.UIModalInventoryToolbarContainer]: {
        assetUrl: "ui/modals/inventory/toolbar-container.png",
        key: "ui-modal-inventory-toolbar-container",
    },

    // Daily UIModals
    [BaseAssetKey.UIModalDailyWall]: {
        assetUrl: "ui/modals/daily/wall.png",
        key: "ui-modal-daily-wall",
    },
    [BaseAssetKey.UIModalDailyTitle]: {
        assetUrl: "ui/modals/daily/title.png",
        key: "ui-modal-daily-title",
    },
    [BaseAssetKey.UIModalDailyIconCheck]: {
        assetUrl: "ui/modals/daily/icon-check.png",
        key: "ui-modal-daily-icon-check",
    },
    [BaseAssetKey.UIModalDailyIconClose]: {
        assetUrl: "ui/modals/daily/icon-close.png",
        key: "ui-modal-daily-icon-close",
    },
    [BaseAssetKey.UIModalDailyLastDayAvatar]: {
        assetUrl: "ui/modals/daily/last-day-avatar.png",
        key: "ui-modal-daily-last-day-avatar",
    },
    [BaseAssetKey.UIModalDailyBaseDayAvatar]: {
        assetUrl: "ui/modals/daily/base-day-avatar.png",
        key: "ui-modal-daily-base-day-avatar",
    },
    [BaseAssetKey.UIModalDailyCoin1]: {
        assetUrl: "ui/modals/daily/coin-1.png",
        key: "ui-modal-daily-coin-1",
    },
    [BaseAssetKey.UIModalDailyCoin2]: {
        assetUrl: "ui/modals/daily/coin-2.png",
        key: "ui-modal-daily-coin-2",
    },
    [BaseAssetKey.UIModalDailyCoin3]: {
        assetUrl: "ui/modals/daily/coin-3.png",
        key: "ui-modal-daily-coin-3",
    },
    [BaseAssetKey.UIModalDailyDay]: {
        assetUrl: "ui/modals/daily/day.png",
        key: "ui-modal-daily-day",
    },
    // Quest
    [BaseAssetKey.UIModalQuestCardTitle]: {
        assetUrl: "ui/modals/quest/card-title.png",
        key: "ui-modal-quest-card-title",
    },
    [BaseAssetKey.UIModalQuestPin]: {
        assetUrl: "ui/modals/quest/pin.png",
        key: "ui-modal-quest-pin",
    },
    [BaseAssetKey.UIModalQuestIconClose]: {
        assetUrl: "ui/modals/quest/icon-close.png",
        key: "ui-modal-quest-icon-close",
    },
    [BaseAssetKey.UIModalQuestSocialTab]: {
        assetUrl: "ui/modals/quest/social-tab.png",
        key: "ui-modal-quest-social-tab",
    },
    [BaseAssetKey.UIModalQuestDailyTab]: {
        assetUrl: "ui/modals/quest/daily-tab.png",
        key: "ui-modal-quest-daily-tab",
    },

    // Toolbar
    [BaseAssetKey.UIToolbarBackground]: {
        assetUrl: "ui/toolbar/background.png",
        key: "ui-toolbar-background",
    },
    [BaseAssetKey.UIToolbarSelectedArrow]: {
        assetUrl: "ui/toolbar/selected-arrow.png",
        key: "ui-toolbar-selected-arrow",
    },
    //Stand
    [BaseAssetKey.UIModalStandWall]: {
        assetUrl: "ui/modals/stand/wall.png",
        key: "ui-modal-stand-wall",
    },
    [BaseAssetKey.UIModalStandHeader]: {
        assetUrl: "ui/modals/stand/header.png",
        key: "ui-modal-stand-header",
    },
    [BaseAssetKey.UIModalStandTag]: {
        assetUrl: "ui/modals/stand/tag.png",
        key: "ui-modal-stand-tag",
    },
    [BaseAssetKey.UIModalStand]: {
        assetUrl: "ui/modals/stand/stand.png",
        key: "ui-modal-stand-stand",
    },
    [BaseAssetKey.UIModalStandWhiteStar]: {
        assetUrl: "ui/modals/stand/star-white.png",
        key: "ui-modal-stand-white-star",
    },
    [BaseAssetKey.UIModalStandPurpleStar]: {
        assetUrl: "ui/modals/stand/star-purple.png",
        key: "ui-modal-stand-purple-star",
    },
    [BaseAssetKey.UIModalStandShadow]: {
        assetUrl: "ui/modals/stand/shadow.png",
        key: "ui-modal-stand-shadow",
    },
    //Neighbors
    [BaseAssetKey.UIModalNeighborsIconRandom]: {
        assetUrl: "ui/modals/neighbors/icon-random.png",
        key: "ui-modal-neighbors-icon-random",
    },
    [BaseAssetKey.UIModalNeighborsIconHome]: {
        assetUrl: "ui/modals/neighbors/icon-home.png",
        key: "ui-modal-neighbors-icon-home",
    },
    [BaseAssetKey.UIModalNeighborsQuestion]: {
        assetUrl: "ui/modals/neighbors/question.png",
        key: "ui-modal-neighbors-question",
    },
    [BaseAssetKey.UIModalNeighborsButton]: {
        assetUrl: "ui/modals/neighbors/button.png",
        key: "ui-modal-neighbors-button",
    },
    [BaseAssetKey.UIModalNeighborsCard]: {
        assetUrl: "ui/modals/neighbors/card.png",
        key: "ui-modal-neighbors-card",
    },
    [BaseAssetKey.UIModalNeighborsFrame]: {
        assetUrl: "ui/modals/neighbors/frame.png",
        key: "ui-modal-neighbors-frame",
    },
    [BaseAssetKey.UIModalNeighborsTabWorld]: {
        assetUrl: "ui/modals/neighbors/tab-world.png",
        key: "ui-modal-neighbors-tab-world",
    },
    [BaseAssetKey.UIModalNeighborsTabFollowees]: {
        assetUrl: "ui/modals/neighbors/tab-followees.png",
        key: "ui-modal-neighbors-tab-followees",
    },
    //Topbar
    [BaseAssetKey.UITopbarHeader]: {
        assetUrl: "ui/topbar/header.png",
        key: "ui-topbar-header",
    },
    [BaseAssetKey.UITopbarIconEnergy]: {
        assetUrl: "ui/topbar/icon-energy.png",
        key: "ui-topbar-icon-energy",
    },
    [BaseAssetKey.UITopbarResource]: {
        assetUrl: "ui/topbar/resource.png",
        key: "ui-topbar-resource",
    },
    [BaseAssetKey.UITopbarAvatar]: {
        assetUrl: "ui/topbar/avatar.png",
        key: "ui-topbar-avatar",
    },
    [BaseAssetKey.UITopbarAvatarMask]: {
        assetUrl: "ui/topbar/avatar-mask.png",
        key: "ui-topbar-avatar-mask",
    },
    [BaseAssetKey.UITopbarAvatarWrapper]: {
        assetUrl: "ui/topbar/avatar-wrapper.png",
        key: "ui-topbar-avatar-wrapper",
    },
    [BaseAssetKey.UITopbarLevelBox]: {
        assetUrl: "ui/topbar/level-box.png",
        key: "ui-topbar-level-box",
    },
    [BaseAssetKey.UITopbarName]: {
        assetUrl: "ui/topbar/name.png",
        key: "ui-topbar-name",
    },
    //Bubble
    [BaseAssetKey.Bubble]: {
        assetUrl: "bubble.png",
        key: "bubble",
    },
    [BaseAssetKey.FertilizerParticle]: {
        assetUrl: "tiles/fertilizer-particle.png",
        key: "fertilizer-particle",
    },

    //Press here arrow
    [BaseAssetKey.PressHereArrow]: {
        assetUrl: "press-here-arrow.png",
        key: "press-here-arrow",
    },

    //Common UI Modals
    [BaseAssetKey.UIModalCommonFrame]: {
        assetUrl: "ui/modals/common/frame.png",
        key: "ui-modal-common-frame",
    },
    [BaseAssetKey.UIModalCommonQuantityFrame]: {
        assetUrl: "ui/modals/common/quantity-frame.png",
        key: "ui-modal-common-quantity-frame",
    },
    [BaseAssetKey.UIModalCommonThumb]: {
        assetUrl: "ui/modals/common/thumb.png",
        key: "ui-modal-common-thumb",
    },
    [BaseAssetKey.UIModalCommonGrass]: {
        assetUrl: "ui/modals/common/grass.png",
        key: "ui-modal-common-grass",
    },  
    //Common UI
    [BaseAssetKey.UICommonNextAvatar]: {
        assetUrl: "ui/common/next-avatar.png",
        key: "ui-common-next-avatar",
    },
    [BaseAssetKey.UICommonPrevAvatar]: {
        assetUrl: "ui/common/prev-avatar.png",
        key: "ui-common-prev-avatar",
    },
    [BaseAssetKey.UICommonNextIcon]: {
        assetUrl: "ui/common/next-icon.png",
        key: "ui-common-next-icon",
    },
    [BaseAssetKey.UICommonPrevIcon]: {
        assetUrl: "ui/common/prev-icon.png",
        key: "ui-common-prev-icon",
    },
    [BaseAssetKey.UICommonInput]: {
        assetUrl: "ui/common/input.png",
        key: "ui-common-input",
    },
    [BaseAssetKey.UICommonButtonRed]: {
        assetUrl: "ui/common/button-red.png",
        key: "ui-common-button-red",
    },
    [BaseAssetKey.UICommonButtonGreen]: {
        assetUrl: "ui/common/button-green.png",
        key: "ui-common-button-green",
    },
    [BaseAssetKey.UICommonX]: {
        assetUrl: "ui/common/x.png",
        key: "ui-common-x",
    },
    [BaseAssetKey.UICommonX2]: {
        assetUrl: "ui/common/x2.png",
        key: "ui-common-x2",
    },
    [BaseAssetKey.UICommonIconMagnifyingGlass]: {
        assetUrl: "ui/common/icon-magnifying-glass.png",
        key: "ui-common-icon-magnifying-glass",
    },
    [BaseAssetKey.UICommonMinus]: {
        assetUrl: "ui/common/minus.png",
        key: "ui-common-minus",
    },
    [BaseAssetKey.UICommonIconCarrot]: {
        assetUrl: "ui/common/icon-carrot.png",
        key: "ui-common-icon-carrot",
    },
    [BaseAssetKey.UICommonCheck]: {
        assetUrl: "ui/common/check.png",
        key: "ui-common-check",
    },
    [BaseAssetKey.UICommonExperience]: {
        assetUrl: "ui/common/experience.png",
        key: "ui-common-experience",
    },
    [BaseAssetKey.UICommonCheckboxContainer]: {
        assetUrl: "ui/common/checkbox-container.png",
        key: "ui-common-checkbox-container",
    },
    [BaseAssetKey.UICommonCheckRound]: {
        assetUrl: "ui/common/check-round.png",
        key: "ui-common-check-round",
    },
    [BaseAssetKey.UICommonXRound]: {
        assetUrl: "ui/common/x-round.png",
        key: "ui-common-x-round",
    },
    //State
    [BaseAssetKey.BubbleState]: {
        assetUrl: "bubble-state.png",
        key: "bubble-state",
    },
    //Popup
    //PlacementPopup
    [BaseAssetKey.PopupPlacementIconYes]: {
        assetUrl: "popup/placement/yes.png",
        key: "popup-placement-icon-yes",
    },
    [BaseAssetKey.PopupPlacementIconNo]: {
        assetUrl: "popup/placement/no.png",
        key: "popup-placement-icon-no",
    },
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
        if (!value.useExisting) {
            scene.load.image(key, value.assetUrl)
        }
    }
}