import { NinePatch2 } from "phaser3-rex-plugins/templates/ui/ui-components"

// base constructor params for Text
export interface TextBaseConstructorParams {
    scene: Phaser.Scene
    x: number
    y: number
    text: string
    // optional style
    style?: Phaser.Types.GameObjects.Text.TextStyle
}

// base constructor params for NinePatch2
export interface NinePatch2BaseConstructorParams {
    scene: Phaser.Scene, 
    config?: NinePatch2.IConfig
}

// base constructor params for Container
export interface ContainerBaseConstructorParams {
    scene: Phaser.Scene
    x: number
    y: number
}

// interface for constructor params
export interface ConstructorParams<TBaseConstructorParams, TOptions> {
    baseParams: TBaseConstructorParams
    options: TOptions
}