import { BaseAssetKey } from "../../../assets"
import { CacheKey, ContainerLiteBaseConstructorParams } from "../../../types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { BaseText, TextColor } from "../../elements"
import { onGameObjectPress } from "../../utils"
import { UserSchema } from "@/modules/entities"
import { IPaginatedResponse } from "@/modules/apollo"

export class WorldNeighborsContent extends ContainerLite {
    private neighbors: Array<UserSchema>
    private count: number
    constructor({
        scene,
        x,
        y,
        width,
        height,
        children,
    }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        const { data, count } = this.scene.cache.obj.get(CacheKey.Neighbors) as IPaginatedResponse<UserSchema>
        this.neighbors = data
        this.count = count

        this.updateScrollablePanel()
    }

    private updateScrollablePanel() {
        const neighborCards = this.createNeighborCards()
        const scrollablePanel = this.scene.rexUI.add
            .scrollablePanel({
                width: 750,
                height: 1000,
                scrollMode: "y",
                panel: {
                    child: neighborCards,
                    mask: {
                        padding: 1,
                    },
                },
                mouseWheelScroller: {
                    focus: false,
                    speed: 2,
                },
            })
            .layout()
        this.addLocal(scrollablePanel)
    }

    private createNeighborCards() {
        const sizer = this.scene.rexUI.add.sizer({
            orientation: "y",
            space: { item: 20 },
        })
        // first card is the random neighbor card
        const randomNeighborCard = this.createRandomNeighborCard()
        sizer.add(randomNeighborCard)

        // create cards from the neighbors
        for (const neighbor of this.neighbors) {
            const neighborCard = this.createNeighborCard({
                avatarAssetKey: "",
                badgeAssetKey: BaseAssetKey.UIModalNeighborsIconAdd,
                text: neighbor.username,
                onPress: () => console.log("Clicked on John Doe"),
            })
            sizer.add(neighborCard)
        }

        sizer.layout()
        return sizer
    }

    private createNeighborCard({
        avatarAssetKey,
        text,
        onPress,
        badgeAssetKey,
    }: CreateNeighborCardParams) {
        const background = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalNeighborsCardBackground
        )
        const randomNeighborCard = this.scene.rexUI.add
            .container(0, 0, background.width, background.height)
            .add(background)
        const avatarBackground = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalNeighborsAvatarFriends
        )
        const avatar = this.scene.add.image(0, 0, avatarAssetKey)
        const badge = this.scene.add.image(0, 0, badgeAssetKey)
        const avatarLabel = this.scene.rexUI.add.badgeLabel({
            background: avatarBackground,
            width: avatarBackground.width,
            height: avatarBackground.height,
            center: avatar,
            rightBottom: badge,
        })
        const nameText = new BaseText({
            baseParams: { scene: this.scene, text, x: 0, y: 0 },
            options: {
                textColor: TextColor.Brown,
            },
        })
        this.scene.add.existing(nameText)

        const leftContainer = this.scene.rexUI.add
            .sizer({
                space: {
                    item: 20,
                },
            })
            .add(avatarLabel, {
                align: "center",
            })
            .add(nameText, {
                align: "top",
                offsetY: 10,
            })
            .layout()
        leftContainer.setX(
            -(randomNeighborCard.width / 2 - leftContainer.width / 2 - 20)
        )
        const visitBackground = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalNeighborsFrameVisit
        )
        const homeIcon = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalNeighborsIconHome
        )
        const visitButton = this.scene.rexUI.add
            .label({
                background: visitBackground,
                width: visitBackground.width,
                height: visitBackground.height,
                icon: homeIcon,
                align: "center",
            })
            .setInteractive()
            .on("pointerdown", () => {
                onGameObjectPress({
                    gameObject: visitButton,
                    onPress,
                    scene: this.scene,
                })
            })
        randomNeighborCard.addLocal(leftContainer)

        const rightContainer = this.scene.rexUI.add
            .sizer({
                space: {
                    item: 20,
                },
            })
            .add(visitButton, {
                align: "center",
            })
            .layout()
        rightContainer.setX(
            (randomNeighborCard.width / 2 - rightContainer.width / 2 - 60)
        )
        randomNeighborCard.addLocal(rightContainer)

        return randomNeighborCard
    }

    private createRandomNeighborCard() {
        return this.createNeighborCard({
            avatarAssetKey: BaseAssetKey.UIModalNeighborsIconQuestion,
            badgeAssetKey: BaseAssetKey.UIModalNeighborsIconRandom,
            text: "Random",
            onPress: () => console.log("Clicked on John Doe"),
        })
    }
}

export interface CreateNeighborCardParams {
  // the avatar key of the player card
  avatarAssetKey: string;
  // the badge asset key of the item card
  badgeAssetKey: string;
  // text of the player card
  text: string;
  // on click event
  onPress: () => void;
}
