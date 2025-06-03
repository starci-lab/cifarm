import React, { FC, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    ExtendedButton,
    DialogBody,
    Image
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { TUTORIAL_DISCLOSURE } from "@/app/constants"
import Typewriter from "typewriter-effect"
import { setTutorialIndex, setTutorialStep, useAppDispatch, useAppSelector } from "@/redux"
import { TutorialStep } from "@/modules/entities"
import { tutorialScripts } from "./scrips"
import useSWRMutation from "swr/mutation"

export const TutorialModal: FC = () => {
    const { isOpen, close } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(TUTORIAL_DISCLOSURE)

    const tutorialStep = useAppSelector((state) => state.tutorialReducer.tutorialStep)
    const tutorialIndex = useAppSelector((state) => state.tutorialReducer.tutorialIndex)
    
    const scripts = tutorialScripts[tutorialStep]

    const [typingDone, setTypingDone] = useState(false)

    const dispatch = useAppDispatch()
    // nha cai tutorial
    const callback = useAppSelector((state) => state.tutorialReducer.callback)
    const swrMutation = useSWRMutation("TUTORIAL_CALLBACK", async () => {
        await callback?.()
    })
    return (
        <Dialog
            open={isOpen}
        >
            <DialogContent className="sm:max-w-[325px]">
                <DialogBody className="relative">
                    <div className="absolute aspect-square h-40 overflow-hidden -top-[160px] left-8">
                        <Image
                            className="w-60 aspect-square object-cover min-h-60"
                            src={scripts[tutorialIndex].image}
                            alt="Tutorial"
                        />
                    </div>
                    <Typewriter
                        key={tutorialIndex} 
                        options={
                            {
                                strings: scripts[tutorialIndex].text,
                                autoStart: true,
                                loop: false,
                                delay: 25,
                            }
                        }
                        onInit={(typewriter) => {
                            typewriter
                                .callFunction(() => {
                                    console.log("Typing finished") // You can trigger setState or other logic here
                                    // For example:
                                    setTypingDone(true)
                                })
                                .start()
                        }}
                    />
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        variant="flat"
                        disabled={!typingDone}
                        color="secondary"
                        isLoading={swrMutation.isMutating}
                        onClick={async () => {
                            if (tutorialIndex < scripts.length - 1) {
                                dispatch(setTutorialIndex(tutorialIndex + 1))
                            } else {
                                dispatch(setTutorialIndex(0))
                                dispatch(setTutorialStep(TutorialStep.Start))
                                await swrMutation.trigger()
                                close()
                            }
                            setTypingDone(false)
                        }}
                        className="w-full"
                    >
            Continue
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
