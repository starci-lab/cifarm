"use client"
import React, { FC, useLayoutEffect, useRef } from "react"
import { gameState, getConfig, startGame } from "./config"
import { CONTAINER_ID } from "./constants"
import { ExternalEventEmitter, SceneEventEmitter } from "@/modules/event-emitter"
import { ReactUI } from "./react-ui"
import { useAppDispatch, setShowGameUI } from "@/redux"
//import { useIsMobile } from "@/hooks"

export const Game: FC = () => {
    const game = useRef<Phaser.Game | null>(null)
    const dispatch = useAppDispatch()
    
    //const isMobile = useIsMobile()
    //ensure all swr queries are done
    useLayoutEffect(() => {
        if (game.current === null) {
            game.current = startGame(getConfig(), CONTAINER_ID)
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

    return (
        <>
            <div id={CONTAINER_ID} className="w-screen h-screen static block"/>
            <ReactUI />
        </>
    )
}

//export default for dynamic import
export default Game
