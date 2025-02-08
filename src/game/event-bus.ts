import { BuildingId, PlacedItemType, TutorialStep } from "@/modules/entities"
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

    // Between Phaser scenes

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

    // tutorial events
    TutorialOpenShop = "tutorial_open_shop",
    TutorialOpenShopResponsed = "tutorial_open_shop_responsed",
    TutorialShopButtonPressed = "tutorial_shop_button_pressed",
    TutorialShopButtonPressedResponsed = "tutorial_shop_button_pressed_responsed",

    // api events
    RequestUpdateTutorial = "request_update_tutorial",
    UpdateTutorialCompleted = "update_tutorial_completed",

    RequestBuySeeds = "request_buy_seeds",
    BuySeedsCompleted = "buy_seeds_completed",
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

export type TutorialShopButtonPressedResponsedMessage = TutorialOpenShopResponsedMessage

export interface Position {
    x: number,
    y: number,
}

export interface PlacedInprogressMessage {
    // placed item
    id: BuildingId,
    type: PlacedItemType
}