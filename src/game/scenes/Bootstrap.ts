import { Scene } from "phaser"
import { AssetName, assetMap } from "../assets/base"
import { SceneName } from "../scene"
import { FONT_DINOSAUR } from "../constants"

export class Bootstrap extends Scene
{
    constructor ()
    {
        super(SceneName.Bootstrap)
    }

    preload ()
    {
        this.load.font(FONT_DINOSAUR, "fonts/dinosaur.ttf", "truetype")

        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        this.load.setPath("assets")
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        this.load.image(AssetName.Background, assetMap[AssetName.Background])
        this.load.image(AssetName.Logo, assetMap[AssetName.Logo])
        this.load.image(AssetName.LoadingBar, assetMap[AssetName.LoadingBar])
        this.load.image(AssetName.LoadingFill, assetMap[AssetName.LoadingFill])
    }

    create ()
    {   
        //  Move to the next Scene
        this.scene.start(SceneName.LoadingScene)
    }
}
