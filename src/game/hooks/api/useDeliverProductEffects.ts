import { API_DELIVER_PRODUCT_SWR_MUTATION } from "@/app/constants"
import { useApiDeliverProductSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { DeliverProductRequest } from "@/modules/axios"

export const useDeliverProductEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiDeliverProductSwrMutation>
      >(API_DELIVER_PRODUCT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestDeliverProduct, async (message: DeliverProductRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.DeliverProductCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestDeliverProduct)
        }
    }, [swrMutation])
}