"use client"
import {
    ACTION_EMITTED_EVENT,
    ActionEmittedMessage,
    PLACED_ITEMS_SYNCED_EVENT,
    PlacedItemsSyncedMessage,
    SHOW_FADE_EVENT,
    ShowFadeMessage,
    useGameplayIo,
    useQueryUserSwr,
} from "@/hooks"
import React, { FC, useEffect, useLayoutEffect, useRef } from "react"
import { gameState, startGame } from "./config"
import { CONTAINER_ID } from "./constants"
import { EventBus, EventName } from "./event-bus"
import { useEffects } from "./hooks"

export const Game: FC = () => {
    const game = useRef<Phaser.Game | null>(null)
    const { socket, connect } = useGameplayIo()

    const { swr: { data } } = useQueryUserSwr()
    const userIdRef = useRef<string | undefined>(data?.data.user.id)

    useEffect(() => {
        // connect
        connect()
        //if socket is null do nothing
        if (!socket) return
        //listen for placed items synced
        socket.on(PLACED_ITEMS_SYNCED_EVENT, (data: PlacedItemsSyncedMessage) => {
            if (data.userId !== userIdRef.current) {
                if (!userIdRef.current) {
                    throw new Error("User id is undefined")
                }
                EventBus.emit(EventName.WatchUserChanged, data.userId)
                userIdRef.current = data.userId
            }

            EventBus.emit(EventName.PlacedItemsSynced, data)
        })

        //listen for placed items synced
        socket.on(ACTION_EMITTED_EVENT, (data: ActionEmittedMessage) => {
            console.log(data)
            EventBus.emit(EventName.ActionEmitted, data)
        })

        //listen for show fade event
        socket.on(SHOW_FADE_EVENT, ({ toNeighbor }: ShowFadeMessage) => {
            EventBus.emit(EventName.ShowFade, toNeighbor)
        })

        return () => {
            socket.off(PLACED_ITEMS_SYNCED_EVENT)
            socket.off(ACTION_EMITTED_EVENT)
        }
    }, [socket])

    //ensure all swr queries are done
    useLayoutEffect(() => {
        if (game.current === null) {
            game.current = startGame()
        }
        return () => {
            if (game.current) {
                game.current.destroy(true, false)
                EventBus.removeAllListeners()
                game.current = null
                gameState.data = undefined
            }
        }
    }, [])
    
    //useEffects
    useEffects()

    return <div id={CONTAINER_ID} className="w-screen h-screen"></div>
}

//export default for dynamic import
export default Game
