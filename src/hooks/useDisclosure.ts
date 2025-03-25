import { useState, useCallback } from "react"

export const useDisclosure = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState)

    const onOpen = useCallback(() => setIsOpen(true), [])
    const onClose = useCallback(() => setIsOpen(false), [])
    const onOpenChange = useCallback((open: boolean) => setIsOpen(open), [])

    return {
        isOpen,
        onOpen,
        onClose,
        onOpenChange,
    }
} 