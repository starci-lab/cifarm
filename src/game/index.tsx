"use client"
import React, { FC, useLayoutEffect, useRef } from "react"
import { gameState, startGame } from "./config"
import { CONTAINER_ID } from "./constants"
import { useEffects } from "./hooks"
import { ExternalEventEmitter, SceneEventEmitter } from "./events"
import { ReactUI } from "./react-ui"

export * from "./events"
export * from "./assets"

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

    return (
        <div className="relative">
            <div id={CONTAINER_ID} className="w-full h-full"/>
            <ReactUI />
        </div>
    )
}

//export default for dynamic import
export default Game
