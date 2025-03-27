import { BaseAssetKey, baseAssetMap } from "@/game/assets"
import { ConstructorParams, LabelBaseConstructorParams } from "../../types"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import Button from "phaser3-rex-plugins/plugins/button"

export interface CheckboxOptions {
  checked?: boolean;
  callback: (checked: boolean) => void;
}
export class Checkbox extends Label {
    private check: Phaser.GameObjects.Image
    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<LabelBaseConstructorParams, CheckboxOptions>) {
        if (!options) {
            throw new Error("Checkbox requires options")
        }
        const { checked, callback } = options
        const container = scene.add.image(0, 0, baseAssetMap[BaseAssetKey.UICommonCheckboxContainer].key)
        const check = scene.add.image(0, 0, baseAssetMap[BaseAssetKey.UICommonCheck].key)
        const button = new Button(container)

        button.on("click", () => {
            const newChecked = !this.check.visible
            this.setChecked(newChecked)
            this.check.visible = newChecked
            callback(newChecked)
        })

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
