import { useAppSelector } from "@/redux"
import { useEffect, useRef } from "react"
import { UseWs } from "./types"
import { Manager, Socket } from "socket.io-client"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { envConfig } from "@/env"

const manager = new Manager(envConfig().wsUrl, {
    autoConnect: false,
    reconnection: false,
})

export const useWs = (): UseWs => {
    const socket = useRef<Socket | null>(null)
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)

    const createSocket = async () => {
        const accessToken = await sessionDb.keyValueStore.get(SessionDbKey.AccessToken)
        if (!accessToken) {
            throw new Error("No access token found")
        }
        return manager.socket("/gameplay", {
            auth: {
                token: accessToken.value,
            },
        })
    }
    
    useEffect(() => {
        // do nothing if not authenticated
        if (!authenticated) return
        const handleEffect = async () => { 
            // create a new socket manager
            socket.current = await createSocket()
            socket.current.connect()
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
        socket: socket.current,
        updateSocket: async () => {
            socket.current = await createSocket()
        }
    }
}