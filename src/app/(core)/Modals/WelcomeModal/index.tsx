"use client"
import { WELCOME_DISCLOSURE } from "@/app/(core)/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import {
    ExtendedButton,
    Image,
    ModalHeader,
    ScrollArea,
    Spacer,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogBody,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"

export const WelcomeModal: FC = () => {
    const { isOpen, toggle, close } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(WELCOME_DISCLOSURE)

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="First Season Begin!!" />
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <ScrollArea className="h-[300px]">
                        <div>
              🌱 Plant, steal, and earn!
                            <br />
              First season is here!
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
                            src="https://cifarm.sgp1.cdn.digitaloceanspaces.com/bg.png"
                            className="rounded-lg"
                        />
                    </ScrollArea>
                </DialogBody>
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
