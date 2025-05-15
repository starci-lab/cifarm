import { Button, Card, CardContent, CardHeader, Title } from "@/components"
import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "next-themes"
import React, { FC } from "react"

export const Theme: FC = () => {
    const { theme, setTheme } = useTheme()
    return (
        <Card>
            <CardHeader>
                <Title title="Theme" tooltipString="Change the theme of the application." />
            </CardHeader>
            <CardContent>   
                <div className="flex justify-between items-center">
                    <div className="text-sm">Mode</div>
                    <Button size="icon" variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {
                            theme === "dark" ? (
                                <Sun />
                            ) : (
                                <Moon />
                            )
                        }
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
