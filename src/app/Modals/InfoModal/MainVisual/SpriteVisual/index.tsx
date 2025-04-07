import React, { FC, useEffect, useState  } from "react"
import { TextureConfig } from "@/game"
import { Image } from "../../../../../components/styled/Image"
import { sessionDb } from "@/modules/dexie"

export interface SpriteVisualProps {
  textureConfig: TextureConfig;
}
export const SpriteVisual: FC<SpriteVisualProps> = ({ textureConfig }) => {
    const [src, setSrc] = useState<string>("")
    useEffect(() => {
        const handleEffect = async () => {
            const asset = await sessionDb.assets
                .filter((asset) => asset.key === textureConfig.key)
                .first()
            if (!asset) return
            setSrc(URL.createObjectURL(asset.data))
        }
        handleEffect()
    }, [])
    return (
        <Image
            src={src}
            className="w-full max-w-[300px]"
        />
    )
}