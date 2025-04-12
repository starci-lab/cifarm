import { Scene } from "phaser"
import { SceneName } from "../scene"
import { ExternalEventEmitter, ExternalEventName } from "../events"
import { QueryStaticResponse } from "@/modules/apollo"
import { CacheKey, PlacedItemsData } from "../types"
import {
    InventorySchema,
    PlacedItemSchema,
    UserSchema,
} from "@/modules/entities"
import {
    loadFlowerAssets,
    loadFruitAssets,
    loadProductAssets,
    loadTileAssets,
    loadPetAssets,
    loadStateAssets,
    loadBuildingAssets,
    loadAnimalAssets,
    loadCropAssets,
    loadMiscAssets,
    loadIconAssets,
} from "../load"
import { AssetBootstrapId } from "@/modules/assets"
import { LoadingProgressBar } from "../ui"

export enum LoadingPhase {
  DataFetching = "dataFetching",
  AssetsLoading = "assetsLoading",
}

export class LoadingScene extends Scene {
    // loading part in phase data fetching
    // loading fill width and height
    private loadingProgressBar: LoadingProgressBar | undefined
    private prevAssetsLoaded = 0
    constructor() {
        super(SceneName.Loading)
    }

    // data fetching
    private dataFetchingLoaded = 0
    private totalDataFetching = 4

    async init() {
    //listen for static data loaded event
        ExternalEventEmitter.once(
            ExternalEventName.StaticDataLoaded,
            ({
                placedItemTypes,
                crops,
                animals,
                buildings,
                tiles,
                dailyRewardInfo,
                tools,
                inventoryTypes,
                defaultInfo,
                products,
                activities,
                supplies,
                pets,
                fruits,
                fruitInfo,
                flowers,
            }: QueryStaticResponse) => {
                //store the static data in the cache
                this.cache.obj.add(CacheKey.PlacedItemTypes, placedItemTypes)
                this.cache.obj.add(CacheKey.Animals, animals)
                this.cache.obj.add(CacheKey.Crops, crops)
                this.cache.obj.add(CacheKey.Activities, activities)
                this.cache.obj.add(CacheKey.Buildings, buildings)
                this.cache.obj.add(CacheKey.Tiles, tiles)
                this.cache.obj.add(CacheKey.DailyRewardInfo, dailyRewardInfo)
                this.cache.obj.add(CacheKey.Tools, tools)
                this.cache.obj.add(CacheKey.InventoryTypes, inventoryTypes)
                this.cache.obj.add(CacheKey.DefaultInfo, defaultInfo)
                this.cache.obj.add(CacheKey.Products, products)
                this.cache.obj.add(CacheKey.Supplies, supplies)
                this.cache.obj.add(CacheKey.Pets, pets)
                this.cache.obj.add(CacheKey.Fruits, fruits)
                this.cache.obj.add(CacheKey.FruitInfo, fruitInfo)
                this.cache.obj.add(CacheKey.Flowers, flowers)
                //load the static data
                this.handleFetchData()
            }
        )

        ExternalEventEmitter.on(
            ExternalEventName.AssetsLoaded,
            (progress: number) => {
                if (progress === undefined) {
                    return
                }
                const totalAssetsLoaded = Number.parseInt(
                    this.cache.obj.get(CacheKey.TotalAssetsLoaded) ?? 0
                )
                const prevAssetsLoaded = this.prevAssetsLoaded
                const currentAssetsLoaded = progress + prevAssetsLoaded
                this.prevAssetsLoaded = currentAssetsLoaded
                this.loadAssets(currentAssetsLoaded / totalAssetsLoaded)
            }
        )

        //listen for load user data event
        ExternalEventEmitter.once(ExternalEventName.UserLoaded, async (user: UserSchema) => {
            this.cache.obj.add(CacheKey.User, user)
            this.handleFetchData()
        })

        //listen for load inventory event
        ExternalEventEmitter.once(
            ExternalEventName.InventoriesLoaded,
            (inventories: Array<InventorySchema>) => {
                //load the user inventory
                this.cache.obj.add(CacheKey.Inventories, inventories)
                this.handleFetchData()
            }
        )

        //listen for load placed items event
        ExternalEventEmitter.once(
            ExternalEventName.PlacedItemsLoaded,
            (placedItems: Array<PlacedItemSchema>) => {
                const watchingUser = this.cache.obj.get(CacheKey.WatchingUser) as
          | UserSchema
          | undefined
                const userId = watchingUser?.id ?? undefined
                const placedItemsData: PlacedItemsData = {
                    placedItems,
                    userId,
                }
                this.cache.obj.add(CacheKey.PlacedItems, placedItemsData)
                this.handleFetchData()
            }
        )
    }

    preload() {
        this.load.setPath("assets")
    }

    private handleFetchData() {
        this.dataFetchingLoaded++
        if (this.dataFetchingLoaded === this.totalDataFetching) {
            this.load.start()
        }
    }

    async create() {
    // get the width and height of the game
        const { width, height } = this.game.scale

        //  We loaded this image in our Boottrap Scene, so we can display it here
        this.add.image(width / 2, height / 2, AssetBootstrapId.Background)
        // We add logo to the scene
        const logo = this.add
            .image(width / 2, height / 4, AssetBootstrapId.Logo)
            .setScale(0.75)
        //  Animate the logo
        this.tweens.add({
            targets: logo,
            y: height / 3,
            ease: "Power1",
            duration: 2000,
            loop: -1,
            yoyo: true,
        })

        // create the loading progress container
        this.loadingProgressBar = new LoadingProgressBar({
            scene: this,
            x: width / 2,
            y: height * 0.85,
        })
        // add the loading progress container to the scene
        this.add.existing(this.loadingProgressBar)
        this.updateLoadingProgress(0)

        this.load.on("complete", () => {
            this.scene.start(SceneName.Gameplay)
        })

        await Promise.all([
            // listen for the complete event
            loadCropAssets(this),
            loadFlowerAssets(this),
            loadProductAssets(this),
            loadTileAssets(this),
            loadPetAssets(this),
            loadFruitAssets(this),
            loadAnimalAssets(this),
            loadStateAssets(this),
            loadBuildingAssets(this),
            loadMiscAssets(this),
            loadIconAssets(this),   
        ])

        this.load.setPath()

        // fetch the data
        this.fetchData()
    }

    public fetchData() {
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        // start fetching the data
        ExternalEventEmitter.emit(ExternalEventName.LoadStaticData)
        ExternalEventEmitter.emit(ExternalEventName.LoadUser)
        ExternalEventEmitter.emit(ExternalEventName.LoadInventories)
        ExternalEventEmitter.emit(ExternalEventName.LoadPlacedItems)
    }

    loadAssets(assetLoaded: number) {
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        // add the asset loaded
        this.updateLoadingProgress(assetLoaded)
    }

    private updateLoadingProgress(progress: number) {
        const actual = Math.min(progress, 1)
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        this.loadingProgressBar.updateLoadingProgress({
            progress: actual,
            text: `Loading assets... (${(actual * 100).toFixed(2)}%)`,
        })
    }
}
