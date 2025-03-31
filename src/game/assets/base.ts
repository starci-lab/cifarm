// Asset Enum for Base assets

import { BaseData } from "./types"
import { loadTexture } from "./utils"

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
  UICommonMinus = "ui-common-minus",
  UICommonPlus = "ui-common-plus",
  UICommonIconGold = "ui-common-icon-gold",
  UICommonIconCarrot = "ui-common-icon-carrot",
  UICommonCheck = "ui-common-check",
  UICommonX2 = "ui-common-x2",
  UICommonExperience = "ui-common-experience",
  UICommonCheckRound = "ui-common-check-round",
  UICommonXRound = "ui-common-x-round",
  UICommonResourceLabelBackground = "ui-common-resource-label-background",
  UICommonLargeFrame = "ui-common-large-frame",
  UICommonPurpleStar = "ui-common-purple-star",
  UICommonFadeStar = "ui-common-fade-star",
  UICommonUpgradeStar = "ui-common-upgrade-star",

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
  FertilizerParticle = "fertilizer-particle",
  //State
  BubbleState = "bubble-state",
}

export interface BootstrapAssetData {
  base: BaseData;
}
export const bootstrapAssetMap: Record<BootstrapAssetKey, BootstrapAssetData> =
  {
      [BootstrapAssetKey.Background]: {
          base: {
              textureConfig: {
                  assetUrl: "background.png",
                  key: "background",
              },
          },
      },
      [BootstrapAssetKey.Logo]: {
          base: {
              textureConfig: {
                  assetUrl: "logo.png",
                  key: "logo",
              },
          },
      },
      [BootstrapAssetKey.LoadingBar]: {
          base: {
              textureConfig: {
                  assetUrl: "loading-bar.png",
                  key: "loading-bar",
              },
          },
      },
      [BootstrapAssetKey.LoadingFill]: {
          base: {
              textureConfig: {
                  assetUrl: "loading-fill.png",
                  key: "loading-fill",
              },
          },
      },
  }

export interface BaseAssetData {
  base: BaseData;
}
// updated baseAssetMap with BaseAssetKey enum values
export const baseAssetMap: Record<BaseAssetKey, BaseAssetData> = {
    [BaseAssetKey.Grass]: {
        base: {
            textureConfig: {
                assetUrl: "grass.png",
                key: "grass",
            },
        },
    },
    // icons
    [BaseAssetKey.UIIconShop]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/shop.png",
                key: "ui-icon-shop",
            },
        },
    },
    [BaseAssetKey.UIIconRoadsideStand]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/roadside-stand.png",
                key: "ui-icon-roadside-stand",
            },
        },
    },
    [BaseAssetKey.UIIconNFTMarketplace]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/nft-marketplace.png",
                key: "ui-icon-nft-marketplace",
            },
        },
    },
    [BaseAssetKey.UIIconNeighbors]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/neighbors.png",
                key: "ui-icon-neighbors",
            },
        },
    },
    [BaseAssetKey.UIIconInventory]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/inventory.png",
                key: "ui-icon-inventory",
            },
        },
    },
    [BaseAssetKey.UIIconDaily]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/daily.png",
                key: "ui-icon-daily",
            },
        },
    },
    [BaseAssetKey.UIIconQuests]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/quests.png",
                key: "ui-icon-quests",
            },
        },
    },
    [BaseAssetKey.UIIconSetting]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/settings.png",
                key: "ui-icon-setting",
            },
        },
    },
    [BaseAssetKey.UIIconReturn]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/return.png",
                key: "ui-icon-return",
            },
        },
    },
    [BaseAssetKey.UIIconMove]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/move.png",
                key: "ui-icon-move",
            },
        },
    },
    [BaseAssetKey.UIIconSell]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/sell.png",
                key: "ui-icon-sell",
            },
        },
    },
    // backgrounds
    [BaseAssetKey.UIBackgroundLarge]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/large.png",
                key: "ui-background-large",
            },
        },
    },
    [BaseAssetKey.UIBackgroundMedium]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/medium.png",
                key: "ui-background-medium",
            },
        },
    },
    [BaseAssetKey.UIBackgroundXLarge]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/xlarge.png",
                key: "ui-background-x-large",
            },
        },
    },
    [BaseAssetKey.UIBackgroundLargeContainer]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/large-container.png",
                key: "ui-background-large-container",
            },
        },
    },
    [BaseAssetKey.UIBackgroundSmallContainer]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/small-container.png",
                key: "ui-background-small-container",
            },
        },
    },
    [BaseAssetKey.UIBackgroundSmall]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/small.png",
                key: "ui-background-small",
            },
        },
    },
    [BaseAssetKey.UIBackgroundXLargeWrapperContainer]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/xlarge-wrapper-container.png",
                key: "ui-background-x-large-wrapper-container",
            },
        },
    },
    [BaseAssetKey.UIBackgroundXXLarge]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/xxlarge.png",
                key: "ui-background-xx-large",
            },
        },
    },
    [BaseAssetKey.UIBackgroundXXLargeTabContainer]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/xxlarge-tab-container.png",
                key: "ui-background-xx-large-tab-container",
            },
        },
    },
    [BaseAssetKey.UIBackgroundLargeWrapperContainer]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/large-wrapper-container.png",
                key: "ui-background-large-wrapper-container",
            },
        },
    },
    [BaseAssetKey.UIBackgroundXXLargeWrapperContainer]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/xxlarge-wrapper-container.png",
                key: "ui-background-xx-large-wrapper-container",
            },
        },
    },
    [BaseAssetKey.UIBackgroundMediumContainer]: {
        base: {
            textureConfig: {
                assetUrl: "ui/backgrounds/medium-container.png",
                key: "ui-background-medium-container",
            },
        },
    },
    // tab
    [BaseAssetKey.UITabFrame]: {
        base: {
            textureConfig: {
                assetUrl: "ui/tab/frame.png",
                key: "ui-tab-frame",
            },
        },
    },
    [BaseAssetKey.UITabSlat]: {
        base: {
            textureConfig: {
                assetUrl: "ui/tab/slat.png",
                key: "ui-tab-slat",
            },
        },
    },

    // shop UIModals
    [BaseAssetKey.UIModalShopCard]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/card.png",
                key: "ui-modal-shop-card",
            },
        },
    },
    [BaseAssetKey.UIModalShopLock]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/lock.png",
                key: "ui-modal-shop-lock",
            },
        },
    },
    [BaseAssetKey.UIModalShopOff]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/off.png",
                key: "ui-modal-shop-off",
            },
        },
    },
    [BaseAssetKey.UIModalShopAnimalsTab]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/animals-tab.png",
                key: "ui-modal-shop-animals-tab",
            },
        },
    },
    [BaseAssetKey.UIModalShopBuildingTab]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/buildings-tab.png",
                key: "ui-modal-shop-buildings-tab",
            },
        },
    },
    [BaseAssetKey.UIModalShopDecorationTab]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/decoration-tab.png",
                key: "ui-modal-shop-decoration-tab",
            },
        },
    },
    [BaseAssetKey.UIModalShopPetsTab]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/pets-tab.png",
                key: "ui-modal-shop-pets-tab",
            },
        },
    },
    [BaseAssetKey.UIModalShopToolsTab]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/tools-tab.png",
                key: "ui-modal-shop-tools-tab",
            },
        },
    },
    [BaseAssetKey.UIModalShopTilesTab]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/tiles-tab.png",
                key: "ui-modal-shop-tiles-tab",
            },
        },
    },
    [BaseAssetKey.UIModalShopSeedsTab]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/seeds-tab.png",
                key: "ui-modal-shop-seeds-tab",
            },
        },
    },
    [BaseAssetKey.UIModalShopSuppliesTab]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/supplies-tab.png",
                key: "ui-modal-shop-supplies-tab",
            },
        },
    },
    [BaseAssetKey.UIModalShopFruitsTab]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/fruits-tab.png",
                key: "ui-modal-shop-fruits-tab",
            },
        },
    },
    [BaseAssetKey.UIModalShopFlowersTab]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/shop/flowers-tab.png",
                key: "ui-modal-shop-flowers-tab",
            },
        },
    },

    // Inventory UIModals
    [BaseAssetKey.UIModalInventoryChain]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/inventory/chain.png",
                key: "ui-modal-inventory-chain",
            },
        },
    },
    [BaseAssetKey.UIModalInventoryToolbar]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/inventory/toolbar.png",
                key: "ui-modal-inventory-toolbar",
            },
        },
    },
    [BaseAssetKey.UIModalInventoryToolbarContainer]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/inventory/toolbar-container.png",
                key: "ui-modal-inventory-toolbar-container",
            },
        },
    },

    // Daily UIModals
    [BaseAssetKey.UIModalDailyWall]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/daily/wall.png",
                key: "ui-modal-daily-wall",
            },
        },
    },
    [BaseAssetKey.UIModalDailyTitle]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/daily/title.png",
                key: "ui-modal-daily-title",
            },
        },
    },
    [BaseAssetKey.UIModalDailyIconCheck]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/daily/icon-check.png",
                key: "ui-modal-daily-icon-check",
            },
        },
    },
    [BaseAssetKey.UIModalDailyIconClose]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/daily/icon-close.png",
                key: "ui-modal-daily-icon-close",
            },
        },
    },
    [BaseAssetKey.UIModalDailyLastDayAvatar]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/daily/last-day-avatar.png",
                key: "ui-modal-daily-last-day-avatar",
            },
        },
    },
    [BaseAssetKey.UIModalDailyBaseDayAvatar]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/daily/base-day-avatar.png",
                key: "ui-modal-daily-base-day-avatar",
            },
        },
    },
    [BaseAssetKey.UIModalDailyCoin1]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/daily/coin-1.png",
                key: "ui-modal-daily-coin1",
            },
        },
    },
    [BaseAssetKey.UIModalDailyCoin2]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/daily/coin-2.png",
                key: "ui-modal-daily-coin2",
            },
        },
    },
    [BaseAssetKey.UIModalDailyCoin3]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/daily/coin-3.png",
                key: "ui-modal-daily-coin3",
            },
        },
    },
    [BaseAssetKey.UIModalDailyDay]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/daily/day.png",
                key: "ui-modal-daily-day",
            },
        },
    },

    // Toolbar
    [BaseAssetKey.UIToolbarBackground]: {
        base: {
            textureConfig: {
                assetUrl: "ui/toolbar/background.png",
                key: "ui-toolbar-background",
            },
        },
    },
    [BaseAssetKey.UIToolbarSelectedArrow]: {
        base: {
            textureConfig: {
                assetUrl: "ui/toolbar/selected-arrow.png",
                key: "ui-toolbar-selected-arrow",
            },
        },
    },
    //Stand
    [BaseAssetKey.UIModalStandWall]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/stand/wall.png",
                key: "ui-modal-stand-wall",
            },
        },
    },
    [BaseAssetKey.UIModalStandHeader]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/stand/header.png",
                key: "ui-modal-stand-header",
            },
        },
    },
    [BaseAssetKey.UIModalStandTag]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/stand/tag.png",
                key: "ui-modal-stand-tag",
            },
        },
    },
    [BaseAssetKey.UIModalStand]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/stand/stand.png",
                key: "ui-modal-stand",
            },
        },
    },
    [BaseAssetKey.UIModalStandWhiteStar]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/stand/star-white.png",
                key: "ui-modal-stand-white-star",
            },
        },
    },
    [BaseAssetKey.UIModalStandPurpleStar]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/stand/star-purple.png",
                key: "ui-modal-stand-purple-star",
            },
        },
    },
    [BaseAssetKey.UIModalStandShadow]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/stand/shadow.png",
                key: "ui-modal-stand-shadow",
            },
        },
    },
    //Topbar
    [BaseAssetKey.UITopbarHeader]: {
        base: {
            textureConfig: {
                assetUrl: "ui/topbar/header.png",
                key: "ui-topbar-header",
            },
        },
    },
    [BaseAssetKey.UITopbarIconEnergy]: {
        base: {
            textureConfig: {
                assetUrl: "ui/topbar/icon-energy.png",
                key: "ui-topbar-icon-energy",
            },
        },
    },
    [BaseAssetKey.UITopbarResource]: {
        base: {
            textureConfig: {
                assetUrl: "ui/topbar/resource.png",
                key: "ui-topbar-resource",
            },
        },
    },
    [BaseAssetKey.UITopbarAvatar]: {
        base: {
            textureConfig: {
                assetUrl: "ui/topbar/avatar.png",
                key: "ui-topbar-avatar",
            },
        },
    },
    [BaseAssetKey.UITopbarAvatarMask]: {
        base: {
            textureConfig: {
                assetUrl: "ui/topbar/avatar-mask.png",
                key: "ui-topbar-avatar-mask",
            },
        },
    },
    [BaseAssetKey.UITopbarAvatarWrapper]: {
        base: {
            textureConfig: {
                assetUrl: "ui/topbar/avatar-wrapper.png",
                key: "ui-topbar-avatar-wrapper",
            },
        },
    },
    [BaseAssetKey.UITopbarLevelBox]: {
        base: {
            textureConfig: {
                assetUrl: "ui/topbar/level-box.png",
                key: "ui-topbar-level-box",
            },
        },
    },
    [BaseAssetKey.UITopbarName]: {
        base: {
            textureConfig: {
                assetUrl: "ui/topbar/name.png",
                key: "ui-topbar-name",
            },
        },
    },

    //Bubble
    [BaseAssetKey.FertilizerParticle]: {
        base: {
            textureConfig: {
                assetUrl: "tiles/fertilizer-particle.png",
                key: "tiles-fertilizer-particle",
            },
        },
    },

    //Common UI Modals
    [BaseAssetKey.UIModalCommonFrame]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/common/frame.png",
                key: "ui-modal-common-frame",
            },
        },
    },
    [BaseAssetKey.UIModalCommonQuantityFrame]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/common/quantity-frame.png",
                key: "ui-modal-common-quantity-frame",
            },
        },
    },
    [BaseAssetKey.UIModalCommonThumb]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/common/thumb.png",
                key: "ui-modal-common-thumb",
            },
        },
    },
    [BaseAssetKey.UIModalCommonGrass]: {
        base: {
            textureConfig: {
                assetUrl: "ui/modals/common/grass.png",
                key: "ui-modal-common-grass",
            },
        },
    },

    //Common UI
    [BaseAssetKey.UICommonNextAvatar]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/next-avatar.png",
                key: "ui-common-next-avatar",
            },
        },
    },
    [BaseAssetKey.UICommonPrevAvatar]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/prev-avatar.png",
                key: "ui-common-prev-avatar",
            },
        },
    },
    [BaseAssetKey.UICommonInput]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/input.png",
                key: "ui-common-input",
            },
        },
    },
    [BaseAssetKey.UICommonButtonRed]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/button-red.png",
                key: "ui-common-button-red",
            },
        },
    },
    [BaseAssetKey.UICommonButtonGreen]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/button-green.png",
                key: "ui-common-button-green",
            },
        },
    },
    [BaseAssetKey.UICommonMinus]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/minus.png",
                key: "ui-common-minus",
            },
        },
    },
    [BaseAssetKey.UICommonPlus]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/plus.png",
                key: "ui-common-plus",
            },
        },
    },
    [BaseAssetKey.UICommonIconGold]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/icon-gold.png",
                key: "ui-common-icon-gold",
            },
        },
    },
    [BaseAssetKey.UICommonIconCarrot]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/icon-carrot.png",
                key: "ui-common-icon-carrot",
            },
        },
    },
    [BaseAssetKey.UICommonCheck]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/check.png",
                key: "ui-common-check",
            },
        },
    },
    [BaseAssetKey.UICommonExperience]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/experience.png",
                key: "ui-common-experience",
            },
        },
    },
    [BaseAssetKey.UICommonSliderThumb]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/slider-thumb.png",
                key: "ui-common-slider-thumb",
            },
        },
    },
    [BaseAssetKey.UICommonCheckRound]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/check-round.png",
                key: "ui-common-check-round",
            },
        },
    },
    [BaseAssetKey.UICommonXRound]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/x-round.png",
                key: "ui-common-x-round",
            },
        },
    },
    [BaseAssetKey.UICommonResourceLabelBackground]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/resource-label-background.png",
                key: "ui-common-resource-label-background",
            },
        },
    },
    [BaseAssetKey.UICommonLargeFrame]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/large-frame.png",
                key: "ui-common-large-frame",
                version: 1,
            },
        },
    },
    [BaseAssetKey.UICommonPurpleStar]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/purple-star.png",
                key: "ui-common-purple-star",
            },
        },
    },
    [BaseAssetKey.UICommonFadeStar]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/fade-star.png",
                key: "ui-common-fade-star",
                version: 1,
            },
        },
    },
    [BaseAssetKey.UICommonUpgradeStar]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/upgrade-star.png",
                key: "ui-common-upgrade-star",
                version: 1,
            },
        },
    },
    //State
    [BaseAssetKey.BubbleState]: {
        base: {
            textureConfig: {
                assetUrl: "states/bubble-state.png",
                key: "bubble-state",
                version: 1,
            },
        },
    },
    [BaseAssetKey.UIIconNext]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/next.png",
                key: "ui-icon-next",
            },
        },
    },
    [BaseAssetKey.UIIconPrevious]: {
        base: {
            textureConfig: {
                assetUrl: "ui/icons/previous.png",
                key: "ui-icon-previous",
            },
        },
    },
    [BaseAssetKey.UICommonNextIcon]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/next-icon.png",
                key: "ui-common-next-icon",
            },
        },
    },
    [BaseAssetKey.UICommonPrevIcon]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/prev-icon.png",
                key: "ui-common-prev-icon",
            },
        },
    },
    [BaseAssetKey.UICommonX]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/x.png",
                key: "ui-common-x",
            },
        },
    },
    [BaseAssetKey.UICommonX2]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/x2.png",
                key: "ui-common-x2",
            },
        },
    },
    [BaseAssetKey.UICommonSliderTrack]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/slider-track.png",
                key: "ui-common-slider-track",
            },
        },
    },
    [BaseAssetKey.UICommonCheckboxContainer]: {
        base: {
            textureConfig: {
                assetUrl: "ui/common/checkbox-container.png",
                key: "ui-common-checkbox-container",
            },
        },
    },
}

// preload, for loading screen
export const loadBootstrapAssets = async (scene: Phaser.Scene) => {
    const promises: Array<Promise<void>> = []
    for (const value of Object.values(bootstrapAssetMap)) {
        if (value.base) {
            promises.push(loadTexture(scene, value.base.textureConfig))
        }
    }
    await Promise.all(promises)
}

// asset Loading Function for `baseAssetMap`
export const loadBaseAssets = async (scene: Phaser.Scene) => {
    const promises: Array<Promise<void>> = []
    for (const value of Object.values(baseAssetMap)) {
        if (value.base) {
            promises.push(loadTexture(scene, value.base.textureConfig))
        }
    }
    await Promise.all(promises)
}
