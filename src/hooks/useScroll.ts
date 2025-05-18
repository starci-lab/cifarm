import { useState, useEffect } from "react"

export const useScroll = (threshold: number = 100) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setShow(scrollPosition > threshold)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [threshold])

    return show
} 