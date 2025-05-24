import { valuesWithKey } from "@/modules/common"
import React, { useState } from "react"
import { FilterBar, Spacer, ExtendedButton, ModalHeader } from "@/components"
import { SELECT_NFT_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"
import { NFTCollection } from "./NFTCollection"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"

export const SelectNFTModal = () => {
    const { isOpen, toggle } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SELECT_NFT_DISCLOSURE)
    const [searchString, setSearchString] = useState("")

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    const collections = valuesWithKey(staticSwr.data?.data.nftCollections || {})
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Select NFT" description="Select a NFT to transfer." />
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <FilterBar
                        searchString={searchString}
                        onSearchStringChange={setSearchString}
                    />
                    <Spacer y={4} />
                    <div className="grid gap-4">
                        {
                            collections.map((collection) => {
                                return <NFTCollection key={collection.key} collectionKey={collection.key} />
                            })
                        }
                    </div>
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
