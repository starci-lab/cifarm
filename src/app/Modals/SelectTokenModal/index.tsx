import { valuesWithKey } from "@/modules/common"
import { useAppSelector } from "@/redux"
import React, { useMemo, useState } from "react"
import { Token } from "./Token"
import { ScrollableList } from "@/components/ScrollableList"
import { FilterBar } from "@/components"
import { SELECT_TOKEN_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { useDisclosure } from "@/hooks"

export const SelectTokenModal = () => {
    const { isOpen, onOpenChange, onClose } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SELECT_TOKEN_DISCLOSURE)
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const tokensArray = valuesWithKey(tokens).filter((token) => token.enabled)
    const [searchString, setSearchString] = useState("")

    const filteredTokensArray = useMemo(() => {
        return tokensArray.filter((token) =>
            token.name.toLowerCase().includes(searchString.toLowerCase())
        )
    }, [searchString])
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Select Token</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <FilterBar
                        handleSearchResult={({ searchString }) => {
                            setSearchString(searchString)
                        }}
                        disableDebounce={true}
                    />
                    <ScrollableList
                        items={filteredTokensArray}
                        contentCallback={(token) => <Token token={token} />}
                    />
                </div>
                <DialogFooter>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="text-muted-foreground"
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
