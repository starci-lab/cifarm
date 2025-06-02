import { Events } from "phaser"
import { PlayerContext } from "@/redux"

export interface ToolLike {
    id: string;
    quantity?: number;
    default?: boolean;
    stackable?: boolean;
}
// external event emitter take care of events between Phaser and React
export const ExternalEventEmitter = new Events.EventEmitter()

export enum ExternalEventName {
    // Between Phaser and React
    // send authenticate event, from Phaser to React
    Authenticate = "authenticate",
    // send authenticated event, from React to Phaser
    Authenticated = "authenticated",
    // request to load static data, from Phaser to React
    LoadStaticData = "load_static_data",
    // static data loaded, from React to Phaser
    StaticDataLoaded = "static_data_loaded",
    // request to load user data, from Phaser to React
    LoadUser = "load_user",
    // user data loaded, from React to Phaser
    UserLoaded = "user_loaded",
    // request to load placed items, from Phaser to React
    // user load placed items, from React to Phaser
    LoadPlacedItems = "load_placed_items",
    // placed items loaded, from React to Phaser
    PlacedItemsLoaded = "placed_items_loaded",
    // inventory loaded, from React to Phaser
    LoadInventories = "load_inventories",
    // inventory loaded, from React to Phaser
    InventoriesLoaded = "inventories_loaded",
    // placed items synced, from React to Phaser
    PlacedItemsSynced = "placed_items_synced",
    // inventories synced, from React to Phaser
    InventoriesSynced = "inventories_synced",
    // user synced, from React to Phaser
    UserSynced = "user_synced",
    // emit return event, from Phaser to React
    RequestReturn = "request_return",
    // request to buy animal, from Phaser to React
    RequestBuyAnimal = "request_buy_animal",
    // buy animal completed, from React to Phaser
    BuyAnimalResponsed = "buy_animal_responsed",
    // request to buy building, from Phaser to React
    RequestBuyBuilding = "request_buy_building",
    // buy building completed, from React to Phaser
    BuyBuildingResponsed = "buy_building_responsed",
    // request to buy flower seeds, from Phaser to React
    RequestBuyFlowerSeeds = "request_buy_flower_seeds",
    // buy flower seeds completed, from React to Phaser
    BuyFlowerSeedsResponsed = "buy_flower_seeds_responsed",
    // request to buy crop seeds, from Phaser to React
    RequestBuyCropSeeds = "request_buy_crop_seeds",
    // buy crop seeds completed, from React to Phaser
    BuyCropSeedsResponsed = "buy_crop_seeds_responsed",
    // request to buy fruit seeds, from Phaser to React
    RequestBuyFruit = "request_buy_fruit",
    // buy fruit completed, from React to Phaser
    BuyFruitResponsed = "buy_fruit_responsed",
    // request to buy supply seeds, from Phaser to React
    RequestBuySupplies = "request_buy_supplies",
    // buy supply seeds completed, from React to Phaser
    BuySuppliesResponsed = "buy_supplies_responsed",
    // request to buy tile, from Phaser to React
    RequestBuyTile = "request_buy_tile",
    // buy tile completed, from React to Phaser
    BuyTileResponsed = "buy_tile_responsed",
    // request to buy tool, from Phaser to React
    RequestBuyTool = "request_buy_tool",
    // buy tool completed, from React to Phaser
    BuyToolResponsed = "buy_tool_responsed",
    // request to claim daily reward, from Phaser to React
    RequestClaimDailyReward = "request_claim_daily_reward",
    // claim daily reward completed, from React to Phaser
    ClaimDailyRewardResponsed = "claim_daily_reward_responsed",
    // request to deliver additional inventory, from Phaser to React
    RequestDeliverAdditionalInventory = "request_deliver_additional_inventory",
    // request to deliver inventory, from Phaser to React
    RequestDeliverInventories = "request_deliver_inventories",
    // request to retrieve inventory, from Phaser to React
    RequestRetrieveInventories = "request_retrieve_inventories",
    // request to harvest animal, from Phaser to React
    RequestHarvestAnimal = "request_harvest_animal",
    // request to harvest fruit, from Phaser to React
    RequestHarvestFruit = "request_harvest_fruit",
    // request to harvest plant, from Phaser to React
    RequestHarvestPlant = "request_harvest_plant",
    // request to help use animal medicine, from Phaser to React
    RequestHelpUseAnimalMedicine = "request_help_use_animal_medicine",
    // request to help use plant medicine, from Phaser to React
    RequestHelpUseBugNet = "request_help_use_bug_net",
    // request to help use herbicide, from Phaser to React
    RequestHelpUseHerbicide = "request_help_use_herbicide",
    // request to help use pesticide, from Phaser to React
    RequestHelpUsePesticide = "request_help_use_pesticide",
    // request to help use watering can, from Phaser to React
    RequestHelpUseWateringCan = "request_help_use_watering_can",
    // request to use watering can, from Phaser to React
    RequestUseWateringCan = "request_use_watering_can",
    // request to use bug net, from Phaser to React
    RequestUseBugNet = "request_use_bug_net",
    // request to use herbicide, from Phaser to React
    RequestUseHerbicide = "request_use_herbicide",
    // request to use pesticide, from Phaser to React
    RequestUsePesticide = "request_use_pesticide",
    // request to use seed, from Phaser to React
    RequestUseAnimalFeed = "request_use_animal_feed",
    // request to use seed, from Phaser to React
    RequestUseFruitFertilizer = "request_use_fruit_fertilizer",
    // request to move, from Phaser to React
    RequestMove = "request_move",
    // request to move inventory, from Phaser to React
    RequestMoveInventory = "request_move_inventory",
    // request to plant seed, from Phaser to React
    RequestPlantSeed = "request_plant_seed",
    // request to sell, from Phaser to React
    RequestSell = "request_sell",
    // request to thief animal, from Phaser to React
    RequestThiefAnimal = "request_thief_animal",
    // request to thief fruit, from Phaser to React
    RequestThiefFruit = "request_thief_fruit",
    // request to thief plant, from Phaser to React
    RequestThiefPlant = "request_thief_plant",
    // request to use fertilizer, from Phaser to React
    RequestUseFertilizer = "request_use_fertilizer",
    // request to upgrade building, from Phaser to React
    RequestUpgradeBuilding = "request_upgrade_building",
    // request to use animal medicine, from Phaser to React
    RequestUseAnimalMedicine = "request_use_animal_medicine",
    // request to harvest bee house, from Phaser to React
    RequestHarvestBeeHouse = "request_harvest_bee_house",
    // request to visit, from Phaser to React
    ActionEmitted = "action_emitted",
    // close game, from React to Phaser
    CloseGame = "close_game",
    // assets loaded, from React to Phaser
    AssetsLoaded = "assets_loaded",
    // visit, from React to Phaser
    Visit = "visit",
    // stop buying, from React to Phaser
    StopBuying = "stop_buying",
    // request to thief bee house, from React to Phaser
    RequestThiefBeeHouse = "request_thief_bee_house",
    // request to buy pet, from React to Phaser
    RequestBuyPet = "request_buy_pet",
    // request to place nft, from React to Phaser
    RequestPlaceNFT = "request_place_nft",
    // request to update settings, from React to Phaser
    RequestUpdateSettings = "request_update_settings",
    // request to display timers, from React to Phaser
    RequestForceSyncPlacedItems = "request_force_sync_placed_items",
    // force sync placed items completed, from Phaser to React
    ForceSyncPlacedItemsResponsed = "force_sync_placed_items_responsed",
    // place nft item, from React to Phaser
    PlaceNFTItem = "place_nft_item",
    // set placed item info, from Phaser to React
    SetPlacedItemInfo = "set_placed_item_info",
    // open modal, from Phaser to React
    OpenModal = "open_modal",
    // close modal, from React to Phaser
    CloseModal = "close_modal",
    // buy item, from React to Phaser
    BuyItem = "buy_item",
    // move item, from React to Phaser
    MoveItem = "move_item",
    // sell item, from React to Phaser
    SellItem = "sell_item",
    // return normal, from React to Phaser
    ReturnNormal = "return_normal",
    // select tool, from React to Phaser
    SelectTool = "select_tool",
    // request to select tool, from Phaser to React
    RequestSelectTool = "request_select_tool",
    // update sound, from React to Phaser
    UpdateSound = "update_sound",
    // update ambient, from React to Phaser
    UpdateAmbient = "update_ambient",
    // update player context, from React to Phaser
    UpdatePlayerContext = "update_player_context",
    // update sell modal, from Phaser to React
    UpdateSellModalContent = "update_sell_modal_content",
    // update upgrade modal, from Phaser to React
    UpdateUpgradeModalContent = "update_upgrade_modal_content",
    // show game ui, from Phaser to React
    ShowGameUI = "show_game_ui",
    // request next
    RequestNext = "request_next",
    // return, from React to Phaser
    Return = "return",
    // request to select dog, from React to Phaser
    RequestSelectDog = "request_select_dog",
    // request to select cat, from React to Phaser
    RequestSelectCat = "request_select_cat",
    // request to update profile, from React to Phaser
    RequestUpdateProfile = "request_update_profile",
    // request to logout, from React to Phaser
    RequestLogout = "request_logout",
    // request to delete inventory, from React to Phaser
    RequestDeleteInventory = "request_delete_inventory",
    // request to sort inventories, from React to Phaser
    RequestSortInventories = "request_sort_inventories",
    // request to harvest plant, from React to Phaser
    PlantHarvested = "plant_harvested",
    // request to use watering can, from React to Phaser
    WateringCanUsed = "watering_can_used",
    // request to use herbicide, from React to Phaser
    HerbicideUsed = "herbicide_used",
    // request to use pesticide, from React to Phaser
    PesticideUsed = "pesticide_used",
    // request to help use watering can, from React to Phaser
    UseWateringCanHelped = "use_watering_can_helped",
    // request to help use herbicide, from React to Phaser
    UseHerbicideHelped = "use_herbicide_helped",
    // request to help use pesticide, from React to Phaser
    UsePesticideHelped = "use_pesticide_helped",
    // request to plant harvested, from React to Phaser
    PlantTheived = "plant_theived",
}

// events that listen inside Phaser class, use to unregister event listener
export const externalEventPhaserOns = [
    ExternalEventName.StaticDataLoaded,
    ExternalEventName.AssetsLoaded,
    ExternalEventName.PlacedItemsLoaded,
    ExternalEventName.UserLoaded,
    ExternalEventName.InventoriesLoaded,
    ExternalEventName.PlacedItemsSynced,
    ExternalEventName.InventoriesSynced,
    ExternalEventName.UserSynced,
    ExternalEventName.PlaceNFTItem,
    ExternalEventName.ActionEmitted,
    ExternalEventName.SelectTool,
    ExternalEventName.Return,
    ExternalEventName.Visit,
    ExternalEventName.StopBuying,
    ExternalEventName.ReturnNormal,
    ExternalEventName.MoveItem,
    ExternalEventName.SellItem,
    ExternalEventName.ForceSyncPlacedItemsResponsed,
    ExternalEventName.RequestSelectTool,
    ExternalEventName.RequestForceSyncPlacedItems,
    ExternalEventName.BuyItem,
    ExternalEventName.RequestForceSyncPlacedItems
]

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
    NFTStorage = "nft-storage",
    Download = "download",
    Info = "info",
    RoadsideStand = "roadside-stand",
    DeleteInventory = "delete-inventory",
    SortInventories = "sort-inventories",
}  

export interface SelectToolMessage {
    tool: ToolLike
}

export interface OpenModalMessage {
    modalName: ModalName
}

export interface CloseModalMessage {
    modalName: ModalName
}  

export interface SyncPlacedItemsMessage {
    placedItemIds: Array<string>
}

export interface CloseExternalModalMessage {
    modalName: ModalName
}

export interface RequestForceSyncPlacedItemsMessage {
    ids: Array<string>
}

export interface SetPlacedItemInfoMessage {
    id: string
}

export interface BuyItemMessage {
    // placed item type id
    placedItemTypeId: string;
}

export interface UpdateSoundMessage {
    value: number
}

export interface UpdateAmbientMessage {
    value: number
}

export interface UpdatePlayerContextMessage {
    playerContext: PlayerContext
}

export interface UpdateSellModalContentMessage {
    placedItemId: string
}

export interface UpdateUpgradeModalContentMessage {
    placedItemBuildingId: string
}
