import { ButtonsBaseConstructorParams, ConstructorParams } from "@/game/types"
import { BaseAssetKey, baseAssetMap } from "@/game/assets"
import { Buttons, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
export interface PlacementConfirmationOptions {
  onCancel?: () => void;
  onConfirm?: (tileX: number, tileY: number) => void;
}

export class PlacementConfirmation extends Buttons {
    private yesButton: Sizer
    private noButton: Sizer
    private tileX: number = 0
    private tileY: number = 0
    private onConfirm?: (tileX: number, tileY: number) => void
    private onCancel?: () => void

    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<
    ButtonsBaseConstructorParams,
    PlacementConfirmationOptions
  >) {
        super(scene, {
            space: {
                item: 20,
            },
            ...config,
        })
        const { onCancel, onConfirm } = { ...options }
        this.onCancel = onCancel

        this.onConfirm = onConfirm

        const yesButtonBackground = scene.add.image(
            0,
            0,
            baseAssetMap[BaseAssetKey.UICommonCheckRound].base.textureConfig.key
        )
        this.yesButton = scene.rexUI.add
            .sizer({
                width: yesButtonBackground.width,
                height: yesButtonBackground.height,
            })
            .addBackground(yesButtonBackground)

        const noButtonBackground = scene.add.image(
            0,
            0,
            baseAssetMap[BaseAssetKey.UICommonXRound].base.textureConfig.key
        )
        this.noButton = scene.rexUI.add
            .sizer({
                width: noButtonBackground.width,
                height: noButtonBackground.height,
            })
            .addBackground(noButtonBackground)

        this.addButton(this.yesButton)
        this.addButton(this.noButton)

        this.on("button.click", (button: Sizer) => {
            if (button === this.yesButton) {
                if (this.onConfirm) {
                    this.onConfirm(this.tileX, this.tileY)
                }
            } else if (button === this.noButton) {
                if (this.onCancel) {
                    this.onCancel()
                }
            }
        })

        this.layout()
    }

    public updateTileXY(tileX: number, tileY: number) {
        this.tileX = tileX
        this.tileY = tileY
    }

    public setYesButtonVisible(visible: boolean) {
        if (!visible) {
            this.yesButton.hide()
        } else {
            this.yesButton.show()
        }
        this.layout()
    }
}
