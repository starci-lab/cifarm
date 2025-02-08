
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

// base constructor for Tilemap
export interface TilemapBaseConstructorParams {
    scene: Phaser.Scene
    mapData?: Phaser.Tilemaps.MapData
}

export interface LayerBaseConstructorParams {
    scene: Phaser.Scene, 
    children?: Array<Phaser.GameObjects.GameObject>
}