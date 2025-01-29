"use client"

import React, { FC, useLayoutEffect, useRef } from "react"
import { startGame } from "./config"
import { CONTAINER_ID } from "./constants"
export const Game : FC = () =>
{
    const game = useRef<Phaser.Game | null>(null)

    useLayoutEffect(() =>
    {
        if (game.current === null)
        {
            game.current = startGame()
        }

        return () =>
        {
            if (game.current)
            {
                game.current.destroy(true)
                if (game.current !== null)
                {
                    game.current = null
                }
            }
        }
    }, [])

    return (
        <div id={CONTAINER_ID} className="w-screen h-screen"></div>
    )
}

//export default for dynamic import
export default Game
