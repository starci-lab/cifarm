import { useSingletonHook } from "@/modules/singleton-hook"
import { setTutorialCallback, useAppDispatch, useAppSelector } from "@/redux"
import { setTutorialStep } from "@/redux"
import { useEffect } from "react"
import { useDisclosure } from "react-use-disclosure"
import { INVENTORY_DISCLOSURE, NEIGHBORS_DISCLOSURE, SHOP_DISCLOSURE, TUTORIAL_DISCLOSURE, WS } from "@/app/(core)/constants"
import { pathConstants } from "@/constants"
import { usePathname } from "next/navigation"
import { EmitterEventName, useWs } from "@/hooks/ws"
import { sleep } from "@/modules/common"
import { TutorialStep } from "@/modules/entities"

export const useTutorialEffects = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(TUTORIAL_DISCLOSURE)
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const showGameUI = useAppSelector((state) => state.sessionReducer.showGameUI)
    
    useEffect(() => {
        if (pathname !== pathConstants.play) {
            return
        }
        if (!showGameUI) {
            return
        }
        if (!user?.tutorial?.start) {
            dispatch(setTutorialStep(TutorialStep.Start))
            dispatch(setTutorialCallback(async () => {
                socket?.emit(EmitterEventName.UpdateTutorial, {
                    start: true,
                })
            }))  
            open()
        }
    }, [user, pathname, showGameUI, socket])

    const { isOpen: isShopOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(SHOP_DISCLOSURE)
    
    useEffect(() => {
        if (!isShopOpen) {
            return
        }
        if (!user?.tutorial?.openShopModal) {
            dispatch(setTutorialStep(TutorialStep.OpenShopModal))
            dispatch(setTutorialCallback(async () => {
                socket?.emit(EmitterEventName.UpdateTutorial, {
                    openShopModal: true,
                })
            }))  
            open()
        }
    }, [user, isShopOpen, socket])

    const { isOpen: isInventoryOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(INVENTORY_DISCLOSURE)
    useEffect(() => {
        if (!isInventoryOpen) {
            return
        }
        if (!user?.tutorial?.openInventoryModal) {
            dispatch(setTutorialStep(TutorialStep.OpenInventoryModal))
            dispatch(setTutorialCallback(async () => {
                socket?.emit(EmitterEventName.UpdateTutorial, {
                    openInventoryModal: true,
                })
            }))  
            open()
        }
    }, [user, isInventoryOpen, socket])

    useEffect(() => {
        if (pathname !== pathConstants.play) {
            return
        }
        if (!showGameUI) {
            return
        }
        if (!user?.tutorial?.openInventoryModal || isInventoryOpen) {
            return
        }
        if (!user?.tutorial?.plant) {
            dispatch(setTutorialStep(TutorialStep.Plant))
            dispatch(setTutorialCallback(async () => {
                socket?.emit(EmitterEventName.UpdateTutorial, {
                    plant: true,
                })
            }))  
            open()
        }
    }, [user, isInventoryOpen, socket, pathname, showGameUI])

    const { isOpen: isNeighborsOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_DISCLOSURE)
    useEffect(() => {
        if (!isNeighborsOpen) {
            return
        }
        if (!user?.tutorial?.openNeighborsModal) {
            dispatch(setTutorialStep(TutorialStep.OpenNeighborsModal))
            dispatch(setTutorialCallback(async () => {
                socket?.emit(EmitterEventName.UpdateTutorial, {
                    openNeighborsModal: true,
                })
            }))  
            open()
        }
    }, [user, isNeighborsOpen, socket])

    const visitedUser = useAppSelector((state) => state.gameReducer.visitedUser)
    useEffect(() => {
        if (!visitedUser) {
            return
        }
        const handleEffect = async () => {
            if (!user?.tutorial?.atNeighbor) {
                await sleep(1000)
                dispatch(setTutorialStep(TutorialStep.AtNeighbor))
                dispatch(setTutorialCallback(async () => {
                    socket?.emit(EmitterEventName.UpdateTutorial, {
                        atNeighbor: true,
                    })
                }))  
                open()
            }
        }
        handleEffect()
    }, [user, visitedUser, socket])
}
