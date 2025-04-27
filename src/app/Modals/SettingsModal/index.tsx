import React, { FC, useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    Slider,
    DialogTitle,
    Title,
    Spacer,
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { SETTINGS_DISCLOSURE } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { useAppSelector } from "@/redux"

const TIMEOUT = 1000

export const SettingsModal: FC = () => {
    const { toggle, isOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SETTINGS_DISCLOSURE
    )

    const user = useAppSelector(state => state.sessionReducer.user)

    const [sound, setSound] = useState(0.5)
    const [ambient, setAmbient] = useState(0.5)

    useEffect(() => {
        if (!user) {
            return
        }
        setSound(user.sound)
        setAmbient(user.ambient)
    }, [user])

    useEffect(() => {
        const delayTimeout = setTimeout(() => {
            if (!user) {
                return
            }
            ExternalEventEmitter.emit(ExternalEventName.RequestUpdateSettings, {
                sound,
                ambient
            })
        }, TIMEOUT)
        return () => clearTimeout(delayTimeout)
    }, [sound, ambient])

    useEffect(() => {
        ExternalEventEmitter.emit(ExternalEventName.UpdateSound, {
            value: sound
        })
    }, [sound])

    useEffect(() => {
        ExternalEventEmitter.emit(ExternalEventName.UpdateAmbient, {
            value: ambient
        })
    }, [ambient])
    
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Settings
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div>
                        <Title title="Sound" tooltipString="This controls the audio settings." classNames={{
                            title: "text-base",
                            tooltip: "w-4 h-4"
                        }}/>
                        <Spacer y={1.5}/>
                        <Slider value={[sound * 100]} onValueChange={(value) => setSound(value[0] / 100)} />
                    </div>
                    <div>
                        <Title title="Ambient" tooltipString="This controls the audio settings." classNames={{
                            title: "text-base",
                            tooltip: "w-4 h-4"
                        }}/>
                        <Spacer y={1.5}/>
                        <Slider value={[ambient * 100]} onValueChange={(value) => setAmbient(value[0] / 100)} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
