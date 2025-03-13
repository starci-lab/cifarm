import { API_BUY_BUILDING_SWR_MUTATION } from "@/app/constants"
import { BuyBuildingRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { useApiBuyBuildingSwrMutation } from "@/hooks"

export const useBuyBuildingEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiBuyBuildingSwrMutation>
      >(API_BUY_BUILDING_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuyBuilding, async (message: BuyBuildingRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.BuyBuildingCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuyBuilding)
        }
    }, [swrMutation])
}