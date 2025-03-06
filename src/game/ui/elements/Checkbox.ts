import { BaseAssetKey } from "@/game/assets"
import { ConstructorParams, LabelBaseConstructorParams } from "../../types"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"

export interface CheckboxOptions {
  checked?: boolean;
}
export class Checkbox extends Label {
    private check: Phaser.GameObjects.Image
    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<LabelBaseConstructorParams, CheckboxOptions>) {
        const { checked } = { ...options }
        const container = scene.add.image(0, 0, BaseAssetKey.UICommonCheckboxContainer)
        const check = scene.add.image(0, 0, BaseAssetKey.UICommonCheck)
        super(scene, {
            background: container,
            width: container.width,
            height: container.height,
            icon: check,
            align: "center",
            ...config
        })
        this.check = check

        this.setChecked(checked)
    }

    public setChecked(checked: boolean = false) {
        this.check.setVisible(checked)
    }
}
