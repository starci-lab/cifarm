import { Manager } from "socket.io-client"
import { envConfig } from "@/env"

export const manager = new Manager(envConfig().wsUrl, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
})