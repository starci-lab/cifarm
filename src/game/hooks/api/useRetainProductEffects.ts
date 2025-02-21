import { API_RETAIN_PRODUCT_SWR_MUTATION } from "@/app/constants"
import { useApiRetainProductSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { RetainProductRequest } from "@/modules/axios"

export const useRetainProductEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiRetainProductSwrMutation>
      >(API_RETAIN_PRODUCT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestRetainProduct, async (message: RetainProductRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.RetainProductCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestRetainProduct)
        }
    }, [swrMutation])
}