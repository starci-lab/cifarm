import React, { FC } from "react"
import { Image, Spacer, HoverImage, YouTubePlayer } from "@/components"
import { useMainVisual } from "@/hooks/useMainVisual"

export const MainVisual: FC = () => {
    const {
        selectedMainVisualKey,
        isHovered,
        setIsHovered,
        progress,
        visuals,
        dispatch,
        setSelectedMainVisualKey
    } = useMainVisual()

    const renderContent = (key: string) => {
        const visual = visuals.find((visual) => visual.selectedKey === key)
        if (visual?.type === MainVisualType.Image) {
            return (
                <div className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        src={visual.url}
                        alt={visual.selectedKey}
                        className="w-full object-cover rounded-lg aspect-video"
                    />
                    <div className={`w-[98%] left-1/2 -translate-x-1/2 h-1 bg-content-2 mt-2 rounded-full overflow-hidden absolute bottom-2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                        <div 
                            className="h-full bg-secondary transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )
        }
        if (visual?.type === MainVisualType.Youtube) {
            return (
                <div className="relative self-stretch">
                    <YouTubePlayer
                        youtubeUrl={visual.url}
                        className="w-full rounded-lg aspect-video"
                        title={visual.selectedKey}
                    />
                    <div className={`w-[98%] left-1/2 -translate-x-1/2 h-1 bg-content-2 mt-2 rounded-full overflow-hidden absolute bottom-2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                        <div 
                            className="h-full bg-secondary transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="relative justify-center flex flex-col items-center">
            {renderContent(selectedMainVisualKey)}
            <Spacer y={4} />
            <div className="w-full flex gap-2 overflow-x-scroll no-scrollbar">
                <div className="relative w-full flex items-center justify-start md:justify-center gap-2">
                    {visuals.map((visual) => (
                        <HoverImage
                            classNames={{
                                container: "w-32 flex-shrink-0 rounded-lg aspect-video",
                            }}
                            onClick={() => {
                                dispatch(setSelectedMainVisualKey(visual.selectedKey))
                            }}
                            key={visual.selectedKey}
                            imageUrl={visual.thumbnailUrl}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export enum MainVisualType {
    Image = "image",
    Youtube = "youtube",
}

export interface MainVisual {
    type: MainVisualType;
    url: string;
    selectedKey: string;
    thumbnailUrl: string;
}
