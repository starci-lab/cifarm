import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    ExtendedButton,
    DialogBody,
    DialogHeader,
    DialogTitle
} from "@/components"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { TUTORIAL_MODAL_DISCLOSURE } from "@/singleton"
import Typewriter from "typewriter-effect"
import { setTutorialIndex, setTutorialStep, useAppDispatch, useAppSelector } from "@/redux"
import { TutorialStep } from "@/types"
import { tutorialScripts } from "./scrips"
import useSWRMutation from "swr/mutation"

export const TutorialModal: FC = () => {
    const { isOpen } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(TUTORIAL_MODAL_DISCLOSURE)

    const tutorialStep = useAppSelector((state) => state.tutorialReducer.tutorialStep)
    const tutorialIndex = useAppSelector((state) => state.tutorialReducer.tutorialIndex)
    
    const scripts = tutorialScripts[tutorialStep]

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
                <DialogHeader>
                    <DialogTitle>Tutorial</DialogTitle>
                </DialogHeader>
                <DialogBody>
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
                                })
                                .start()
                        }}
                    />
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        variant="flat"
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
