import { API_BUY_TILE_SWR_MUTATION } from "@/app/constants"
import { useApiBuyTileSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { BuyTileRequest } from "@/modules/axios"

export const useBuyTileEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiBuyTileSwrMutation>
      >(API_BUY_TILE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuyTile, async (message: BuyTileRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.BuyTileCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuyTile)
        }
    }, [swrMutation])
}