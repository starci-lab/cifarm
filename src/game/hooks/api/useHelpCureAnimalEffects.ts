import { API_HELP_CURE_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { HelpCureAnimalRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { useApiHelpCureAnimalSwrMutation } from "@/hooks"

export const useHelpCureAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiHelpCureAnimalSwrMutation>
      >(API_HELP_CURE_ANIMAL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpCureAnimal, async (message: HelpCureAnimalRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HelpCureAnimalCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpCureAnimal)
        }
    }, [swrMutation])
}