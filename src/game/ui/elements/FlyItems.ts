import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { FlyItem, FlyItemOptions } from "./FlyItem"
import { ConstructorParams, SizerBaseConstructorParams } from "@/game/types"
import { calculateUiDepth, UILayer } from "@/game/layers"

export interface FlyItemsOptions {
    items: Array<FlyItemOptions>
    delay?: number
}

export class FlyItems extends Sizer {
    constructor({
        baseParams: { scene, config },
        options
    }: ConstructorParams<SizerBaseConstructorParams, FlyItemsOptions>) {
        if (!options) {
            throw new Error("FlyItems requires options")
        }
        super(scene, {
            ...config,
        })
        const { items, delay = 500 } = options
        items.forEach((item, index) => {
            scene.time.addEvent({
                delay: index * delay,
                callback: () => {
                    const flyItem = new FlyItem({
                        baseParams: {
                            scene: this.scene,
                        },
                        options: {
                            ...item,
                            depth: calculateUiDepth({
                                layer: UILayer.Overlay,
                                layerDepth: 1,
                            }),
                        },
                    })
                    scene.add.existing(flyItem)
                },
                callbackScope: this
            })
        })
    }
}
