import { PlacedItemSchema } from "@/modules/entities"
import { Socket } from "socket.io-client"

export interface UseIo {
    // the socket instance
    socket: Socket | null
    // connect method
    connect: () => void
}

export interface PlacedItemsSyncedMessage {
    //placed items
    placedItems: Array<PlacedItemSchema>
    //current user id, beneficial for debugging
    userId: string
    isSecondarySync: boolean
}