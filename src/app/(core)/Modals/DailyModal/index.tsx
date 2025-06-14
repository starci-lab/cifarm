"use client"
import {
    DAILY_DISCLOSURE,
    QUERY_STATIC_SWR_MUTATION,
} from "@/app/(core)/constants"
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
    DialogBody,
    CardBody,
    CardFooter,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { DailyRewardId } from "@/modules/entities"
import { AssetIconId, assetIconMap, AssetUIId, assetUiMap } from "@/modules/assets"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { getCurrentDayMidnightUtc, getUtc } from "@/modules/common"
import { useAppSelector } from "@/redux"

export const DailyModal: FC = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(DAILY_DISCLOSURE)
    const user = useAppSelector((state) => state.sessionReducer.user)
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
                <DialogBody>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index} className="w-full relative">
                                <CardBody className="p-3">
                                    {(user?.dailyRewardStreak ?? 0) >= (index + 1) && (
                                        <div className="absolute top-0 right-0 w-full h-full grid place-items-center rounded-md bg-black/50">
                                            <ScaledImage src={assetUiMap[AssetUIId.Checked].base.assetUrl} />
                                        </div>
                                    )}
                                    <div className="text-secondary leading-none">Day {index + 1}</div>
                                </CardBody>
                                <CardFooter>
                                    <div className="flex gap-1 items-center">
                                        <Image
                                            src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                                            className="w-6 h-6"
                                        />
                                        <div>
                                            {
                                                staticSwr.data?.data.dailyRewardInfo[indexMap[index]]
                                                    .golds
                                            }
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <Spacer y={4} />
                    <Card className="w-full">
                        <CardBody className="p-3">
                            <div className="text-secondary leading-none">Day 5</div>
                        </CardBody>
                        <CardFooter>
                            <div className="flex gap-2">
                                <div className="flex gap-1 items-center">
                                    <Image
                                        src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                                        className="w-6 h-6"
                                    />
                                    <div>
                                        {
                                            staticSwr.data?.data.dailyRewardInfo[DailyRewardId.Day5]
                                                .golds
                                        }
                                    </div>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton className="w-full"
                        disabled={getCurrentDayMidnightUtc().isBefore(
                            getUtc(user?.dailyRewardLastClaimTime ?? "")
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
