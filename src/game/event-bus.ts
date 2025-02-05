import { PlacedItemType } from "@/modules/entities"
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
    RefreshInventories = "refresh_inventories",
    InventoriesRefreshed = "inventories_refreshed",

    // Between Phaser scenes

    // open shop
    OpenShop = "open_shop",
    CloseShop = "close_shop",
    SelectShopTab = "select_shop_tab",

    //
    OpenModal = "open_modal",
    CloseModal = "close_modal",

    // open inventory
    OpenInventory = "open_inventory",
    // change inventory tab
    InventoryTabSelected = "inventory_tab_selected",
    // modal closed
    ModalClosed = "modal_closed",

    // place item
    PlaceInprogress = "place_inprogress",

    LoadCompleted = "load_completed",

    SelectTool = "select_tool",
}

export interface PlacedInprogressMessage {
    // type of item being placed
    type: PlacedItemType,
    // id of the item being placed
    id: string,
}