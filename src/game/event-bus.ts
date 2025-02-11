import { PlacedItemType, TutorialStep } from "@/modules/entities"
import { Events } from "phaser"

// Used to emit events between React components and Phaser scenes
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Events.EventEmitter
export const EventBus = new Events.EventEmitter()

// events
export enum EventName {
    // Between Phaser and React

    // send authenticate event, from Phaser to React
    Authenticate = "authenticate",
    // send authenticated event, from React to Phaser
    Authenticated = "authenticated",
    // placed items to sync in-game
    PlacedItemsSynced = "placed_items_synced",
    // request to load static data, from Phaser to React
    LoadStaticData = "load_static_data",
    // static data loaded, from React to Phaser
    StaticDataLoaded = "static_data_loaded",
    // request to load user data, from Phaser to React
    LoadUser = "load_user",
    // user data loaded, from React to Phaser
    UserLoaded = "user_loaded",
    // inventory loaded, from React to Phaser
    LoadInventories = "load_inventories",
    // inventory loaded, from React to Phaser
    InventoriesLoaded = "inventories_loaded",
    
    // refresh
    RefreshUser = "refresh_user",
    UserRefreshed = "user_refreshed",
    RefreshInventories = "refresh_inventories",
    InventoriesRefreshed = "inventories_refreshed",

    // open shop
    OpenShop = "open_shop",
    CloseShop = "close_shop",
    SelectShopTab = "select_shop_tab",

    // modal events
    OpenModal = "open_modal",
    CloseModal = "close_modal",

    // tutorial events
    OpenTutorial = "open_tutorial",
    CloseTutorial = "close_tutorial",

    // backdrops
    ShowGameplayBackdrop = "show_gameplay_backdrop",
    HideGameplayBackdrop = "hide_gameplay_backdrop",
    UpdateGameplayBackdrop = "update_gameplay_backdrop",
    ShowUIBackdrop = "show_ui_backdrop",
    HideUIBackdrop = "hide_ui_backdrop",

    // hide press here arrow
    HidePressHereArrow = "hide_press_here_arrow",
    
    // hide the buttons
    HideButtons = "hide_buttons",
    ShowButtons = "show_buttons",
    
    // open inventory
    OpenInventory = "open_inventory",
    // change inventory tab
    InventoryTabSelected = "inventory_tab_selected",

    // place item
    PlaceInprogress = "place_inprogress",

    // load completed
    LoadCompleted = "load_completed",

    // tool selected
    SelectTool = "select_tool",
    SelectNeighborsTab = "select_neighbors_tab",
    PageMoved = "page_moved",

    // tutorial events
    TutorialOpenShop = "tutorial_open_shop",
    TutorialOpenShopResponsed = "tutorial_open_shop_responsed",
    TutorialOpenShopPressed = "tutorial_open_shop_pressed",
    TutorialShopButtonPressed = "tutorial_shop_button_pressed",
    TutorialShopButtonPressedResponsed = "tutorial_shop_button_pressed_responsed",
    TutorialPrepareBuySeeds = "tutorial_prepare_buy_seeds",
    TutorialPrepareBuySeedsResponsed = "tutorial_prepare_buy_seeds_responsed",
    TutorialPrepareCloseShop = "tutorial_prepare_close_shop",
    TutorialPrepareCloseShopResponsed = "tutorial_prepare_close_shop_responsed",
    TutorialCloseShopButtonPressed = "tutorial_close_shop_button_pressed",
    TutorialOpenInventory = "tutorial_open_inventory",
    TutorialOpenInventoryResponsed = "tutorial_open_inventory_responsed",
    TutorialInventoryButtonPressed = "tutorial_inventory_button_pressed",
    TutorialPlantSeeds = "tutorial_plant_seeds",
    TutorialSeedsPressed = "tutorial_seeds_pressed",
    TutorialScythePressed = "tutorial_scythe_pressed",
    TutorialSeedPlanted = "tutorial_seed_planted",
    TutorialTilePressed = "tutorial_tile_pressed",
    TutorialCropWatered = "tutorial_crop_watered",
    TutorialCropPesticideUsed = "tutorial_crop_pesticide_used",
    TutorialCropHerbicideUsed = "tutorial_crop_herbicide_used",
    TutorialCropHarvested = "tutorial_crop_harvested",
    TutorialPesiticidePressed = "tutorial_pesticide_pressed",
    TutorialHerbicidePressed = "tutorial_herbicide_pressed",
    TutorialTilePressedResponsed = "tutorial_tile_pressed_responsed",
    TutorialWaterCanPressed = "tutorial_water_can_pressed",
    TutorialResetToolbar = "tutorial_reset_toolbar",
    TutorialHighlightToolbar = "tutorial_highlight_toolbar",
    // api events
    RequestUpdateTutorial = "request_update_tutorial",
    UpdateTutorialCompleted = "update_tutorial_completed",

    RequestBuySeeds = "request_buy_seeds",
    BuySeedsCompleted = "buy_seeds_completed",

    RequestUsePesticide = "request_use_pesticide",
    UsePesticideCompleted = "use_pesticide_completed",

    RequestUseHerbicide = "request_use_herbicide",
    UseHerbicideCompleted = "use_herbicide_completed",

    RequestPlantSeed = "request_plant_seed",
    PlantSeedCompleted = "plant_seed_completed",

    RequestWater = "request_water_crop",
    WaterCompleted = "water_crop_completed",

    RequestHarvestCrop = "request_harvest_crop",
    HarvestCropCompleted = "harvest_crop_completed",
}

export interface OpenTutorialMessage {
    // name of the tutorial to open
    tutorialStep: TutorialStep,
}

export interface CloseTutorialMessage {
    // name of the tutorial to close
    tutorialStep: TutorialStep,
} 

export interface TutorialOpenShopResponsedMessage {
    // position of the shop button
    position: Position,
}

export interface TutorialOpenInventoryResponsedMessage {
    // position of the shop button
    position: Position,
}

export interface TutorialWaterCanPressedMessage {
    // position of the shop button
    position: Position,
}

export interface TutorialPrepareBuySeedsMessage {
    // position of the shop button
    position: Position,
}

export interface TutorialPrepareCloseShopResponsedMessage {
    // position of the shop button
    position: Position,
}

export interface TutorialTilePressedResponsedMessage {
    // position of the shop button
    position: Position,
}

export interface Position {
    x: number,
    y: number,
}

export interface PlacedInprogressMessage {
    // placed item
    id: string,
    type: PlacedItemType
}

export interface ShowGameplayBackdropMessage {
    // depth of the backdrop
    depth: number
}

export interface ShowUIBackdropMessage {
    // depth of the backdrop
    depth: number
}

export interface UpdateGameplayBackdropMessage {
    // position of the backdrop
    scrollXY: Position
}


export enum ModalName {
  Shop = "shop",
  Inventory = "inventory",
  Daily = "daily",
  Quest = "quest",
  Stand = "stand",
  Neighbors = "neighbors",
}

export interface OpenModalMessage {
    // name of the modal to open
    modalName: ModalName
    // show tutorial backdrop
    showTutorialBackdrop?: boolean
}

export interface CloseModalMessage {
    // name of the modal to close
    modalName: ModalName
    hideTutorialBackdrop?: boolean
}