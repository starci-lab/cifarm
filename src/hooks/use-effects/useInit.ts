import { WELCOME_DISCLOSURE } from "@/app/(core)/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { useDisclosure } from "react-use-disclosure"

export const useInit = () => {
    const { open } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(WELCOME_DISCLOSURE)
    useEffect(() => {
        open()
    }, [open])
}
