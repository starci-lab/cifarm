import { API_FEED_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { useApiFeedAnimalSwrMutation } from "@/hooks"
import { FeedAnimalRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useFeedAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiFeedAnimalSwrMutation>
      >(API_FEED_ANIMAL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestFeedAnimal, async (message: FeedAnimalRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.FeedAnimalCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestFeedAnimal)
        }
    }, [swrMutation])
}