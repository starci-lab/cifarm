import { useState, useRef, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux"
import { setSelectedMainVisualKey } from "@/redux"
import { MainVisual, MainVisualType } from "@/app/home/MainVisual"

const SLIDE_DURATION = 10000 // 10 seconds per slide

export const useMainVisual = () => {
    const selectedMainVisualKey = useAppSelector(
        (state) => state.sessionReducer.selectedMainVisualKey
    )
    const [isHovered, setIsHovered] = useState(false)
    const [progress, setProgress] = useState(0)
    const progressInterval = useRef<NodeJS.Timeout>()
    const dispatch = useAppDispatch()

    const visuals: Array<MainVisual> = [
        {
            type: MainVisualType.Image,
            url: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/visual_1.jpg",
            selectedKey: "visual-1",
            thumbnailUrl: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/visual_1.jpg",
        },
        {
            type: MainVisualType.Image,
            url: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/download%20(2).png",
            selectedKey: "visual-4",
            thumbnailUrl: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/download%20(2).png",
        },
        {
            type: MainVisualType.Image,
            url: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/0069009f-df5d-42b9-9a80-b925b8181127%20(1).jpg",
            selectedKey: "visual-3",
            thumbnailUrl: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/0069009f-df5d-42b9-9a80-b925b8181127%20(1).jpg",
        },
    ]

    const startProgressTimer = () => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current)
        }
        
        setProgress(0)
        const startTime = Date.now()
        
        progressInterval.current = setInterval(() => {
            const elapsed = Date.now() - startTime
            const newProgress = (elapsed / SLIDE_DURATION) * 100
            
            if (newProgress >= 100) {
                const currentIndex = visuals.findIndex(v => v.selectedKey === selectedMainVisualKey)
                const nextIndex = (currentIndex + 1) % visuals.length
                dispatch(setSelectedMainVisualKey(visuals[nextIndex].selectedKey))
                setProgress(0)
            } else {
                setProgress(newProgress)
            }
        }, 10)
    }

    useEffect(() => {
        const currentVisual = visuals.find(v => v.selectedKey === selectedMainVisualKey)
        if (currentVisual?.type !== MainVisualType.Youtube) {
            startProgressTimer()
        }
        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current)
            }
        }
    }, [selectedMainVisualKey])

    return {
        selectedMainVisualKey,
        isHovered,
        setIsHovered,
        progress,
        visuals,
        dispatch,
        setSelectedMainVisualKey
    }
} 