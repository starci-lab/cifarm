/* eslint-disable @typescript-eslint/no-unused-vars */
import { Scene } from "phaser"

export const getScreenLeftX = (_: Scene) => 0
export const getScreenRightX = (scene: Scene) => scene.cameras.main.width
export const getScreenTopY = (_: Scene) => 0
export const getScreenBottomY = (scene: Scene) => scene.cameras.main.height
export const getScreenCenterX = (scene: Scene) => scene.cameras.main.width / 2
export const getScreenCenterY = (scene: Scene) => scene.cameras.main.height / 2