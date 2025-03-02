"use client"

import {
    API_AUTHENTICATION_SWR_MUTATION,
} from "@/app/constants"
import {
    PLACED_ITEMS_SYNCED_EVENT,
    PlacedItemsSyncedMessage,
    useApiAuthenticationSwrMutation,
    useGameplayIo,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { setAuthenticated, useAppDispatch } from "@/redux"
import React, { FC, useEffect, useLayoutEffect, useRef } from "react"
import { startGame } from "./config"
import { CONTAINER_ID } from "./constants"
import { EventBus, EventName } from "./event-bus"
import { useEffects } from "./hooks"

export const Game: FC = () => {
    const game = useRef<Phaser.Game | null>(null)
    const dispatch = useAppDispatch()
    const [isSyncDelayed, setIsSyncDelayed] = React.useState(false)

    //authentication useEffect
    const { swrMutation: authenticationSwrMutation } = useSingletonHook<
    ReturnType<typeof useApiAuthenticationSwrMutation>
  >(API_AUTHENTICATION_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(EventName.Authenticate, async () => {
            await authenticationSwrMutation.trigger({})
            EventBus.emit(EventName.Authenticated)
            dispatch(setAuthenticated(true))
        })

        return () => {
            EventBus.removeListener(EventName.Authenticate)
        }
    }, [])

    const { socket, connected } = useGameplayIo()

    useEffect(() => {
    //do nothing if not connected
        if (!connected) return
        //if socket is null do nothing
        if (!socket) return
        //listen for placed items synced
        socket.on(PLACED_ITEMS_SYNCED_EVENT, (data: PlacedItemsSyncedMessage) => {
            console.log("[DATA]", data.placedItems)

            if (!data.isSecondarySync) {
                EventBus.emit(EventName.SyncDelayEnded)
            }
    
            if (!isSyncDelayed || !data.isSecondarySync) {
                EventBus.emit(EventName.PlacedItemsSynced, data)
            }
        })
    }, [connected])

    useEffect(() => {
        EventBus.on(EventName.SyncDelayStarted, () => {
            setIsSyncDelayed(true)
        })
    
        EventBus.on(EventName.SyncDelayEnded, () => {
            setIsSyncDelayed(false)
        })
    
        return () => {
            EventBus.removeListener(EventName.SyncDelayStarted)
            EventBus.removeListener(EventName.SyncDelayEnded)
        }
    }, [])

    //ensure all swr queries are done
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

    //useEffects
    useEffects()

    return <div id={CONTAINER_ID} className="w-screen h-screen"></div>
}

//export default for dynamic import
export default Game
