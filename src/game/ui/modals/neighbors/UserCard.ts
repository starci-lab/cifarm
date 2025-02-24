import { BaseAssetKey } from "../../../assets"
import { BaseText, TextColor } from "../../elements"
import {
    ConstructorParams,
    SizerBaseConstructorParams,
} from "../../../types"
import { Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"

export interface UserCardOptions {
  avatarAssetKey: string;
  text: string;
  badgeAssetKey?: string;
  hideBadge?: boolean;
}

export class UserCard extends Sizer {
    public badge: Phaser.GameObjects.Image | undefined
    public button: Label
    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<SizerBaseConstructorParams, UserCardOptions>) {
        const background = scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalNeighborsCard
        )
        super(
            scene,
            {
                width: background.width,
                height: background.height,
                space: {
                    right: 40
                },
                ...config,
            }
        )

        if (!options) {
            throw new Error("Options is required")
        }
        const {
            avatarAssetKey,
            text,
            badgeAssetKey,
            hideBadge,
        } = options

        this.addLocal(background)
        const frame = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalNeighborsFrame
        )
        const avatar = this.scene.add.image(0, 0, avatarAssetKey)

        if (!hideBadge) {
            if (!badgeAssetKey) {
                throw new Error("Badge asset key is required")
            }
            this.badge = this.scene.add
                .image(0, 0, badgeAssetKey)
        }
        const avatarLabel = this.scene.rexUI.add.badgeLabel({
            background: frame,
            width: frame.width,
            height: frame.height,
            center: avatar,
            rightBottom: this.badge,
        })
        const nameText = new BaseText({
            baseParams: { scene: this.scene, text, x: 0, y: 0 },
            options: {
                textColor: TextColor.White,
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
                offsetY: 30,
            })
            .layout()
        const buttonBackground = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalNeighborsButton
        )
        const homeIcon = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalNeighborsIconHome
        )
        this.button = this.scene.rexUI.add
            .label({
                background: buttonBackground,
                width: buttonBackground.width,
                height: buttonBackground.height,
                icon: homeIcon,
                align: "center",
            })
        this.add(leftContainer)
        this.addSpace()
        const rightContainer = this.scene.rexUI.add
            .sizer({
                space: {
                    item: 20,
                },
            })
            .add(this.button, {
                align: "center",
            })
            .layout()

        this.add(rightContainer)
        this.layout()
    }
}
