import { InventorySchema, PlacedItemSchema, PlacedItemType, UserSchema } from "@/modules/entities"
import { Events } from "phaser"

// Used to emit events between React components and Phaser scenes
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Events.EventEmitter
export const EventBus = new Events.EventEmitter()

// events
export enum EventName {
    CloseGame = "close_game",
    Dragging = "dragging",
    DragEnd = "dragend",
    // Between Phaser and React
    // send authenticate event, from Phaser to React
    Authenticate = "authenticate",
    // send authenticated event, from React to Phaser
    Authenticated = "authenticated",
    // placed items to sync in-game
    PlacedItemsSynced = "placed_items_synced",
    PlacedItemsRefreshed = "update_placed_items",
    // action emitted in-game
    ActionEmitted = "action_emitted",
    // show fade in/out
    ShowFade = "show_fade",
    // request to load static data, from Phaser to React
    LoadStaticData = "load_static_data",
    // static data loaded, from React to Phaser
    StaticDataLoaded = "static_data_loaded",
    // request to load user data, from Phaser to React
    LoadUser = "load_user",
    // user data loaded, from React to Phaser
    UserLoaded = "user_loaded",
    // user load placed items, from React to Phaser
    LoadPlacedItems = "load_placed_items",
    // placed items loaded, from React to Phaser
    PlacedItemsLoaded = "placed_items_loaded",
    // inventory loaded, from React to Phaser
    LoadInventories = "load_inventories",
    // inventory loaded, from React to Phaser
    InventoriesLoaded = "inventories_loaded",
    // neighbors loaded, from React to Phaser
    LoadNeighbors = "load_neighbors",
    // neighbors loaded, from React to Phaser
    NeighborsLoaded = "neighbors_loaded",
    // followees loaded, from React to Phaser
    LoadFollowees = "request_followees",
    // followees loaded, from React to Phaser
    FolloweesLoaded = "followees_loaded",
    // energy synced, from React to Phaser
    EnergySynced = "energy_synced",
    // inventory synced, from React to Phaser
    InventorySynced = "inventory_synced",
    // user synced, from React to Phaser
    UserSynced = "user_synced",
    // sync placed items, from React to Phaser
    SyncPlacedItems = "sync_placed_items",
    // refresh
    RefreshUser = "refresh_user",
    UserRefreshed = "user_refreshed",
    RefreshInventories = "refresh_inventories",
    InventoriesRefreshed = "inventories_refreshed",
    RefreshDeliveringProducts = "refresh_delivering_products",
    DeliveringProductsRefreshed = "delivering_products_refreshed",
    RefreshNeighbors = "refresh_neighbors",
    NeighborsRefreshed = "neighbors_refreshed",
    RefreshFollowees = "refresh_followees",
    FolloweesRefreshed = "followees_refreshed",

    // open shop
    OpenShop = "open_shop",
    CloseShop = "close_shop",
    SelectTab = "select_tab",

    // modal events
    OpenModal = "open_modal",
    CloseModal = "close_modal",
    CloseAllModals = "close_all_modals",

    OpenReferralLinkModal = "open-referral-link-modal",
    OpenExternalModal = "open-external-modal",

    // stand
    UpdateSelectProductModal = "update_select_product_modal",
    UpdateInputQuantityModal = "update_input_quantity_modal",
    UpdateClaimModal = "update_claim_modal",
    // backdrops
    ShowGameplayBackdrop = "show_gameplay_backdrop",
    HideGameplayBackdrop = "hide_gameplay_backdrop",
    ShowUIBackdrop = "show_ui_backdrop",
    HideUIBackdrop = "hide_ui_backdrop",
    UpdateUIBackdrop = "update_ui_backdrop",

    // hide press here arrow
    ShowPressHereArrow = "show_press_here_arrow",
    HidePressHereArrow = "hide_press_here_arrow",
    
    // hide the buttons
    HideButtons = "hide_buttons",
    ShowButtons = "show_buttons",
    HideNeighborButtons = "hide_neighbor_buttons",
    ShowNeighborButtons = "show_neighbor_buttons",
    HidePlacementModeButtons = "hide_selling_mode_buttons",
    ShowPlacementModeButtons = "show_selling_mode_buttons",
    HideTopbar = "hide_topbar",
    ShowTopbar = "show_topbar",
    ShowToolbar = "show_toolbar",
    HideToolbar = "hide_toolbar",
    
    // open inventory
    OpenInventory = "open_inventory",
    // change inventory tab
    InventoryTabSelected = "inventory_tab_selected",

    // buying mode
    BuyingModeOn = "buying_mode_on",
    MovingModeOn = "moving_mode_on",
    NormalModeOn = "normal_mode_on",
    SellingModeOn = "selling_mode_on",

    CenterCamera = "center_camera",

    // load completed
    LoadCompleted = "load_completed",

    // tool selected
    SelectTool = "select_tool",
    SelectNeighborsTab = "select_neighbors_tab",
    PageMoved = "page_moved",

    RequestStorageInventoryIndex = "request_storage_inventory_index",
    RequestToolbarInventoryIndex = "request_toolbar_inventory_index",
    StorageInventoryIndexResponsed = "storage_inventory_index_responsed",
    ToolbarInventoryIndexResponsed = "toolbar_inventory_index_responsed",

    RequestSyncPlacedItems = "request_sync_placed_items",
    SyncPlacedItemsCompleted = "sync_placed_items_completed",

    RequestUpdateFollowX = "request_update_follow_x",
    UpdateFollowXCompleted = "update_follow_x_completed",

    RequestUpdateReferral = "request_update_referral",
    UpdateReferralCompleted = "update_referral_completed",

    RequestBuySeeds = "request_buy_seeds",
    BuySeedsCompleted = "buy_seeds_completed",

    RequestUsePesticide = "request_use_pesticide",
    UsePesticideCompleted = "use_pesticide_completed",

    RequestUseHerbicide = "request_use_herbicide",
    UseHerbicideCompleted = "use_herbicide_completed",

    RequestPlantSeed = "request_plant_seed",
    PlantSeedCompleted = "plant_seed_completed",

    RequestWaterCrop = "request_water_crop",
    WaterCropCompleted = "water_crop_completed",

    RequestHarvestCrop = "request_harvest_crop",
    HarvestCropCompleted = "harvest_crop_completed",

    RequestHarvestAnimal = "request_harvest_animal",
    HarvestAnimalCompleted = "harvest_animal_completed",

    RequestSell = "request_sell",
    SellCompleted = "sell_completed",

    RequestConstructBuilding = "request_construct_building",
    ConstructBuildingCompleted = "construct_building_completed",
    RequestBuyBuilding = "request_buy_building",
    BuyBuildingCompleted = "buy_building_completed",

    RequestBuyFruit = "request_buy_fruit",
    BuyFruitCompleted = "buy_fruit_completed",

    RequestUseFertilizer = "request_use_fertilizer",
    UseFertilizerCompleted = "use_fertilizer_completed",

    RequestBuyTile = "request_buy_tile",
    BuyTileCompleted = "buy_tile_completed",
    RequestMoveInventory = "request_move_inventory",
    RequestMoveInventoryLocal = "request_move_inventory_local",
    MoveInventoryCompleted = "move_inventory_completed",

    RequestDeliverProduct = "request_deliver_product",
    DeliverProductCompleted = "deliver_product_completed",

    RequestDeliverMoreProduct = "request_deliver_more_product",
    DeliverMoreProductCompleted = "deliver_more_product_completed",

    RequestRetainProduct = "request_retain_product",
    RetainProductCompleted = "retain_product_completed",

    RequestFollow = "request_follow",
    FollowCompleted = "follow_completed",

    RequestUnfollow = "request_unfollow",
    UnfollowCompleted = "unfollow_completed",

    RequestVisit = "request_visit",
    VisitCompleted = "visit_completed",

    RequestReturn = "request_return",
    ReturnCompleted = "return_completed",

    RequestHelpWaterCrop = "request_help_water_crop",
    HelpWaterCropCompleted = "help_water_crop_completed",

    RequestHelpCureAnimal = "request_help_cure_animal",
    HelpCureAnimalCompleted = "help_cure_animal_completed",

    RequestHelpUsePesticide = "request_help_pesticide",
    HelpUsePesticideCompleted = "help_pesticide_completed",

    RequestHelpUseHerbicide = "request_help_herbicide",
    HelpUseHerbicideCompleted = "help_herbicide_completed",

    RequestThiefCrop = "request_thief_crop",
    ThiefCropCompleted = "thief_crop_completed",

    ThiefAnimalProductCompleted = "thief_animal_product_completed",
    RequestThiefAnimalProduct = "request_thief_animal_product",

    RequestBuyAnimal = "request_buy_animal",
    BuyAnimalCompleted = "buy_animal_completed",

    RequestBuyTool = "request_buy_tool",
    BuyToolCompleted = "buy_tool_completed",

    RequestClaimDailyReward = "request_claim_daily_reward",
    ClaimDailyRewardCompleted = "claim_daily_reward_completed",

    RequestFeedAnimal = "request_feed_animal",
    FeedAnimalCompleted = "feed_animal_completed",

    RequestCureAnimal = "request_cure_animal",
    CureAnimalCompleted = "cure_animal_completed",

    RequestBuySupplies = "request_buy_supplies",
    BuySuppliesCompleted = "buy_supplies_completed",

    RequestUpgradeBuilding = "request_upgrade_building",
    UpgradeBuildingCompleted = "upgrade_building_completed",

    RequestHelpFeedAnimal = "request_help_feed_animal",
    HelpFeedAnimalCompleted = "help_feed_animal_completed",

    RequestHarvestFruit = "request_harvest_fruit",
    HarvestFruitCompleted = "harvest_fruit_completed",

    RequestThiefFruit = "request_thief_fruit",
    ThiefFruitCompleted = "thief_fruit_completed",

    RequestUseBugNet = "request_use_bug_net",
    UseBugNetCompleted = "use_bug_net_completed",

    RequestHelpUseBugNet = "request_help_use_bug_net",
    HelpUseBugNetCompleted = "help_use_bug_net_completed",

    RequestHelpUseFruitFertilizer = "request_help_use_fruit_fertilizer",
    HelpUseFruitFertilizerCompleted = "help_use_fruit_fertilizer_completed",

    RequestUseFruitFertilizer = "request_use_fruit_fertilizer",
    UseFruitFertilizerCompleted = "use_fruit_fertilizer_completed",


    CreateFlyItem = "create_fly_item",
    CreateFlyItems = "create_fly_items",

    FadeIn = "fade_in",
    FadeOut = "fade_out",
    FadeAll = "fade_all",

    Visit = "visit",
    Return = "return",

    RefreshActivePlacedItem = "refresh_active_placed_item",
    ActivePlacedItemRefreshed = "active_placed_item_refreshed",

    SyncDelayStarted = "sync_delay_started",
    SyncDelayEnded = "sync_delay_ended",

    RequestUpdatePlacedItemLocal = "update_placed_item_local",
    RefreshPlaceItemsCacheKey = "refresh_place_items_cache_key",
    UpdateUpgadeBuildingModal = "update_upgrade_building_modal",

    UpdateVisitedNeighbor = "update_visited_neighbor",

    UpdateConfirmModal = "update_warning_modal",
    UpdateConfirmSellModal = "update_warning_sell_modal",

    UpdateVolume = "update_volume",

    WatchUserChanged = "watch_user_changed",

    RequestMove = "request_move",
    MoveCompleted = "move_completed",

    HandlePlacedItemUpdatePosition = "handle_placed_item_update_position",
    //Turn on sellPlacementMode
    SellPlacementModeOn = "sell_placement_mode_on",
    SellPlacementModeOff = "sell_placement_mode_off",

    UpdatePlacementConfirmation = "update_placement_confirmation",
}

export interface WatchUserChangedMessage {
    prevUser: UserSchema
    currentUser: UserSchema
}


export interface SelectToolMessage {
    index: number,
    animate?: boolean
}

export interface Position {
    x: number,
    y: number,
}

export interface BuyingModeOnMessage {
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
    opacityLevel?: number
}

export interface UpdateUIBackdropMessage {
    // position of the backdrop
    depth: number
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
  AnimalHousing = "animal-housing",
  Claim = "claim",
  Settings = "settings",
  Profile = "profile",
  UpgradeBuilding = "upgrade-building",
  Confirm = "confirm",
  ConfirmSell = "confirm-sell",
  Spin = "spin",
}

export interface OpenModalMessage {
    // name of the modal to open
    modalName: ModalName
}

export interface OpenExternalModalMessage {
    // name of the modal to open
    modalName: ModalName
}

export interface CloseModalMessage {
    // name of the modal to close
    modalName: ModalName
}

export interface UpdateInputQuantityModalMessage {
    inventory: InventorySchema
}

export interface UpdateUpgradeBuildingModalMessage {
    placedItem: PlacedItemSchema
}

export interface ClaimItem {
    assetKey: string;
    quantity?: number;
    stackable: boolean;
    scale?: number;
}
export interface ClaimData {
    items: Array<ClaimItem>;
}
export interface UpdateClaimModalMessage {
    data: ClaimData
}

export interface SelectTabMessage<T = string> {
    name: string
    tabKey: T
}

export interface RequestToolbarInventoryIndexMessage {
    pointer: Phaser.Input.Pointer
}

export interface RequestStorageInventoryIndexMessage {
    pointer: Phaser.Input.Pointer
}

export interface CreateFlyItemMessage {
    position: Position
    quantity: number
    assetKey: string
    text: string
    showIcon?: boolean
}

export interface UpdateConfirmModalMessage {
    message: string
    callback?: () => void
    secondaryCallback?: () => void
}

export interface UpdateConfirmSellModalMessage {
    message: string
    quantity: number
    callback?: () => void
}

export interface UpdateVolumeMessage {
    volume: number
}

export interface UpdatePlacementConfirmationMessage {
    isPlacementValid?: boolean
    onCancel?: () => void
    onConfirm?: () => void
}

export interface CompletedMessage {
    success: boolean
}

export interface SyncPlacedItemsMessage {
    placedItemIds: Array<string>
}

