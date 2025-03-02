import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"

import { ProgressBar } from "../../loading"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { BaseText } from "../../elements"
import { ScrollablePanel } from "phaser3-rex-plugins/templates/ui/ui-components"
import { QuestCard } from "./QuestCard"
import { EventBus, EventName } from "@/game/event-bus"

export class SocialTab extends ContainerLite {
    private scrollablePanel: ScrollablePanel | undefined
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
        this.updateScrollablePanel()
    }

    // create the item card
    private createInviteUserQuest() {
        const content = this.scene.rexUI.add.sizer({
            orientation: "vertical",
            originX: 0,
            originY: 1,
            space: {
                item: 10,
            },
        })
        //create the progress bar
        const progressBar = new ProgressBar({
            baseParams: {
                scene: this.scene,
                config: {
                    originX: 0,
                },
            },
            options: {
                progress: 0.5,
            },
        }).layout()
        this.scene.add.existing(progressBar)
        content.add(progressBar, {
            align: "left-bottom",
        })
        // create text
        const text = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: "10/20 users invited",
            },
            options: {
                fontSize: 24,
                enableStroke: true,
            },
        }).setOrigin(0, 0.5)
        this.scene.add.existing(text)
        content.add(text)
        content.layout()

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
                content,
                buttonText: "Invite",
            }
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
                    console.log("Invite User")
                },
                buttonText: "Follow",
                title: "Follow X",
            }      
        })
        return questCard
    }

    private updateScrollablePanel() {
        const items = this.scene.rexUI.add
            .sizer({
                orientation: "y",
                space: {
                    item: 20,
                },
            })
            .add(this.createInviteUserQuest())
            .add(this.createFollowXQuest())
            .layout()

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
                    child: items,
                    mask: {
                        padding: {
                            top: 20,
                            left: 10,
                        },
                    },
                },
                mouseWheelScroller: {
                    focus: false,
                    speed: 2,
                },
            })
            .layout()
        this.addLocal(this.scrollablePanel)
    }
}

