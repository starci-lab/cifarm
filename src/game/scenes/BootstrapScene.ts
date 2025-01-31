import { Scene } from "phaser"
import { AssetKey, assetMap } from "../assets/base"
import { SceneName } from "../scene"
import { FONT_DINOSAUR } from "../constants"

export class BootstrapScene extends Scene {
    constructor() {
        super(SceneName.Bootstrap)
    }

    preload() {
        this.load.font(FONT_DINOSAUR, "fonts/dinosaur.ttf", "truetype")

        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        this.load.setPath("assets")
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        this.load.image(AssetKey.Background, assetMap[AssetKey.Background])
        this.load.image(AssetKey.Logo, assetMap[AssetKey.Logo])
        this.load.image(AssetKey.LoadingBar, assetMap[AssetKey.LoadingBar])
        this.load.image(AssetKey.LoadingFill, assetMap[AssetKey.LoadingFill])
        this.load.image(AssetKey.Grass, assetMap[AssetKey.Grass])

        // load icon
        this.load.image(AssetKey.IconNFTMarketplace, assetMap[AssetKey.IconNFTMarketplace])
        this.load.image(AssetKey.IconShop, assetMap[AssetKey.IconShop])
        this.load.image(AssetKey.IconRoadsideStand, assetMap[AssetKey.IconRoadsideStand])
        this.load.image(AssetKey.IconNeighbors, assetMap[AssetKey.IconNeighbors])

        // load tiles
        this.load.image(AssetKey.TileStarter, assetMap[AssetKey.TileStarter])

        // load buildings
        this.load.image(AssetKey.BuildingHome, assetMap[AssetKey.BuildingHome])
    }

    create() {
    //  Move to the next Scene
        this.scene.start(SceneName.LoadingScene)
    }
}
