import { GameAvatar, GameIconButton, ResourceCard } from "@/components"
import { leftButtons, rightButtons } from "./buttons"
import React, { FC } from "react"
import { useAppSelector } from "@/redux"
import { AssetIcon, assetIconMap } from "@/modules/assets"
import { Toolbar } from "./Toolbar"
export const ReactUI: FC = () => {
    const user = useAppSelector(state => state.sessionReducer.user)
    return (
        <>
            <div className="absolute top-6 left-6">
                <div className="flex items-center">
                    <GameAvatar
                        imgSrc={user?.avatarUrl}
                        jazzString={user?.accountAddress}  
                    />
                    <div className="p-2 bg-background/50 rounded-l-md -ml-4 pl-6 rounded-r-md">
                        <div className="uppercase">{user?.username}</div>
                        <div className="text-sm text-muted-foreground">Lv.{user?.level}</div>
                    </div>    
                </div>  
            </div>
            <div className="flex flex-col gap-4 absolute top-[200px] left-6">
                {leftButtons.map((button, index) => (
                    <GameIconButton
                        key={index}
                        text={button.text}
                        imgSrc={button.imgSrc}
                        onClick={button.onClick}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-4 absolute top-[200px] right-6">
                {rightButtons.map((button, index) => (
                    <GameIconButton
                        key={index}
                        text={button.text}
                        imgSrc={button.imgSrc}
                        onClick={button.onClick}
                    />
                ))}
            </div>
            <div className="absolute top-6 right-6">
                <div className="grid gap-4">
                    <ResourceCard amount={user?.energy ?? 0} iconImgSrc={assetIconMap[AssetIcon.Energy].base.assetUrl}/>
                    <ResourceCard amount={user?.golds ?? 0} iconImgSrc={assetIconMap[AssetIcon.Golds].base.assetUrl}/>
                    <ResourceCard amount={user?.tokens ?? 0} iconImgSrc={assetIconMap[AssetIcon.Tokens].base.assetUrl}/>
                </div>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <Toolbar />
            </div>
        </>
    )
}
