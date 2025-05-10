import { useAppSelector } from "@/redux"
import { useEffect, useRef, useState } from "react"
import { UseWs } from "./types"
import { manager } from "./socket"
import { Socket } from "socket.io-client"
import { sessionDb, SessionDbKey } from "@/modules/dexie"

export const useWs = (): UseWs => {
    const socket = useRef<Socket | null>(null)
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)

    useEffect(() => {
        // do nothing if not authenticated
        if (!authenticated) return 

        const handleEffect = async () => {
            // create a new socket manager
            const accessToken = await sessionDb.keyValueStore.get(SessionDbKey.AccessToken)
            if (!accessToken) {
                throw new Error("No access token found")
            }
            socket.current = manager.socket("/gameplay", {
                auth: {
                    token: accessToken.value,
                },
            })
        }
        handleEffect()

        //clean function to disconnect the socket
        return () => {
            if (socket.current) {
                socket.current.removeAllListeners()
                socket.current.disconnect()
                socket.current = null
            }
        }
    }, [authenticated])

    return {
        socket: socket.current
    }
}