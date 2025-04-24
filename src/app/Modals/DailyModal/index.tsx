"use client"
import {
    DAILY_DISCLOSURE,
    QUERY_STATIC_SWR_MUTATION,
    QUERY_USER_SWR_MUTATION,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    Card,
    Spacer,
    Image,
    ExtendedButton,
    DialogTitle,
    ScaledImage,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { useGraphQLQueryStaticSwr, useGraphQLQueryUserSwr } from "@/hooks"
import { DailyRewardId } from "@/modules/entities"
import { AssetIconId, assetIconMap, AssetUIId, assetUiMap } from "@/modules/assets"
import { ExternalEventEmitter, ExternalEventName } from "@/game"
import { getCurrentDayMidnightUtc, getUtc } from "@/modules/common"
export const DailyModal: FC = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(DAILY_DISCLOSURE)
    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(QUERY_USER_SWR_MUTATION)
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    const indexMap: Record<number, DailyRewardId> = {
        0: DailyRewardId.Day1,
        1: DailyRewardId.Day2,
        2: DailyRewardId.Day3,
        3: DailyRewardId.Day4,
        4: DailyRewardId.Day5,
    }
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Daily</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index} className="w-full px-3 py-2 relative">
                                <div className="text-sm">Day {index + 1}</div>
                                <Spacer y={4} />
                                <div className="flex gap-1 items-center">
                                    <Image
                                        src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                                        className="w-5 h-5"
                                    />
                                    <div className="text-sm">
                                        {
                                            staticSwr.data?.data.dailyRewardInfo[indexMap[index]]
                                                .golds
                                        }
                                    </div>
                                </div>
                                {(userSwr.data?.data.user.dailyRewardStreak ?? 0) >= (index + 1) && (
                                    <div className="absolute top-0 right-0 w-full h-full grid place-items-center rounded-md bg-black/50">
                                        <ScaledImage src={assetUiMap[AssetUIId.Checked].base.assetUrl} />
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                    <Spacer y={4} />
                    <Card className="w-full px-3 py-2">
                        <div className="text-sm">Day 5</div>
                        <Spacer y={4} />
                        <div className="flex gap-2">
                            <div className="flex gap-1 items-center">
                                <Image
                                    src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                                    className="w-5 h-5"
                                />
                                <div className="text-sm">
                                    {
                                        staticSwr.data?.data.dailyRewardInfo[DailyRewardId.Day5]
                                            .golds
                                    }
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <DialogFooter>
                    <ExtendedButton className="w-full"
                        disabled={getCurrentDayMidnightUtc().isBefore(
                            getUtc(userSwr.data?.data.user.dailyRewardLastClaimTime)
                        )}
                        onClick={() => {
                            ExternalEventEmitter.emit(ExternalEventName.RequestClaimDailyReward)
                        }}
                    >Claim</ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
