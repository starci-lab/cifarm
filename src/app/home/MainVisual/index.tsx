import React, { FC } from "react"
import { Image, Spacer, HoverImage, YouTubePlayer } from "@/components"
import { RootState } from "@/redux/store"
import { useAppDispatch, useAppSelector, setSelectedMainVisualKey } from "@/redux"

export const MainVisual: FC = () => {
    const selectedMainVisualKey = useAppSelector(
        (state: RootState) => state.sessionReducer.selectedMainVisualKey
    )

    const visuals: Array<MainVisual> = [
        {
            type: MainVisualType.Image,
            url: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/visual_1.jpg",
            selectedKey: "visual-1",
            thumbnailUrl:
        "https://cifarm.sgp1.cdn.digitaloceanspaces.com/visual_1.jpg",
        },
        {
            type: MainVisualType.Youtube,
            url: "https://youtu.be/OZmK0YuSmXU?list=RDRgvasEOP00A",
            selectedKey: "visual-2",
            thumbnailUrl:
        "https://cifarm.sgp1.cdn.digitaloceanspaces.com/visual_1.jpg",
        },
        {
            type: MainVisualType.Image,
            url: "https://picsum.photos/1000/1000?random=1",
            selectedKey: "visual-3",
            thumbnailUrl:
        "https://picsum.photos/1000/1000?random=1",
        },
        {
            type: MainVisualType.Image,
            url: "https://picsum.photos/1000/1000?random=2",
            selectedKey: "visual-4",
            thumbnailUrl:
        "https://picsum.photos/1000/1000?random=2",
        },
    ]

    const renderContent = (key: string) => {
        const visual = visuals.find((visual) => visual.selectedKey === key)
        if (visual?.type === MainVisualType.Image) {
            return (
                <Image
                    src={visual.url}
                    alt={visual.selectedKey}
                    className="w-full object-cover rounded-lg aspect-video"
                />
            )
        }
        if (visual?.type === MainVisualType.Youtube) {
            return (
                <YouTubePlayer
                    youtubeUrl={visual.url}
                    className="w-full rounded-lg aspect-video"
                    title={visual.selectedKey}
                />
            )
        }
    }

    const dispatch = useAppDispatch()

    return (
        <div className="flex-1 relative">
            {renderContent(selectedMainVisualKey)}
            <Spacer y={4} />
            <div className="flex flex-wrap gap-2">
                {visuals.map((visual) => (
                    <HoverImage
                        classNames={{
                            container: "w-32 rounded-lg aspect-video",
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
