import { API_UPDATE_TUTORIAL_SWR_MUTATION } from "@/app/constants"
import { useApiUpdateTutorialSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useUpdateTutorialEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiUpdateTutorialSwrMutation>
      >(API_UPDATE_TUTORIAL_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(EventName.RequestUpdateTutorial, async () => {
            await swrMutation.trigger({})
            EventBus.emit(EventName.UpdateTutorialCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUpdateTutorial)
        }
    }, [swrMutation])
}