"use client"
import { MINT_AMOUNT_DISCLOSURE, MINT_OFFCHAIN_TOKENS_RHF } from "@/app/constants"
import { useMintOffchainTokensRhf } from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDisclosure } from "@/hooks"

export const MintAmountModal: FC = () => {
    const { isOpen, onOpenChange } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(MINT_AMOUNT_DISCLOSURE)
    const {
        form: {
            handleSubmit,
            control,
            formState: { isValid, isSubmitting },
        }, onSubmit
    } = useSingletonHook2<ReturnType<typeof useMintOffchainTokensRhf>>(MINT_OFFCHAIN_TOKENS_RHF)
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Mint Amount</DialogTitle>
                    <DialogDescription>
                        Enter the amount of tokens you want to mint. This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Controller
                        control={control}
                        name="amount"
                        render={({ field, fieldState: { error } }) => (
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="Enter amount"
                                    {...field}
                                    className={error?.message ? "border-destructive" : ""}
                                />
                                {error?.message && (
                                    <p className="text-sm text-destructive">{error.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>
                <DialogFooter>
                    <Button
                        onClick={async () => {
                            await handleSubmit(onSubmit)()
                        }}
                        disabled={!isValid || isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? "Minting..." : "Mint"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
