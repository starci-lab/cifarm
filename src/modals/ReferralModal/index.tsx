"use client"
import { REFERRAL_MODAL_DISCLOSURE } from "@/singleton"
import { useSingletonHook } from "@/singleton"
import React, { FC, useEffect, useState } from "react"
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    ExtendedButton,
    Spacer,
    Title,
} from "@/components"
import { Link } from "@phosphor-icons/react"
import { copyTextToClipboard } from "@/components/styled/Snippet"
import { pathConstants } from "@/constants"
import { useAppSelector } from "@/redux"
export const ReferralModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        REFERRAL_MODAL_DISCLOSURE
    )

    const user = useAppSelector((state) => state.apiReducer.coreApi.user)

    const [webUrl, setWebUrl] = useState("")
    useEffect(() => {
        const baseUrl = window.location.origin
        setWebUrl(`${baseUrl}${pathConstants.signIn}?referralUserId=${user?.id}`)
    }, [])

    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Referral</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div className="p-2 bg-content-2 rounded-lg px-3 py-2">
                        <Title
                            title="tCIFARM Balance"
                            tooltipString="tCIFARM."
                            classNames={{
                                title: "text-sm text-muted-foreground",
                                tooltip: "text-muted-foreground w-5 h-5",
                            }}
                        />
                        <div className="text-xl font-bold">{user?.tCIFARM}</div>
                    </div>
                    <Spacer y={4} />
                    <div>
                        <div>
              Sign up with your referral link to get bonus tCIFARM instantly!
                        </div>
                        <div className="text-sm text-muted-foreground">
              Earn rewards when others join through your link — and they get
              rewards too!
                        </div>
                    </div>
                    <Spacer y={4} />
                    <div className="grid grid-cols-3 gap-2">
                        <Card>
                            <CardHeader className="px-3 py-2">
                                <CardTitle>
                                    <div className="text-lg font-bold">
                                        <div className="text-secondary">
                                            <span>
                                                {staticData?.referral.amountPerSuccessfulReferral}
                                            </span>{" "}
                                            <span className="text-sm">tCIFARM</span>
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody className="px-3 py-2">
                                <div className="text-xs text-muted-foreground">
                  Per successful referral
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader className="px-3 py-2">
                                <CardTitle>
                                    <div className="text-lg font-bold">
                                        <div className="text-secondary">
                                            <span>
                                                {staticData?.referral.amountWhenJoiningWithReferral}
                                            </span>{" "}
                                            <span className="text-sm">tCIFARM</span>
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody className="px-3 py-2">
                                <div className="text-xs text-muted-foreground">
                  When joining with a referral
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader className="px-3 py-2">
                                <CardTitle>
                                    <div className="text-lg font-bold">
                                        <div className="text-secondary">
                                            <span>
                                                {
                                                    staticData?.referral
                                                        .amountWhenYourReferralInviteSomeone
                                                }
                                            </span>
                                            <span className="text-sm">tCIFARM</span>
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody className="px-3 py-2">
                                <div className="text-xs text-muted-foreground">
                  When your referral invites someone
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        className="w-full"
                        onClick={() => {
                            copyTextToClipboard(webUrl)
                        }}
                    >
                        <Link /> <div>Referral Link</div>
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
