import { NinePatch2, OverlapSizer, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"

// base constructor params for NinePatch2
export interface NinePatch2BaseConstructorParams {
    scene: Phaser.Scene, 
    config?: NinePatch2.IConfig
}


// base constructor params for Sizer
export interface SizerBaseConstructorParams {
    scene: Phaser.Scene
    x?: number
    y?: number
    width?: number
    height?: number
    config?: Sizer.IConfig
}

// overlap sizer base constructor params
export interface OverlapSizerBaseConstructorParams {
    scene: Phaser.Scene
    x?: number
    y?: number
    width?: number
    height?: number
    config?: OverlapSizer.IConfig
}

// interface for constructor params
export interface ConstructorParams<TBaseConstructorParams, TOptions> {
    baseParams: TBaseConstructorParams
    options: TOptions
}