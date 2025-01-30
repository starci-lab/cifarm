import { PlacedItemEntity } from "@/modules/entities"
import { Socket } from "socket.io-client"

export interface UseIo {
    // the socket instance
    socket: Socket | null
    // indicates if the socket is connected
    connected: boolean
}

export interface PlacedItemsSyncedMessage {
    //placed items
    placedItems: Array<PlacedItemEntity>
    //current user id, beneficial for debugging
    userId: string
}