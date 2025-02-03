
// base constructor params for Container
export interface ContainerBaseConstructorParams {
    scene: Phaser.Scene
    x?: number
    y?: number
}

// base constructor params for Text
export interface TextBaseConstructorParams {
    scene: Phaser.Scene
    x: number
    y: number
    text: string
    // optional style
    style?: Phaser.Types.GameObjects.Text.TextStyle
}