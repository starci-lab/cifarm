import { valuesWithKey } from "@/modules/common"
import React, { useMemo, useState } from "react"
import { Token } from "./Token"
import { List, FilterBar, Spacer, ExtendedButton, ModalHeader } from "@/components"
import { SELECT_TOKEN_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { envConfig } from "@/env"
import { useAppSelector } from "@/redux"
export const SelectTokenModal = () => {
    const { isOpen, toggle } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SELECT_TOKEN_DISCLOSURE)
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    const tokens = valuesWithKey(staticSwr.data?.data.tokens || {})
    const [searchString, setSearchString] = useState("")
    const network = envConfig().network
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const filteredTokensArray = useMemo(() => {
        return tokens.filter((token) =>
            token[chainKey]?.[network]?.name.toLowerCase().includes(searchString.toLowerCase())
        )
    }, [searchString])
    
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Select Token" description="Select a token to transfer." />
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <FilterBar
                        handleSearchResult={({ searchString }) => {
                            setSearchString(searchString)
                        }}
                    />
                    <Spacer y={4} />
                    <List
                        items={filteredTokensArray}
                        contentCallback={(token) => <Token token={token} />}
                    />
                </div>
                <DialogFooter>
                    <ExtendedButton
                        variant="ghost"
                        onClick={() => toggle(false)}
                        className="text-muted-foreground"
                    >
                        Cancel
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
