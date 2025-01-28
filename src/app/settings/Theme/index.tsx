import { QuestionTooltip } from "@/components"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { cn, Spacer, Switch } from "@heroui/react"
import { useTheme } from "next-themes"
import React, { FC } from "react"

export const Theme: FC = () => {
    const { theme, setTheme } = useTheme()
    return (
        <div>
            <div>
                <div className="flex gap-2 items-center">
                    <div className="text-lg font-bold">Theme</div>
                    <QuestionTooltip message="Change the theme of the application." />
                </div>
            </div>
            <Spacer y={4} />
            <div className="flex justify-between">
                <div>Dark Mode</div>
                <Switch
                    size="lg"
                    thumbIcon={({ isSelected, className }) =>
                        isSelected ? (
                            <SunIcon className={cn(className, "w-4 h-4")} />
                        ) : (
                            <MoonIcon className={cn(className, "w-4 h-4")} />
                        )
                    }
                    isSelected={theme === "dark"}
                    onValueChange={(isSelected) => {
                        setTheme(isSelected ? "dark" : "light")
                    }}
                />
            </div> 
        </div>
    )
}
