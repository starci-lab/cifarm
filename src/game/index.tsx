"use client"
import React, { FC, useLayoutEffect, useRef } from "react"
import { gameState, startGame } from "./config"
import { CONTAINER_ID } from "./constants"
import { useEffects } from "./hooks"
import { ExternalEventEmitter, SceneEventEmitter } from "./events"

export * from "./events"

export const Game: FC = () => {
    const game = useRef<Phaser.Game | null>(null)

    //ensure all swr queries are done
    useLayoutEffect(() => {
        if (game.current === null) {
            game.current = startGame()
        }
        return () => {
            if (game.current) {
                game.current.destroy(true, false)
                ExternalEventEmitter.removeAllListeners()
                SceneEventEmitter.removeAllListeners()
                game.current = null
                gameState.data = undefined
            }
        }
    }, [])
    
    //useEffects
    useEffects()

    return <div id={CONTAINER_ID} className="w-full h-full"></div>
}

//export default for dynamic import
export default Game
