import { Events } from "phaser"
// external event emitter take care of events between Phaser and React
export const SceneEventEmitter = new Events.EventEmitter()

export enum SceneEventName {
    // action to control modal
    OpenModal = "open_modal",
    CloseModal = "close_modal",

    // action to refresh items
    PlacedItemsRefreshed = "placed_items_refreshed",
    UserRefreshed = "user_refreshed",
    InventoriesRefreshed = "inventories_refreshed",

    // select tab   
    SelectTab = "select_tab",

    // action for shop
    NormalModeOn = "normal_mode_on",
    BuyingModeOn = "buying_mode_on",
    MovingModeOn = "moving_mode_on",
    SellingModeOn = "selling_mode_on",

    // actions for management buttons
    ShowButtons = "show_buttons",
    HideButtons = "hide_buttons",
    ShowNeighborButtons = "show_neighbor_buttons",
    HideNeighborButtons = "hide_neighbor_buttons",

    // action for select product modal
    UpdateSelectProductModal = "update_select_product_modal",
    UpdateInputQuantityModal = "update_input_quantity_modal",
    UpdateClaimModal = "update_claim_modal",
    UpdateConfirmModal = "update_confirm_modal",
    UpdateUpgradeModal = "update_upgrade_modal",

    // action for show backdrop
    ShowBackdrop = "show_backdrop",
    HideBackdrop = "hide_backdrop",
    UpdateBackdrop = "update_backdrop",

    // action for show topbar
    ShowTopbar = "show_topbar",
    HideTopbar = "hide_topbar",

    // action for update watching status
    UpdateWatchingStatus = "update_watching_status",

    // action for show placement mode buttons
    ShowPlacementModeButtons = "show_placement_mode_buttons",
    HidePlacementModeButtons = "hide_placement_mode_buttons",

    // action for show toolbar
    ShowToolbar = "show_toolbar",
    HideToolbar = "hide_toolbar",

    // action for fade in
    FadeIn = "fade_in",
    FadeOut = "fade_out",

    // action for center camera
    CenterCamera = "center_camera",

    // action for update volume
    UpdateVolume = "update_volume",

    // action for request storage inventory index
    RequestStorageInventoryIndex = "request_storage_inventory_index",
    StorageInventoryIndexResponsed = "storage_inventory_index_responsed",

    // action for request toolbar inventory index
    RequestToolbarInventoryIndex = "request_toolbar_inventory_index",
    ToolbarInventoryIndexResponsed = "toolbar_inventory_index_responsed",

    // action for set sell mode
    UpdateSellModal = "update_sell_modal",

    // action for check limit
    CheckLimit = "check_limit",
}

export enum ModalName {
    Shop = "shop",
    Inventory = "inventory",
    Daily = "daily",
    Quests = "quests",
    Stand = "stand",
    Neighbors = "neighbors",
    SelectProduct = "select-product",
    InputQuantity = "input-quantity",
    Claim = "claim",
    Settings = "settings",
    Profile = "profile",
    Upgrade = "upgrade",
    Sell = "sell",
}  

export interface OpenModalMessage {
    modalName: ModalName
}

export interface CloseModalMessage {
    modalName: ModalName
}   

export interface BuyingModeOnMessage {
    // placed item type id
    placedItemTypeId: string;
}
  
export interface SelectTabMessage<T = string> {
    name: string;
    tabKey: T;
}
  
export interface ClaimItem {
    assetKey: string;
    quantity?: number;
    stackable: boolean;
    scale?: number;
}
  
export interface ShowBackdropMessage {
    // depth of the backdrop
    depth: number;
    transparency?: boolean;
}

export interface UpdateVolumeMessage {
    volume: number;
}

export interface UpdateBackdropMessage {
    depth: number;
}

export interface RequestStorageInventoryIndexMessage {
    pointer: Phaser.Input.Pointer;
}

export interface StorageInventoryIndexResponsedMessage {
    index: number;
}

export interface RequestToolbarInventoryIndexMessage {
    pointer: Phaser.Input.Pointer;
}

export interface ToolbarInventoryIndexResponsedMessage {
    index: number;
}
