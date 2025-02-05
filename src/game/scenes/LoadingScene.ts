import { Scene } from "phaser"
import { SceneName } from "../scene"
import {
    BootstrapAssetKey,
    loadAnimalAssets,
    loadBaseAssets,
    loadBuildingAssets,
    loadCropAssets,
    loadTileAssets,
} from "../assets"
import { LoadingProgressBar } from "../containers"
import { EventBus, EventName } from "../event-bus"
import { QueryStaticResponse } from "@/modules/apollo"
import { CacheKey } from "../types"
import { InventoryEntity, UserEntity } from "@/modules/entities"
import { sleep } from "@/modules/common"

export class LoadingScene extends Scene {
    // loading progress
    private loadingAuthenticate = 10
    private loadingStaticData = 10
    private loadingUserData = 5
    private loadingUserInventory = 5
    private loadingAssets = 20
    private loadingTotal = 0

    // loading fill width and height
    private loadingProgressBar: LoadingProgressBar | undefined

    constructor() {
        super(SceneName.LoadingScene)
        //define point for loading
        this.loadingTotal =
      this.loadingAuthenticate +
      this.loadingStaticData +
      this.loadingAssets +
      this.loadingUserData +
      this.loadingUserInventory
    }

    // base on 100
    private loaded = 0
    private previousAssetLoaded = 0

    init() {
    // Listen to the shutdown event
        this.events.on("shutdown", this.shutdown, this)

        //listen for authentication event
        EventBus.on(EventName.Authenticated, async () => {
            //authenticate the user
            this.authenticated()
            
            // sleep for 0.1 seconds to ensure the hook is updated
            await sleep(100)
            //load user data
            EventBus.emit(EventName.LoadUser, this)
   
            //load user inventory
            EventBus.emit(EventName.LoadInventories, this)
        })

        //listen for static data loaded event
        EventBus.on(
            EventName.StaticDataLoaded,
            ({
                placedItemTypes,
                crops,
                animals,
                buildings,
                dailyRewards,
            }: QueryStaticResponse) => {
                //store the static data in the cache
                this.cache.obj.add(CacheKey.PlacedItems, placedItemTypes)
                this.cache.obj.add(CacheKey.Animals, animals)
                this.cache.obj.add(CacheKey.Crops, crops)
                this.cache.obj.add(CacheKey.Buildings, buildings)
                this.cache.obj.add(CacheKey.DailyRewards, dailyRewards)
                //load the static data
                this.loadStaticData()
            }
        )

        //listen for load user data event
        EventBus.on(
            EventName.UserLoaded, (user: UserEntity) => {
                console.log("user loaded", user)
                //load the user data
                this.cache.obj.add(CacheKey.User, user)
                this.loadUserData()
            })

        //listen for load inventory event
        EventBus.on(
            EventName.InventoriesLoaded, (inventories: Array<InventoryEntity> 
            ) => {
                console.log("inventories loaded", inventories)
                //load the user inventory
                this.cache.obj.add(CacheKey.Inventories, inventories)
                this.loadUserInventories()
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
            },
            options: {
                loadingTotal: this.loadingTotal,
            },
        })
        // add the loading progress container to the scene
        this.add.existing(this.loadingProgressBar)

        //emit the event to authenticate
        EventBus.emit(EventName.Authenticate, this)

        //emit the event to load static data
        EventBus.emit(EventName.LoadStaticData, this)

        // load all the assets
        loadBaseAssets(this)
        loadCropAssets(this)
        loadAnimalAssets(this)
        loadBuildingAssets(this)
        loadTileAssets(this)

        // listen for the complete event
        this.load.on("progress", async (progress: number) => {
            const assetLoaded = progress - this.previousAssetLoaded
            await this.loadAssets(assetLoaded)
            this.previousAssetLoaded = progress
        })

        this.load.start()
    }

    update() {
        // use the loading progress container to update the loading progress
        if (this.loadingProgressBar) {
            this.loadingProgressBar.update()
        }
    }

    private tryFinishLoading() {
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        const finished = this.loadingProgressBar.finished()
        if (finished) {
            this.scene.start(SceneName.Gameplay)
            this.scene.start(SceneName.Data)
        }
    }

    async authenticated() {
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        this.loaded += this.loadingAuthenticate
        await this.loadingProgressBar.updateLoadingProgress(
            this.loaded
        )
        this.tryFinishLoading()
    }

    async loadStaticData() {
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        this.loaded += this.loadingStaticData
        await this.loadingProgressBar.updateLoadingProgress(this.loaded)
        this.tryFinishLoading()
    }

    async loadUserData() {
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        this.loaded += this.loadingUserData
        await this.loadingProgressBar.updateLoadingProgress(this.loaded)
        this.tryFinishLoading()
    }

    async loadUserInventories() {
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        this.loaded += this.loadingUserInventory
        await this.loadingProgressBar.updateLoadingProgress(this.loaded)
        this.tryFinishLoading()
    }

    async loadAssets(assetLoaded: number) {
        if (!this.loadingProgressBar) {
            throw new Error("Loading progress container not found")
        }
        console.log("kimochi" + assetLoaded * this.loadingAssets)
        this.loaded += assetLoaded * this.loadingAssets
        await this.loadingProgressBar.updateLoadingProgress(this.loaded)
        this.tryFinishLoading()
    }
}
