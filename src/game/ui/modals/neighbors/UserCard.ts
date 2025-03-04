import { BaseAssetKey } from "../../../assets"
import { BaseText, TextColor } from "../../elements"
import {
    ConstructorParams,
    SizerBaseConstructorParams,
} from "../../../types"
import { Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { loadImageAwait, loadSvgAwait } from "../../utils"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { UserSchema } from "@/modules/entities"

export interface UserCardOptions {
  user?: UserSchema,
  text: string;
  badgeAssetKey?: string;
  hideBadge?: boolean;
}

export class UserCard extends Sizer {
    public badge: Phaser.GameObjects.Image | undefined
    public button: Label
    private options: UserCardOptions
    private background: Phaser.GameObjects.Image
    private image: Phaser.GameObjects.Image
    private user: UserSchema | undefined
    private avatarMask: Phaser.GameObjects.Image
    private imageWithMask: Label
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
            throw new Error("UserCard options are required")
        }
        this.background = background
        this.options = options

        const {
            user,
            text,
            badgeAssetKey,
            hideBadge,
        } = this.options
        this.user = user
        this.addLocal(this.background)
        const frame = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalNeighborsFrame
        )
        this.avatarMask = this.scene.add.image(0, 0, BaseAssetKey.UITopbarAvatarMask).setVisible(false)
        this.image = this.scene.add.image(0, 0, "").setDisplaySize(this.avatarMask.width, this.avatarMask.height)
        this.imageWithMask = this.scene.rexUI.add.label({
            background: this.avatarMask,
            icon: this.image,
            width: this.avatarMask.width,
            height: this.avatarMask.height,
            align: "center",
        }).layout()

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
            center: this.imageWithMask,
            rightBottom: this.badge,
        })
        const nameText = new BaseText({
            baseParams: { scene: this.scene, text, x: 0, y: 0 },
            options: {
                enableStroke: true,
                textColor: TextColor.White,
            },
        })
        this.scene.add.existing(nameText)
        const levelText = new BaseText({
            baseParams: { scene: this.scene, text: `Lv. ${user?.level}`, x: 0, y: 0 },
            options: {
                enableStroke: true,
                textColor: TextColor.White,
                fontSize: 28,
            },
        })
        this.scene.add.existing(levelText)
        const textSizer = this.scene.rexUI.add
            .sizer({
                orientation: "y",
                space: {
                    item: 5,
                },
            })
            .add(nameText, {
                align: "left"
            })
            .add(levelText, {
                align: "left"
            }) 
            .layout()
        const leftContainer = this.scene.rexUI.add
            .sizer({
                space: {
                    item: 20,
                },
            })
            .add(avatarLabel, {
                align: "center",
            })
            .add(textSizer, {
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
        this.fetchAvatar()
    }

    public async fetchAvatar() {
        if (!this.user) {
            return
        }
        if (this.user.avatarUrl) {
            await loadImageAwait({
                scene: this.scene,
                key: this.user.id,
                imageUrl: this.user.avatarUrl,
            })
        } else {
            await loadSvgAwait({
                scene: this.scene,
                key: this.user.id,
                svgUrl: createJazziconBlobUrl(this.user.accountAddress),
                scale: 16
            })
        }
        this.image.setTexture(this.user.id).setDisplaySize(this.avatarMask.width, this.avatarMask.height)
        this.imageWithMask.layout()
    }
}
