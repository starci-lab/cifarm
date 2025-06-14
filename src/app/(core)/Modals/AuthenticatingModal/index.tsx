"use client"

import { AUTHENTICATING_DISCLOSURE } from "@/app/(core)/constants"
import { Dialog, DialogContent, Spinner } from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { useDisclosure } from "react-use-disclosure"

export const AuthenticatingModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<
    ReturnType<typeof useDisclosure>
    >(AUTHENTICATING_DISCLOSURE)

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px] grid place-items-center w-full">   
                <div className="flex items-center gap-2"> <Spinner className="w-7 h-7"/> <div className="text-lg">Authenticating...</div></div>
            </DialogContent>
        </Dialog>
    )
}
