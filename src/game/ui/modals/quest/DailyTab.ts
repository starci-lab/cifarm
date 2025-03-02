import { BaseSizerBaseConstructorParams, CacheKey } from "../../../types"
import { ScrollablePanel, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { QuestCard } from "./QuestCard"
import { EventBus, EventName } from "@/game/event-bus"
import { DefaultInfo, UserSchema } from "@/modules/entities"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { MODAL_DEPTH_1 } from "../ModalManager"

export class DailyTab extends BaseSizer {
    private scrollablePanel: ScrollablePanel | undefined
    private defaultInfo: DefaultInfo
    private user: UserSchema
    //private background: ModalBackground
    constructor({
        scene,
        x,
        y,
        width,
        height,
    }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height)
        this.defaultInfo = this.scene.cache.obj.get(CacheKey.DefaultInfo)
        this.user = this.scene.cache.obj.get(CacheKey.User)
        // create the modal background
        this.updateScrollablePanel()

        EventBus.on(EventName.UserRefreshed, (user: UserSchema) => {
            this.user = user
            this.updateScrollablePanel()
        })
    }

    private updateScrollablePanel() {
        const items: Array<QuestCard> = []
        if (this.scrollablePanel) {
            // reset the scrollable panel
            const panel = this.scrollablePanel.getElement("panel") as Sizer
            panel.removeAll(true)
            panel.addMultiple(items).setDepth(MODAL_DEPTH_1 + 2).layout()
            return
        }
        this.scrollablePanel = this.scene.rexUI.add
            .scrollablePanel({
                width: 750,
                height: 800,
                originY: 0,
                y: 60,
                scrollMode: "y",
                space: {
                    panel: 40,
                },
                panel: {
                    child: this.scene.rexUI.add.sizer({
                        orientation: "vertical",
                        space: {
                            item: 60,
                        }
                    }).addMultiple(items).layout(),
                    mask: {
                        padding: {
                            top: 40,
                            left: 10,
                        },
                    },
                },
                mouseWheelScroller: {
                    focus: false,
                    speed: 2,
                },
            })
            .layout().setDepth(MODAL_DEPTH_1 + 1)
        this.addLocal(this.scrollablePanel)
    }
}
