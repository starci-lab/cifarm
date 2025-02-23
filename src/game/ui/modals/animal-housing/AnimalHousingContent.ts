import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import {
    EventBus,
    EventName,
    ModalName
} from "../../../event-bus"
import { BaseSizerBaseConstructorParams, CacheKey } from "../../../types"
import {
    Background,
    ModalBackground
} from "../../elements"
import { PlacedItemSchema } from "@/modules/entities"

export class AnimalHousingContent extends BaseSizer {
    private contentContainer: ContainerLite
    private background: ModalBackground
    private placedItemBuilding: PlacedItemSchema

    constructor({
        scene,
        height,
        width,
        x,
        y,
        config,
    }: BaseSizerBaseConstructorParams) {
        super(
            scene,
            x,
            y,
            width ?? 0,
            height ?? 0,
            config
        )

        const animalHousingBackground = new ModalBackground({
            baseParams: {
                scene: scene,
            },
            options: {
                background: Background.XLarge,
                onXButtonPress: () => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.AnimalHousing,
                    })
                },
                title: "Barn",
            }
        })
        
        this.placedItemBuilding = scene.cache.obj.get(CacheKey.ActivePlacedItemId) as PlacedItemSchema

        console.log("placedItemBuildingplacedItemBuilding", this.placedItemBuilding)

        this.background = animalHousingBackground
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        // create the container
        this.contentContainer = scene.rexUI.add.container(0, -100)
        this.addLocal(this.contentContainer)


        this.layout()
    }


}

