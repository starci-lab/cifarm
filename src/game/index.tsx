"use client"
import React, { FC, useLayoutEffect, useRef } from "react"
import { gameState, startGame } from "./config"
import { CONTAINER_ID } from "./constants"
import { useEffects } from "./hooks"
import { ExternalEventEmitter, SceneEventEmitter } from "@/modules/event-emitter"
import { ReactUI } from "./react-ui"
import { useAppDispatch, setShowGameUI } from "@/redux"

export const Game: FC = () => {
    const game = useRef<Phaser.Game | null>(null)
    const dispatch = useAppDispatch()
    
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
            dispatch(setShowGameUI(false))
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
