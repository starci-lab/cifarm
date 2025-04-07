import { SpinePlayer } from "@esotericsoftware/spine-player"
import { SpineConfig } from "@/game"
import React, { FC, useEffect, useRef } from "react"
import { v4 } from "uuid"
import { sessionDb } from "@/modules/dexie"
export interface SpineVisualProps {
    spineConfig: SpineConfig
}

export const SpineVisual: FC<SpineVisualProps> = ({ spineConfig }) => {
    const id = v4()
    const playerRef = useRef<SpinePlayer | null>(null)
    useEffect(() => {
        const handleEffect = async () => {
            // if the current version is not downloaded, do nothing
            if (spineConfig.packageId) {
                const _package = await sessionDb.packages
                    .filter((_package) => _package.packageId === spineConfig.packageId)
                    .first()
                if (!_package) return
            }   
            // fetch spine config
            const {
                atlas: { key: atlasKey, textureUrl },
                json: { key: jsonKey },
            } = spineConfig
            if (!textureUrl) throw new Error("Texture URL is required")
            const textureKey = `${atlasKey}-texture`
            const textureAsset = await sessionDb.assets
                .filter((asset) => asset.key === textureKey)
                .first()
            if (!textureAsset) throw new Error("Texture asset not found")
            const atlasAsset = await sessionDb.assets
                .filter((asset) => asset.key === atlasKey)
                .first()
            if (!atlasAsset) throw new Error("Atlas asset not found")
            const atlasText = await atlasAsset.data.text()
            const atlasTextLines = atlasText.split("\n")
            const textureBlobUrl = URL.createObjectURL(textureAsset.data)
            const textureGuid = textureBlobUrl.split("/").pop() ?? ""
            atlasTextLines[0] = textureGuid
            const _atlasBlob = new Blob([atlasTextLines.join("\n")], {
                type: "blob",
            })
            const jsonAsset = await sessionDb.assets
                .filter((asset) => asset.key === jsonKey)
                .first()
            if (!jsonAsset) throw new Error("Json asset not found")
            const jsonBlob = new Blob([jsonAsset.data], {
                type: "blob",
            })
            playerRef.current = new SpinePlayer(`player-container-${id}`, {
                preserveDrawingBuffer: true,
                atlas: URL.createObjectURL(_atlasBlob),
                skeleton: URL.createObjectURL(jsonBlob),
                animation: "idle",
                scale: 0.5,
            })
        }
        handleEffect()
        return () => {
            playerRef.current?.dispose()
            playerRef.current = null
        }
    }, [])   
    return (
        <div id={`player-container-${id}`} className={"w-[1000px] aspect-square w-full"} />
    )
}


