import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { Background, ModalBackground } from "../../elements"
import { EventBus, EventName, ModalName } from "@/game/event-bus"
import { QuestTab } from "./types"
import { tabsConfig } from "./constants"
import { BaseTab } from "./BaseTab"

const defaultTab = QuestTab.Base
export class QuestContent extends ContainerLite {
    private background: ModalBackground
    private baseTab: BaseTab
    //private background: ModalBackground
    constructor({
        scene,
        x,
        y,
        width,
        height,
        children,
    }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)
        // create the modal background
        this.background = new ModalBackground({
            baseParams: {
                scene,
                children,
            },
            options: {
                background: Background.XXLarge,
                tabs: {
                    options: {
                        tabs: Object.values(QuestTab).map((tab) => ({
                            tabKey: tab,
                            iconKey: tabsConfig[tab].iconKey,
                            scale: tabsConfig[tab].scale,
                            offsets: tabsConfig[tab].offsets,
                        })),
                        name: QuestTab.Base,
                        defaultTab
                    },
                    width: 750,
                },
                title: "Quests",
                onXButtonPress: () => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.Quest,
                    })
                },
                container: {
                    showContainer: false,
                    showWrapperContainer: true,
                },
            },
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        // create the base tab
        this.baseTab = new BaseTab({
            scene: this.scene,
            width: 750,
            height: 800,
        })
        this.scene.add.existing(this.baseTab)
        if (!this.background.container) {
            throw new Error("QuestContent requires a container")
        }
        this.background.container.addLocal(this.baseTab)
    }
}

