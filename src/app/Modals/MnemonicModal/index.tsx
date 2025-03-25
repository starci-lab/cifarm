"use client"
import { MNEMONIC_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import React, { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDisclosure } from "@/hooks"
import { cn } from "@/lib/utils"
import { CopyIcon } from "lucide-react"

export const MnemonicModal: FC = () => {
    const { isOpen, onOpenChange } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(MNEMONIC_DISCLOSURE)
    const [isBlurred, setIsBlurred] = useState(true)
    const mnemonic = useAppSelector(
        (state) => state.sessionReducer.mnemonic
    )
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Mnemonic</DialogTitle>
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
                    <Button
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
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(mnemonic)}
                        className="gap-2"
                    >
                        <CopyIcon className="w-5 h-5" strokeWidth={3 / 2} />
                        Copy
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
