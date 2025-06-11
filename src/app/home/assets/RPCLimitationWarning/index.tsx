import React, { FC } from "react"
import { ExtendedButton, Spacer } from "@/components"

export const RPCLimitationWarning: FC = () => {
    return (
        <div className="bg-secondary/10 p-4 rounded-lg">
            <div className="text-xl text-secondary leading-none">RPC Limitation</div>
            <Spacer y={4} />
            <div className="text-muted-foreground">
            Due to current RPC limitations, data can be refreshed every 3 minutes. Need more frequent updates? Upgrade to an Unlimited RPC plan for uninterrupted access. You will earn some tCIFARM tokens as a reward.
            </div>
            <Spacer y={4} />
            <ExtendedButton variant="flat" color="secondary">
                Upgrade
            </ExtendedButton>
        </div>
    )
}