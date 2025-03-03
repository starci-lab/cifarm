import { BaseSizerBaseConstructorParams, CacheKey } from "../../../types"
import { ScrollablePanel, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { QuestCard } from "./QuestCard"
import { EventBus, EventName } from "@/game/event-bus"
import { DefaultInfo, UserSchema } from "@/modules/entities"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { MODAL_DEPTH_1 } from "../ModalManager"
import { Background, getBackgroundSizeConfig, SizeConfig } from "../../elements"

export class SocialTab extends BaseSizer {
    private scrollablePanel: ScrollablePanel | undefined
    private defaultInfo: DefaultInfo
    private user: UserSchema
    private sizeConfig: SizeConfig
    //private background: ModalBackground
    constructor({
        scene,
        x,
        y,
        width,
        height,
    }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height)
        this.sizeConfig = getBackgroundSizeConfig(Background.XXLarge)
        
        this.defaultInfo = this.scene.cache.obj.get(CacheKey.DefaultInfo)
        this.user = this.scene.cache.obj.get(CacheKey.User)
        // create the modal background
        this.updateScrollablePanel()

        EventBus.on(EventName.UserRefreshed, (user: UserSchema) => {
            this.user = user
            this.updateScrollablePanel()
        })
    }

    // create the item card
    private createInviteUserQuest() {
    //create the item card
        const questCard = new QuestCard({
            baseParams: {
                scene: this.scene,
            },
            options: {
                title: "Invite User",
                onPress: () => {
                    EventBus.emit(EventName.OpenReferralLinkModal)
                },
                done: this.user.referredUserIds.length >= this.defaultInfo.referredLimit,
                buttonText: "Invite",
            },
        })
        this.scene.add.existing(questCard)
        questCard.addProgress({
            progress: this.user.referredUserIds.length / this.defaultInfo.referredLimit,
            text: `${this.user.referredUserIds.length}/${this.defaultInfo.referredLimit} referred`,
        })
        return questCard
    }

    // create the item card
    private createFollowXQuest() {
    //create the item card
        const questCard = new QuestCard({
            baseParams: {
                scene: this.scene,
            },
            options: {
                onPress: () => {
                    EventBus.once(EventName.UpdateFollowXCompleted, () => {
                        EventBus.emit(EventName.RefreshUser)                     
                    })
                    //open the x href in a new tab
                    window.open(
                        "https://x.com/intent/follow?screen_name=cifarmonsol",
                        "_blank"
                    )
                    EventBus.emit(EventName.RequestUpdateFollowX)
                },
                done: this.user.followXAwarded,
                buttonText: "Follow",
                title: "Follow X",
            },
        })
        this.scene.add.existing(questCard)
        questCard.addReward({
            quantity: this.defaultInfo.followXRewardQuantity,
        })
        return questCard
    }

    private updateScrollablePanel() {
        const items: Array<QuestCard> = [
            this.createInviteUserQuest(),
            this.createFollowXQuest()
        ]
        if (this.scrollablePanel) {
            // reset the scrollable panel
            const panel = this.scrollablePanel.getElement("panel") as Sizer
            panel.removeAll(true)
            panel.addMultiple(items).setDepth(MODAL_DEPTH_1 + 2).layout()
            return
        }
        this.scrollablePanel = this.scene.rexUI.add
            .scrollablePanel({
                width: this.sizeConfig.tabContainer?.width,
                height: this.sizeConfig.tabContainer?.height,
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
