import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { Background, ModalBackground } from "../../elements"
import { NeighborsTab, tabsConfig } from "./constants"
import { EventBus, EventName, ModalName } from "@/game/event-bus"

const defaultNeighborsTab = NeighborsTab.World

export class NeighborsContent extends ContainerLite {
    private background: ModalBackground
    constructor({
        scene,
        x,
        y,
        width,
        height,
        children,
    }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        this.background = new ModalBackground({
            baseParams: {
                scene: this.scene,
            },
            options: {
                onXButtonPress: () => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.Neighbors
                    })
                },
                container: {
                    showWrapperContainer: true,
                    showContainer: true,
                },
                title: "Neighbors",
                background: Background.XXLarge,
                tabs: {
                    width: 800,
                    options: {
                        tabs: Object.values(NeighborsTab).map((tab) => ({
                            tabKey: tab,
                            iconKey: tabsConfig[tab].iconKey,
                            scale: tabsConfig[tab].scale,
                            offsets: tabsConfig[tab].offsets,
                        })),
                        name: NeighborsContent.name,
                        defaultTab: defaultNeighborsTab,
                    },
                }
            }
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)
    }
}
