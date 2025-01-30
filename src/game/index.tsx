"use client"

import React, { FC, useEffect, useLayoutEffect, useRef } from "react"
import { startGame } from "./config"
import { CONTAINER_ID } from "./constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { API_AUTHENTICATION_SWR_MUTATION } from "@/app/constants"
import { PLACED_ITEMS_SYNCED_EVENT, PlacedItemsSyncedMessage, useApiAuthenticationSwrMutation, useGameplayIo } from "@/hooks"
import { EventBus, EventName } from "./event-bus"
import { setAuthenticated, useAppDispatch } from "@/redux"

export const Game: FC = () => {
    const game = useRef<Phaser.Game | null>(null)

    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useApiAuthenticationSwrMutation>
  >(API_AUTHENTICATION_SWR_MUTATION)

    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        if (game.current === null) {
            game.current = startGame()
        }

        return () => {
            if (game.current) {
                game.current.destroy(true)
                if (game.current !== null) {
                    game.current = null
                }
            }
        }
    }, [])

    useEffect(() =>
    {
        EventBus.on(EventName.Authenticate, async () =>
        {
            await swrMutation.trigger({})
            EventBus.emit(EventName.Authenticated)
            dispatch(setAuthenticated(true))
        })
        
        return () =>
        {
            EventBus.removeListener(EventName.Authenticate)        
        }
    }, [])

    const { socket, connected } = useGameplayIo()

    useEffect(() =>
    {   
        //do nothing if not connected
        if (!connected) return
        //if socket is null do nothing
        if (!socket) return
        //listen for placed items synced
        socket.on(PLACED_ITEMS_SYNCED_EVENT, (data: PlacedItemsSyncedMessage) =>
        {
            EventBus.emit(EventName.PlacedItemsSynced, data)
        })
    }, [connected])

    return <div id={CONTAINER_ID} className="w-screen h-screen"></div>
}

//export default for dynamic import
export default Game
