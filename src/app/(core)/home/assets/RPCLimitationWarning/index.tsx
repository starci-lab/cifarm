import React, { FC } from "react"
import { ExtendedButton, Spacer } from "@/components"
import { useAppSelector } from "@/redux"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { useDisclosure } from "react-use-disclosure"
import { useSingletonHook } from "@/singleton"
import { UPGRADE_MODAL_DISCLOSURE } from "@/singleton"
dayjs.extend(duration)

export const RPCLimitationWarning: FC = () => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const refreshMinutes = dayjs
        .duration(
            staticData?.blockchainDataConfigs.balances.refreshInterval || 0,
            "seconds"
        )
        .asMinutes()
    const { open: openUpgradeRPCModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(UPGRADE_MODAL_DISCLOSURE)
    return (
        <div className="bg-secondary/10 p-4 rounded-lg">
            <div className="text-xl text-secondary leading-none">RPC Limitation</div>
            <Spacer y={4} />
            <div className="text-muted-foreground">
        Due to current RPC limitations, data is cached and can be refreshed
        every {refreshMinutes} minutes. Need more frequent updates? Upgrade to
        an Unlimited RPC plan for uninterrupted access. You will earn some
        tCIFARM tokens as a reward.
            </div>
            <Spacer y={4} />
            <ExtendedButton
                variant="flat"
                color="secondary"
                onClick={openUpgradeRPCModal}
            >
        Upgrade
            </ExtendedButton>
        </div>
    )
}
