"use client"
import { MINT_AMOUNT_DISCLOSURE, MINT_DISCLOSURE, GRAPHQL_QUERY_USER_SWR } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { EnhancedButton, List, ModalHeader } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"
import { useGraphQLQueryUserSwr } from "@/hooks"

export enum MintRequirement {
    OffchainBalance = "Offchain Balance",
    KYC = "KYC",
}

export const MintModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(MINT_DISCLOSURE)
    const { swr: { data: user } } = useSingletonHook<ReturnType<typeof useGraphQLQueryUserSwr>>(GRAPHQL_QUERY_USER_SWR)
    const { toggle: mintAmountToggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(MINT_AMOUNT_DISCLOSURE)
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <div>
                            <ModalHeader title="Mint" description="In CiFarm, you earn $CARROT, which is stored off-chain. You can mint it on-chain whenever you meet the required conditions." />
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <List 
                        enableScroll={false}
                        items={Object.values(MintRequirement)}
                        contentCallback={(item) => {
                            switch (item) {
                            case MintRequirement.OffchainBalance:
                                return <div className="w-full flex items-center justify-between p-3">
                                    <div className="text-sm">Off-chain balance</div>
                                    <div>{`${user?.data.user.tokens}`}</div>
                                </div>
                            case MintRequirement.KYC:
                                return <div className="w-full flex items-center justify-between p-3">
                                    <div className="text-sm">Already KYC</div>
                                </div>
                            }
                        }}
                    />
                </div>
                <DialogFooter>
                    <EnhancedButton
                        variant="ghost"
                        onClick={() => toggle(false)}
                        className="text-muted-foreground"
                    >
                        Cancel
                    </EnhancedButton>
                    <EnhancedButton onClick={() => mintAmountToggle(true)}>
                        Mint
                    </EnhancedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
