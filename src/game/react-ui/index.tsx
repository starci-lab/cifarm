import { GameAvatar, GameIconButton, ResourceCard } from "@/components"
import { leftButtons, rightButtons } from "./buttons"
import React, { FC } from "react"
import { useAppSelector } from "@/redux"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { Toolbar } from "./Toolbar"
import { useSingletonHook } from "@/modules/singleton-hook"
import { PROFILE_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"
import { getMaxEnergy } from "@/modules/common"

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
    return (
        <>
            {showGameUI ? (
                <>
                    {!visitedUser ? (
                        <div>
                            <div className="top-6 left-6 absolute">
                                <div className="flex items-center" onClick={open}>
                                    <GameAvatar
                                        imgSrc={user?.avatarUrl}
                                        jazzString={user?.accountAddress}  
                                    />
                                    <div className="px-2 py-1.5 bg-content-4/50 rounded-r-md">
                                        <div className="uppercase text-sm">{user?.username}</div>
                                        <div className="text-xs text-muted-foreground">Lv.{user?.level}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-4 absolute top-6 right-6">
                                <ResourceCard text={`${user?.energy}/${getMaxEnergy(user?.level ?? 0)}`} iconImgSrc={assetIconMap[AssetIconId.Energy].base.assetUrl}/>
                                <ResourceCard text={`${user?.golds}`} iconImgSrc={assetIconMap[AssetIconId.Gold].base.assetUrl}/>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between w-full">
                            <div className="top-6 left-6 absolute">
                                <div className="flex items-center">
                                    <GameAvatar
                                        imgSrc={visitedUser?.avatarUrl}
                                        jazzString={visitedUser?.accountAddress}  
                                    />
                                    <div className="px-2 py-1.5 bg-background/50 rounded-r-md">
                                        <div className="uppercase text-sm">{visitedUser?.username}</div>
                                        <div className="text-xs text-muted-foreground">Lv.{visitedUser?.level}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-4 fixed top-6 right-6">
                                <ResourceCard text={`${user?.energy}/${getMaxEnergy(user?.level ?? 0)}`} iconImgSrc={assetIconMap[AssetIconId.Energy].base.assetUrl}/>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-4 fixed top-[150px] left-6">
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
                    <div className="flex flex-col gap-4 fixed top-[150px] right-6">
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
                    <div className="fixed left-1/2 -translate-x-1/2 bottom-0">
                        <Toolbar />
                    </div>
                </>
            ) : null}
        </>
    )
}

export * from "./Toolbar"
