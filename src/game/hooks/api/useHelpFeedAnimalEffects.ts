import { API_HELP_FEED_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { useApiHelpFeedAnimalSwrMutation } from "@/hooks"
import { HelpFeedAnimalRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useHelpFeedAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiHelpFeedAnimalSwrMutation>
      >(API_HELP_FEED_ANIMAL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpFeedAnimal, async (message: HelpFeedAnimalRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HelpFeedAnimalCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpFeedAnimal)
        }
    }, [swrMutation])
}