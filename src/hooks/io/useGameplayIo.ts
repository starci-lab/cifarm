import { envConfig } from "@/env"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { useAppSelector } from "@/redux"
import { useEffect, useRef, useState } from "react"
import { Manager, Socket } from "socket.io-client"
import { UseIo } from "./types"

export const useGameplayIo = (): UseIo => {
    const socket = useRef<Socket | null>(null)
    const [ , setSetup ] = useState(false)
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)

    const connect = () => {
        socket.current?.connect()
    }

    useEffect(() => {
        console.log(authenticated)
        // do nothing if not authenticated
        if (!authenticated) return 

        const handleEffect = async () => {
            // create a new socket manager
            const manager = new Manager(envConfig().ioUrl, {
                autoConnect: false
            })
            const accessToken = await sessionDb.keyValueStore.get(SessionDbKey.AccessToken)
            if (!accessToken) {
                throw new Error("No access token found")
            }
            socket.current = manager.socket("/gameplay", {
                auth: {
                    token: accessToken.value,
                },
            })
            setSetup(true)
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
        connect
    }
}