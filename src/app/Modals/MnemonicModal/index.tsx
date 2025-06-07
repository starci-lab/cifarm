"use client"
import { MNEMONIC_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import React, { FC, useState } from "react"
import { ExtendedButton, ModalHeader } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDisclosure } from "react-use-disclosure"
import { cn } from "@/lib/utils"
import { Copy } from "@phosphor-icons/react"

export const MnemonicModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(MNEMONIC_DISCLOSURE)
    const [isBlurred, setIsBlurred] = useState(true)
    const mnemonic = useAppSelector(
        (state) => state.sessionReducer.mnemonic
    )
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Mnemonic" description="Your mnemonic is used to recover your account. It is stored on your device and cannot be recovered if lost." />
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Card>
                        <CardContent className="relative p-0">
                            {
                                isBlurred && (
                                    <div className="absolute z-50 w-full h-full -top-1.5 -left-1.5 grid place-items-center">
                                        <EyeSlashIcon className="w-10 h-10 text-muted-foreground" />
                                    </div>
                                )
                            }
                            <div className={cn(isBlurred ? "blur" : "", "grid grid-cols-3 gap-2 p-3")}>
                                {mnemonic.split(" ").map((word, index) => (
                                    <div key={index} className="col-span-1">
                                        <Badge variant="secondary" className="w-full justify-center">
                                            {`${index+1}.${word}`}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>  
                </div>
                <DialogFooter className="gap-2">
                    <ExtendedButton
                        variant="outline"
                        onClick={() => setIsBlurred(!isBlurred)}
                        className="gap-2"
                    >
                        {isBlurred ? (
                            <EyeIcon className="w-5 h-5" />
                        ) : (
                            <EyeSlashIcon className="w-5 h-5" />
                        )}
                        {isBlurred ? "Show" : "Hide"}
                    </ExtendedButton>
                    <ExtendedButton
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(mnemonic)}
                        className="gap-2"
                    >
                        <Copy className="w-5 h-5" />
                        Copy
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
