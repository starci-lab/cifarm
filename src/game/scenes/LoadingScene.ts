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
import { LoadingProgressContainer } from "../containers"
import { EventBus, EventName } from "../event-bus"
import { QueryStaticResponse } from "@/modules/apollo"
import { CacheKey } from "../types"

export class LoadingScene extends Scene {
    // loading progress
    private loadingAuthenticate = 10
    private loadingStaticData = 10
    private loadingAssets = 20
    private loadingTotal = 0

    // loading fill width and height
    private loadingProgressContainer: LoadingProgressContainer | undefined

    constructor() {
        super(SceneName.LoadingScene)
        //define point for loading
        this.loadingTotal =
      this.loadingAuthenticate + this.loadingStaticData + this.loadingAssets
    }

    private assetLoaded = false
    private preventUpdateAssetLoaded = false

    init() {
    // Listen to the shutdown event
        this.events.on("shutdown", this.shutdown, this)

        //listen for authentication event
        EventBus.on(EventName.Authenticated, () => {
            //authenticate the user
            this.authenticated()
        })

        //listen for static data loaded event
        EventBus.on(
            EventName.StaticDataLoaded,
            ({ placedItemTypes, crops, animals, buildings }: QueryStaticResponse) => {
                //store the static data in the cache
                this.cache.obj.add(CacheKey.PlacedItems, placedItemTypes)
                this.cache.obj.add(CacheKey.Animals, animals)
                this.cache.obj.add(CacheKey.Crops, crops)
                this.cache.obj.add(CacheKey.Buildings, buildings)
                //load the static data
                this.loadStaticData()
            }
        )
    }

    shutdown() {
        EventBus.off(EventName.Authenticated)
        EventBus.off(EventName.StaticDataLoaded)
    }

    async preload() {
    //listen for asset loaded event

        this.load.on("complete", () => {
            this.assetLoaded = true
        })

        this.load.setPath("assets")
        // load all the assets
        loadBaseAssets(this)
        loadCropAssets(this)
        loadAnimalAssets(this)
        loadBuildingAssets(this)
        loadTileAssets(this)
    }

    create() {
    //emit the event to authenticate
        EventBus.emit(EventName.Authenticate, this)

        //emit the event to load static data
        EventBus.emit(EventName.LoadStaticData, this)

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
        this.loadingProgressContainer = new LoadingProgressContainer(
            {
                baseParams: {
                    scene: this,
                    x: width / 2,
                    y: height * 0.85,
                },
                options: {
                    loadingTotal: this.loadingTotal,
                }
            }
        )
        // add the loading progress container to the scene
        this.add.existing(this.loadingProgressContainer)
    }

    update() {
    // if the assets are loaded and the loading progress container is available, load the assets
        if (
            !this.preventUpdateAssetLoaded &&
      this.assetLoaded &&
      this.loadingProgressContainer?.scene.textures
        ) {
            this.loadAssets()
            this.preventUpdateAssetLoaded = true
        }

        // use the loading progress container to update the loading progress
        if (this.loadingProgressContainer) {
            this.loadingProgressContainer.update()
        }
    }

    private tryFinishLoading() {
        if (!this.loadingProgressContainer) {
            throw new Error("Loading progress container not found")
        }
        const finished = this.loadingProgressContainer.finished()
        if (finished) {
            this.scene.start(SceneName.Gameplay)
        }
    }

    async authenticated() {
        if (!this.loadingProgressContainer) {
            throw new Error("Loading progress container not found")
        }
        await this.loadingProgressContainer.updateLoadingProgress(
            this.loadingAuthenticate
        )
        this.tryFinishLoading()
    }

    async loadStaticData() {
        if (!this.loadingProgressContainer) {
            throw new Error("Loading progress container not found")
        }
        await this.loadingProgressContainer.updateLoadingProgress(
            this.loadingStaticData
        )
        this.tryFinishLoading()
    }

    async loadAssets() {
        if (!this.loadingProgressContainer) {
            throw new Error("Loading progress container not found")
        }
        await this.loadingProgressContainer.updateLoadingProgress(
            this.loadingAssets
        )
        this.tryFinishLoading()
    }
}
