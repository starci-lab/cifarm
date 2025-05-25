"use client"
import { FallbackScene, FallbackSceneType } from "@/components"
import React from "react"

const NotFound = () => {
    return (
        <FallbackScene type={FallbackSceneType.NotFound404} />
    )
}
export default NotFound