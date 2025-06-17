import { GameAvatar, GameIconButton, ResourceCard, Tooltip, TooltipContent, TooltipTrigger } from "@/components"
import { leftButtons, rightButtons } from "./buttons"
import React, { FC, useEffect, useRef, useState } from "react"
import { useAppSelector } from "@/redux"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { Toolbar } from "./Toolbar"
import { useSingletonHook } from "@/singleton"
import { GRAPHQL_QUERY_STATIC_SWR, PROFILE_DISCLOSURE } from "@/app/(core)/constantsd"
import { useDisclosure } from "react-use-disclosure"
import { getMaxEnergy, truncateString } from "@/modules/common"
import { useGraphQLQueryStaticSwr } from "@/hooks"

export const ReactUI: FC = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)
    const playerContext = useAppSelector(
        (state) => state.sessionReducer.playerContext
    )
    const showGameUI = useAppSelector((state) => state.sessionReducer.showGameUI)
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        PROFILE_DISCLOSURE
    )
    const visitedUser = useAppSelector((state) => state.gameReducer.visitedUser)
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )
    useEffect(() => {
        const base = staticSwr.data?.data.energyRegen.time ?? 0
        const used = user?.energyRegenTime ?? 0
        const remaining = base - used
        console.log(`Energy initialized: ${remaining}`)
        setEnergy(remaining)
    }, [user?.energyRegenTime, staticSwr.data?.data.energyRegen.time])

    const [energy, setEnergy] = useState(0)

    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // Ignore if no energy or energy is 0
        if (!user?.energy || user.energy <= 0) return

        // Clean up old interval if it exists
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }

        // Create new interval
        intervalRef.current = setInterval(() => {
            setEnergy(prev => {
                if (prev > 1) {
                    console.log(`Energy decreased: ${prev - 1}`)
                    return prev - 1
                } else {
                    console.log("Energy reached 0, stopping interval.")
                    clearInterval(intervalRef.current!)
                    intervalRef.current = null
                    return 0
                }
            })
        }, 1000)

        // Cleanup when component unmounts or when user.energy changes
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [user?.energy])

    useEffect(() => {
        if (!energy || energy <= 0) return

        // Clear interval if it exists
        if (intervalRef.current) clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            setEnergy(prev => {
                if (prev > 1) {
                    console.log(`Energy decreased: ${prev - 1}`) // Tracking here
                    return prev - 1
                } else {
                    console.log("Energy reached 0, stopping interval.")
                    clearInterval(intervalRef.current!)
                    intervalRef.current = null
                    return 0
                }
            })
        }, 1000)

        // Cleanup when component unmounts
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [user?.energy]) // You still need energy here if it's reset from somewhere else

    return (
        <>
            {showGameUI ? (
                <>
                    {!visitedUser ? (
                        <div>
                            <div className="top-4 md:top-6 left-4 md:left-6 fixed scale-75 origin-top-left sm:scale-100">
                                <div className="flex items-center" onClick={open}>
                                    <GameAvatar
                                        imgSrc={user?.avatarUrl}
                                        jazzString={user?.id}  
                                    />
                                    <div className="px-2 py-1.5 bg-content-4/50 rounded-r-md">
                                        <div className="uppercase text-sm">{truncateString(user?.username ?? "", 12, 0)}</div>
                                        <div className="text-xs text-muted-foreground">Lv.{user?.level}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-4 fixed top-4 md:top-6 right-4 md:right-6 scale-75 origin-top-right sm:scale-100">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <ResourceCard text={`${user?.energy}/${getMaxEnergy(user?.level ?? 0)}`} iconImgSrc={assetIconMap[AssetIconId.Energy].base.assetUrl}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {
                                            user?.energyFull ? (
                                                <div className="text-sm">Energy is full</div>
                                            ) : (
                                                <div className="text-sm">{`Next energy in ${energy} seconds`}</div>
                                            )
                                        }
                                    </TooltipContent>
                                </Tooltip>
                                <ResourceCard text={`${user?.golds}`} iconImgSrc={assetIconMap[AssetIconId.Gold].base.assetUrl}/>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="top-4 md:top-6 left-4 md:left-6 fixed scale-75 origin-top-left sm:scale-100">
                                <div className="flex items-center">
                                    <GameAvatar
                                        imgSrc={visitedUser?.avatarUrl}
                                        jazzString={visitedUser?.id}  
                                    />
                                    <div className="px-2 py-1.5 bg-background/50 rounded-r-md">
                                        <div className="uppercase text-sm">{visitedUser?.username}</div>
                                        <div className="text-xs text-muted-foreground">Lv.{visitedUser?.level}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-4 fixed top-4 md:top-6 right-4 md:right-6 scale-75 origin-top-right sm:scale-100">
                                <ResourceCard text={`${user?.energy}/${getMaxEnergy(user?.level ?? 0)}`} iconImgSrc={assetIconMap[AssetIconId.Energy].base.assetUrl}/>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-4 fixed top-[150px] left-4 md:left-6 scale-75 origin-top-left sm:scale-100">
                        {leftButtons
                            .map((button, index) => (
                                <GameIconButton
                                    key={index}
                                    text={button.text}
                                    imageSrc={button.imageSrc}
                                    onClick={button.onClick}
                                    hidden={!button.availableIn.includes(playerContext)}
                                />
                            ))}
                    </div>
                    <div className="flex flex-col gap-4 fixed top-[150px] right-4 md:right-6 scale-75 origin-top-right sm:scale-100">
                        {rightButtons
                            .map((button, index) => (
                                <GameIconButton
                                    key={index}
                                    text={button.text}
                                    imageSrc={button.imageSrc}
                                    onClick={button.onClick}
                                    hidden={!button.availableIn.includes(playerContext)}
                                />
                            ))}
                    </div>
                    <Toolbar />
                </>
            ) : null}
        </>
    )
}

export * from "./Toolbar"