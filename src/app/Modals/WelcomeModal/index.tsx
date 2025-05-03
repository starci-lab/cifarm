"use client"
import { WELCOME_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import {
    ExtendedButton,
    Image,
    ModalHeader,
    ScrollArea,
    Spacer,
} from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"

export const WelcomeModal: FC = () => {
    const { isOpen, toggle, close } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(WELCOME_DISCLOSURE)

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="First Season Begin!!" />
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[300px]">
                    <div className="text-sm">
            🌱 Plant, steal, and earn!
                        <br />
            After a long delay, CiFarm is finally here — welcome!
                        <br />
            We&apos;re excited to launch our first season: Eupheria Season.
                        <br />
            Grow exotic fruits like Dragon Fruit, Jackfruit, Rambutan, and
            Pomegranate!
                        <br />
            Get started by purchasing an NFT Box for just 0.5 USDC.
                        <br />
            Harvest your crops and earn massive USDC rewards! 🎁
                    </div>
                    <Spacer y={4} />
                    <Image
                        src="/welcome.png"
                        alt="Welcome Modal"
                        className="rounded-md"
                    />
                </ScrollArea>
                <DialogFooter>
                    <ExtendedButton
                        className="w-full"
                        onClick={() => {
                            //close the current modal
                            close()
                        }}
                    >
            Continue
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
