"use client"
import {
    ACTION_EMITTED_EVENT,
    ActionEmittedMessage,
    InventorySyncedMessage,
    INVENTORIES_SYNCED_EVENT,
    PLACED_ITEMS_SYNCED_EVENT,
    PlacedItemsSyncedMessage,
    SHOW_FADE_EVENT,
    ShowFadeMessage,
    useGameplayIo,
    USER_SYNCED_EVENT,
    UserSyncedMessage,
} from "@/hooks"
import React, { FC, useEffect, useLayoutEffect, useRef } from "react"
import { gameState, startGame } from "./config"
import { CONTAINER_ID } from "./constants"
import { EventBus, EventName } from "./event-bus"
import { useEffects } from "./hooks"

export const Game: FC = () => {
    const game = useRef<Phaser.Game | null>(null)
    const { socket, connect } = useGameplayIo()

    useEffect(() => {
        // connect
        connect()
        //if socket is null do nothing
        if (!socket) return
        //listen for placed items synced
        socket.on(PLACED_ITEMS_SYNCED_EVENT, (data: PlacedItemsSyncedMessage) => {
            EventBus.emit(EventName.PlacedItemsSynced, data)
        })

        // listen for action emitted
        socket.on(ACTION_EMITTED_EVENT, (data: ActionEmittedMessage) => {
            EventBus.emit(EventName.ActionEmitted, data)
        })

        // listen for energy synced
        socket.on(USER_SYNCED_EVENT, ({ user }: UserSyncedMessage) => {
            console.log("user synced")
            EventBus.emit(EventName.UserRefreshed, user)
        })

        // listen for inventories synced
        socket.on(INVENTORIES_SYNCED_EVENT, ({ inventories }: InventorySyncedMessage) => {
            console.log("inventories synced")
            EventBus.emit(EventName.InventoriesRefreshed, inventories)
        })

        //listen for show fade event
        socket.on(SHOW_FADE_EVENT, ({ toNeighbor }: ShowFadeMessage) => {
            EventBus.emit(EventName.ShowFade, toNeighbor)
        })

        return () => {
            socket.off(PLACED_ITEMS_SYNCED_EVENT)
            socket.off(ACTION_EMITTED_EVENT)
            socket.off(USER_SYNCED_EVENT)
            socket.off(INVENTORIES_SYNCED_EVENT)
            socket.off(SHOW_FADE_EVENT)
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
