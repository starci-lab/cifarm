import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import {
    EventBus,
    EventName,
    ModalName
} from "../../../event-bus"
import { BaseSizerBaseConstructorParams } from "../../../types"
import {
    Background,
    ModalBackground
} from "../../elements"

export class AnimalHousingContent extends BaseSizer {
    private contentContainer: ContainerLite
    private background: ModalBackground

    constructor({
        scene,
        height,
        width,
        x,
        y,
        config,
    }: BaseSizerBaseConstructorParams) {
        const animalHousingBackground = new ModalBackground({
            baseParams: {
                scene: scene,
            },
            options: {
                background: Background.XLarge,
                onXButtonPress: () => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.Shop,
                    })
                },
                title: "Barn",
            }
        })
        
        super(
            scene,
            x,
            y,
            width ?? animalHousingBackground.width,
            height ?? animalHousingBackground.height,
            config
        )
        this.background = animalHousingBackground
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        // create the container
        this.contentContainer = scene.rexUI.add.container(0, -100)
        this.addLocal(this.contentContainer)


        this.layout()
    }


}

