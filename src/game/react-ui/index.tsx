import { GameAvatar, GameIconButton, ResourceCard } from "@/components"
import { leftButtons, rightButtons } from "./buttons"
import React, { FC } from "react"
import { useAppSelector } from "@/redux"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { Toolbar } from "./Toolbar"
import { useSingletonHook } from "@/modules/singleton-hook"
import { PROFILE_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"

export const ReactUI: FC = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)
    const playerContext = useAppSelector(
        (state) => state.sessionReducer.playerContext
    )
    const showGameUI = useAppSelector((state) => state.sessionReducer.showGameUI)
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        PROFILE_DISCLOSURE
    )
    return (
        <>
            {showGameUI ? (
                <>
                    <div className="absolute top-6 left-6" onClick={open}>
                        <div className="flex items-center">
                            <GameAvatar
                                imgSrc={user?.avatarUrl}
                                jazzString={user?.accountAddress}  
                            />
                            <div className="px-2 py-1.5 bg-background/50 rounded-r-md">
                                <div className="uppercase text-sm">{user?.username}</div>
                                <div className="text-xs text-muted-foreground">Lv.{user?.level}</div>
                            </div>    
                        </div>  
                    </div>
                    <div className="flex flex-col gap-4 absolute top-[175px] left-6">
                        {leftButtons
                            .filter((button) => button.availableIn.includes(playerContext))
                            .map((button, index) => (
                                <GameIconButton
                                    key={index}
                                    text={button.text}
                                    imageSrc={button.imageSrc}
                                    onClick={button.onClick}
                                />
                            ))}
                    </div>
                    <div className="flex flex-col gap-4 absolute top-[175px] right-6">
                        {rightButtons
                            .filter((button) => button.availableIn.includes(playerContext))
                            .map((button, index) => (
                                <GameIconButton
                                    key={index}
                                    text={button.text}
                                    imageSrc={button.imageSrc}
                                    onClick={button.onClick}
                                />
                            ))}
                    </div>
                    <div className="absolute top-6 right-6">
                        <div className="grid gap-4">
                            <ResourceCard amount={user?.energy ?? 0} iconImgSrc={assetIconMap[AssetIconId.Energy].base.assetUrl}/>
                            <ResourceCard amount={user?.golds ?? 0} iconImgSrc={assetIconMap[AssetIconId.Gold].base.assetUrl}/>
                            <ResourceCard amount={user?.tokens ?? 0} iconImgSrc={assetIconMap[AssetIconId.Token].base.assetUrl}/>
                        </div>
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                        <Toolbar />
                    </div>
                </>
            ) : null
            }
        </>
    )
}

export * from "./Toolbar"
