import { Scene } from "phaser"
import { SceneName } from "../scene"
import {
    BootstrapAssetKey,
    loadAnimalAssets,
    loadBaseAssets,
    loadBuildingAssets,
    loadCropAssets,
    loadInventoryTypesAssets,
    loadProductAssets,
    loadStacyAssets,
    loadSupplyAssets,
    loadTileAssets,
    loadToolsAssets
} from "../assets"
import { LoadingProgressBar } from "../ui"
import { EventBus, EventName } from "../event-bus"
import { QueryFolloweesArgs, QueryNeighborsArgs, QueryNeighborsParams, QueryStaticResponse } from "@/modules/apollo"
import { CacheKey } from "../types"
import { InventorySchema, UserSchema } from "@/modules/entities"
import { sleep } from "@/modules/common"
import { loadAnimalStateAssets, loadCropStateAssets } from "../assets/states"
import { IPaginatedResponse } from "@/modules/apollo"

export enum LoadingPhase {
    DataFetching = "dataFetching",
    AssetsLoading = "assetsLoading",
}

export class LoadingScene extends Scene {
    // loading part in phase data fetching
    // loading fill width and height
    private loadingProgressBar: LoadingProgressBar | undefined

    constructor() {
        super(SceneName.Loading)
        //define point for loading
    }

    // asset loading
    private assetLoaded = 0
    private previousAssetLoaded = 0

    // data fetching
    private dataFetchingLoaded = 0
    private totalDataFetching = 5

    init() {
    // Listen to the shutdown event
        this.events.on("shutdown", this.shutdown, this)

        //listen for authentication event
        EventBus.once(EventName.Authenticated, async () => {
            //authenticate the user
            this.authenticated()
        })

        //listen for static data loaded event
        EventBus.once(
            EventName.StaticDataLoaded,
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
                activities
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
                //load the static data
                this.handleFetchData("Loading static data...")
            }
        )

        //listen for load user data event
        EventBus.once(
            EventName.UserLoaded, (user: UserSchema) => {
                //load the user data
                this.cache.obj.add(CacheKey.User, user)
                this.handleFetchData("Loading user...")
            })

        //listen for load inventory event
        EventBus.once(
            EventName.InventoriesLoaded, (data: IPaginatedResponse<InventorySchema>
            ) => {
                //load the user inventory
                this.cache.obj.add(CacheKey.Inventories, data)
                this.handleFetchData("Loading inventories...")
            })
    
        //listen for load neighbors event
        EventBus.once(
            EventName.NeighborsLoaded, (data: IPaginatedResponse<UserSchema>
            ) => {
                //load the user inventory
                this.cache.obj.add(CacheKey.Neighbors, data)
                this.handleFetchData("Loading neighbors...")
            })

        //listen for load followees event
        EventBus.once(
            EventName.FolloweesLoaded, (data: IPaginatedResponse<UserSchema>
            ) => {
                //load the user inventory
                this.cache.obj.add(CacheKey.Followees, data)
                this.handleFetchData("Loading followees...")
            })

        this.events.once(EventName.LoadCompleted, () => {
            //load the main game scene
            this.scene.start(SceneName.Gameplay)
        })
    }

    preload() {   
        this.load.setPath("assets")
    }

    shutdown() {
        EventBus.off(EventName.Authenticated)
        EventBus.off(EventName.StaticDataLoaded)
        EventBus.off(EventName.UserLoaded)
        EventBus.off(EventName.InventoriesLoaded)
        EventBus.off(EventName.NeighborsLoaded)
        EventBus.off(EventName.FolloweesLoaded)
    }

    create() {
        // get the width and height of the game
        const { width, height } = this.game.scale

        //  We loaded this image in our Boottrap Scene, so we can display it here
        this.add.image(width / 2, height / 2, BootstrapAssetKey.Background)
        // We add logo to the scene
        const logo = this.add
            .image(width / 2, height / 4, BootstrapAssetKey.Logo)
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
            baseParams: {
                scene: this,
                x: width / 2,
                y: height * 0.85,
            }
        })
        // add the loading progress container to the scene
        this.add.existing(this.loadingProgressBar)

        //emit the event to authenticate
        EventBus.emit(EventName.Authenticate, this)

        // listen for the complete event
        this.load.on("progress", async (progress: number) => {
            const assetLoaded = progress - this.previousAssetLoaded
            this.previousAssetLoaded = progress
            this.loadAssets(assetLoaded)       
        })

        // load all the assets
        loadBaseAssets(this)
        loadCropAssets(this)
        loadAnimalAssets(this)
        loadBuildingAssets(this)
        loadSupplyAssets(this)
        loadProductAssets(this)
        loadTileAssets(this)
        loadToolsAssets(this)
        loadStacyAssets(this)
        loadInventoryTypesAssets(this)
        loadCropStateAssets(this)
        loadAnimalStateAssets(this)
    }

    async update() {
        // use the loading progress container to update the loading progress
        if (this.loadingProgressBar) {
            await this.loadingProgressBar.update()

            // check if the queue is empty
            if (this.waitForQueueEmpty && this.loadingProgressBar.queueEmpty()) {
                // emit the event that the loading is done
                this.events.emit(EventName.LoadCompleted)
            }
        }
    }

    async authenticated() {
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        // sleep 0.1 seconds to ensure the hook is updated
        await sleep(100)
        // start fetching the data    
        EventBus.emit(EventName.LoadStaticData)
        EventBus.emit(EventName.LoadUser)
        EventBus.emit(EventName.LoadInventories)
        // query neighbors
        const queryNeighborsArgs: QueryNeighborsArgs = {
            limit: 10,
            offset: 0,
        }
        const queryNeighborsParams: QueryNeighborsParams = {
            args: queryNeighborsArgs
        }
        this.cache.obj.add(CacheKey.NeighborsArgs, queryNeighborsParams)
        EventBus.emit(EventName.LoadNeighbors, queryNeighborsParams)

        // query followees
        const queryFolloweesArgs: QueryFolloweesArgs = {
            limit: 10,
            offset: 0,
        }
        const queryFolloweesParams: QueryNeighborsParams = {
            args: queryFolloweesArgs
        }
        this.cache.obj.add(CacheKey.FolloweesArgs, queryFolloweesParams)
        EventBus.emit(EventName.LoadFollowees, queryFolloweesParams)
    }

    private handleFetchData(message: string) {
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        const to = this.dataFetchingLoaded + 1
        this.loadingProgressBar.addLoadingQueue({
            from: this.dataFetchingLoaded / this.totalDataFetching,
            to: to / this.totalDataFetching,
            text: message,
            steps: 20, // 20 x 0.02 = 0.04s
        })
        this.dataFetchingLoaded = to

        if (this.dataFetchingLoaded === this.totalDataFetching) {
            // start the asset loading
            this.load.start()
        }
    }

    private waitForQueueEmpty = false

    loadAssets(assetLoaded: number) {
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        // add the asset loaded
        this.loadingProgressBar.addLoadingQueue({
            from: this.assetLoaded,
            to: this.assetLoaded + assetLoaded,
            text: "Loading assets...",
            steps: 3,
        })
        this.assetLoaded += assetLoaded

        if (this.assetLoaded === 1) {
            // emit the event that the loading is done
            this.waitForQueueEmpty = true
        }
    }
}
