import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { Background, ModalBackground } from "../../elements"
import { EventBus, EventName, ModalName } from "@/game/event-bus"
import { QuestTab } from "./types"
import { tabsConfig } from "./constants"
import { SocialTab } from "./SocialTab"
import { DailyTab } from "./DailyTab"

const defaultTab = QuestTab.Social
export class QuestContent extends ContainerLite {
    private background: ModalBackground
    private tabs: Record<QuestTab, SocialTab | DailyTab>
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
                        name: QuestTab.Social,
                        defaultTab
                    },
                },
                title: "Quests",
                onXButtonPress: () => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.Quests,
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
        const socialTab = new SocialTab({
            scene: this.scene,
        })
        this.scene.add.existing(socialTab)

        const dailyTab = new DailyTab({
            scene: this.scene,
        })
        this.scene.add.existing(dailyTab)

        this.tabs = {
            [QuestTab.Social]: socialTab,
            [QuestTab.Daily]: dailyTab,
        }
        if (!this.background.container) {
            throw new Error("QuestContent requires a container")
        }
        this.background.container.addLocal(socialTab)
        this.background.container.addLocal(dailyTab)
    }
}

