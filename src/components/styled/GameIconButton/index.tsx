"use client"

import React, { FC, useRef, useState, useEffect } from "react"
import { ScaledImage } from "../Image"
import { cn } from "@/lib/utils"
interface GameIconButtonProps {
  imageSrc: string;
  text: string;
  onClick: () => void;
  hidden?: boolean;
}

export const GameIconButton: FC<GameIconButtonProps> = ({
    text,
    imageSrc,
    onClick,
    hidden = false,
}) => {
    const divRef = useRef<HTMLDivElement | null>(null)

    const [divHeight, setDivHeight] = useState(0)

    useEffect(() => {
    // Set the height of the div after it's rendered
        if (divRef.current) {
            setDivHeight(divRef.current.offsetHeight)
        }
    }, [text])
    return (
        <div
            className={cn("flex flex-col items-center w-fit h-fit relative", hidden && "hidden")}
            onClick={onClick}
        >
            <ScaledImage src={imageSrc} />
            <div
                ref={divRef}
                className="text-sm -mt-[20px] text-foreground absolute left-1/2 transform -translate-x-1/2 text-center"
                style={{
                    WebkitTextStroke: "4px white",
                    paintOrder: "stroke fill",
                    lineHeight: 1,
                    bottom: `calc(8px - ${divHeight / 2}px)`, // Adjust as needed for desired positioning
                }}
            >
                {text}
            </div>
        </div>
    )
}
