import React, { useEffect, useRef } from "react"
import { SpinePlayer as CoreSpinePlayer } from "@esotericsoftware/spine-player"
    
interface SpinePlayerProps {
    jsonUrl: string
    atlasUrl: string
    animation: string
    scale?: number
    className?: string
}

export const SpinePlayer = ({ jsonUrl, atlasUrl, animation, scale = 0.5, className }: SpinePlayerProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const playerRef = useRef<CoreSpinePlayer | null>(null)

    useEffect(() => {
        if (containerRef.current) {
            playerRef.current = new CoreSpinePlayer(containerRef.current, {
                jsonUrl,
                atlasUrl,
                animation,
                viewport: {
                    debugRender: false,
                },
                showLoading: false,
                scale,
                backgroundColor: "#00000000",
                showControls: false,
                alpha: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: true,
            })
            playerRef.current?.play()
        }

        return () => {
            playerRef.current?.dispose()
        }
    }, [])

    return <div id="player-container" ref={containerRef} className={className}></div>
}