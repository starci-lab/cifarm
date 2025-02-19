import { BaseAssetKey } from "../../../assets"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { onGameObjectPress } from "../../utils"
import { BaseText, TextColor } from "../../elements"
import {
    ConstructorParams,
    ContainerLiteBaseConstructorParams,
} from "@/game/types"

export interface UserCardOptions {
  avatarAssetKey: string;
  text: string;
  onPress: () => void;
  badgeAssetKey?: string;
  onBadgePress?: () => void;
  hideBadge?: boolean;
}

export class UserCard extends ContainerLite {
    constructor({
        baseParams: { scene, children, height, width, x, y },
        options,
    }: ConstructorParams<ContainerLiteBaseConstructorParams, UserCardOptions>) {
        const background = scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalNeighborsCardBackground
        )
        super(
            scene,
            x,
            y,
            background.width ?? width,
            background.height ?? height,
            children
        )

        if (!options) {
            throw new Error("Options is required")
        }
        const {
            avatarAssetKey,
            text,
            onPress,
            badgeAssetKey,
            onBadgePress,
            hideBadge,
        } = options

        this.add(background)
        const avatarBackground = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalNeighborsAvatarFriends
        )
        const avatar = this.scene.add.image(0, 0, avatarAssetKey)

        let badge: Phaser.GameObjects.Image | undefined
        if (!hideBadge) {
            if (!badgeAssetKey) {
                throw new Error("Badge asset key is required")
            }
            badge = this.scene.add
                .image(0, 0, badgeAssetKey)
                .setInteractive()
                .on("pointerdown", () => {
                    if (!badge) {
                        throw new Error("Badge is not defined")
                    }
                    if (onBadgePress) {
                        onGameObjectPress({
                            gameObject: badge,
                            onPress: onBadgePress,
                            scene: this.scene,
                        })
                    }
                })
        }
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
            -(this.width / 2 - leftContainer.width / 2 - 20)
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
        this.addLocal(leftContainer)

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
            this.width / 2 - rightContainer.width / 2 - 60
        )
        this.addLocal(rightContainer)
    }
}
