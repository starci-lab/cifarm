"use client"
import { PROFILE_DISCLOSURE } from "@/app/constants"
import { List, ModalHeader, Snippet, Spacer, Title } from "@/components"
import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { computeExperiencesQuota, truncateString } from "@/modules/common"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { Button, AvatarChart } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogBody,
} from "@/components"
import { Skeleton } from "@/components/ui/skeleton"
import { useDisclosure } from "react-use-disclosure"
import { useAppSelector } from "@/redux"
    
export enum ProfileModalListItems {
    UID = "UID",
    Provider = "Provider",
}

export const ProfileModal: FC = () => {
    const { toggle, isOpen, close } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(PROFILE_DISCLOSURE)
    const user = useAppSelector(state => state.sessionReducer.user)
    const avatarUrl = user ? user.avatarUrl ?? createJazziconBlobUrl(user.id) : ""
    const quota = user ? computeExperiencesQuota(user.level) : 0
    const router = useRouterWithSearchParams()
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Profile" />
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div className="rounded-lg flex items-center gap-4">
                        {user ? (
                            <AvatarChart avatarUrl={avatarUrl} quota={quota} exp={user.experiences} />
                        ) : (
                            <Skeleton className="h-[160px] w-[160px] rounded-full" />
                        )}
                        <div>
                            <div className="text-xl uppercase">{truncateString(user?.username || "", 12, 4)}</div>
                            <div className="text-muted-foreground">Lv. {user?.level} ({user?.experiences} / {quota})</div>
                        </div>
                    </div>
                    <Spacer y={4} />
                    <List enableScroll={false} items={Object.values(ProfileModalListItems)} contentCallback={(item) => {
                        switch (item) {
                        case ProfileModalListItems.UID:
                            return (
                                <div className="flex gap-2 items-center justify-between px-3 py-2 bg-content-2">
                                    <div>UID</div>
                                    <div>{user ? (
                                        <div className="flex gap-2 items-center">
                                            <div>{truncateString(
                                                user.id
                                            )}</div>
                                            <Snippet code={user.id} />
                                        </div>
                                    ) : <Skeleton className="h-6 w-32" />}</div>
                                </div>
                            )
                        case ProfileModalListItems.Provider:
                            return (
                                <div className="flex gap-2 items-center justify-between px-3 py-2 bg-content-2">
                                    <div>Provider</div>
                                    <div>{user?.oauthProvider}</div>
                                </div>
                            )
                        }
                    }} />
                    <Spacer y={4} />
                    <div>
                        <Title title="Achievements" tooltipString="Achievements and badges earned by the user." />
                        <Spacer y={2} />
                        <div className="text-muted-foreground text-sm">
                                Currently, there are no achievements.
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        className="w-full" 
                        color="destructive"
                        onClick={() => {
                            close()
                            router.push(pathConstants.home)
                        }}
                    >
                        Quit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
