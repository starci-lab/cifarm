import { WELCOME_MODAL_DISCLOSURE } from "@/singleton"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { useDisclosure } from "react-use-disclosure"

export const useInit = () => {
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        WELCOME_MODAL_DISCLOSURE
    )
    useEffect(() => {
        open()
    }, [open])
}
