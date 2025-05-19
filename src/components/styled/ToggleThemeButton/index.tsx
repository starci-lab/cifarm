"use client"

import * as React from "react"
import { Moon, Sun } from "@phosphor-icons/react"
import { FC } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ToggleThemeButtonProps {
    classNames?: {
        base?: string
    }
    setTheme: (theme: string) => void
    theme: string
}

export const ToggleThemeButton: FC<ToggleThemeButtonProps> = ({ classNames, setTheme, theme }) => {
    return (
        <Button
            variant="flat"
            size="icon"
            color="secondary"
            onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark")
            }}
            className={cn("rounded-full w-10 h-10 relative", classNames?.base)}
        >
            {theme === "dark" ? (
                <Moon />
            ) : (
                <Sun />
            )}
        </Button>
    )
}
