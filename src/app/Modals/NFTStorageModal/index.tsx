import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    ExtendedButton,
    FilterBar,
    List,
    Pagination,
    Spacer,
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import {
    GRAPHQL_QUERY_STORED_PLACED_ITEMS_SWR,
    NFT_STORAGE_DISCLOSURE,
} from "@/app/constants"
import {
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    useGraphQLQueryStoredPlacedItemsSwr,
} from "@/hooks"
import { NFTCard } from "./NFTCard"
import { ArrowCounterClockwise } from "@phosphor-icons/react"
export const NFTStorageModal: FC = () => {
    const { toggle, isOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        NFT_STORAGE_DISCLOSURE
    )
    const {
        swr: { data, mutate },
        params,
        setParams,
    } = useSingletonHook<ReturnType<typeof useGraphQLQueryStoredPlacedItemsSwr>>(
        GRAPHQL_QUERY_STORED_PLACED_ITEMS_SWR
    )

    const storedPlacedItems = data?.data.storedPlacedItems.data || []
    const count = data?.data.storedPlacedItems.count || 0
    // compute the total number of pages
    const limit = params?.request?.limit ?? DEFAULT_LIMIT
    const offset = params?.request?.offset ?? DEFAULT_OFFSET
    const totalPage = Math.max(Math.ceil(count / limit), 1)
    const currentPage = Math.ceil(offset / limit) + 1
    const setPage = (page: number) => {
        if (!setParams) throw new Error("setParams is not defined")
        setParams({
            ...params,
            request: {
                ...params?.request,
                offset: (page - 1) * limit,
            },
        })
    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={toggle}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        NFT Storage
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <div className="flex gap-2">
                        <FilterBar
                            handleSearchResult={() => {
                            }}
                        />
                        <ExtendedButton
                            variant="outline"
                            size="icon"
                            onClick={() => mutate()}
                            className="shrink-0"
                        >
                            <ArrowCounterClockwise className="h-4 w-4" />
                        </ExtendedButton>
                    </div>  
                    <Spacer y={4}/>
                    <List
                        items={storedPlacedItems}
                        contentCallback={(item) => {
                            return (
                                <NFTCard
                                    key={item.id}
                                    placedItem={item}
                                />
                            )
                        }}
                    />
                    <Spacer y={4}/>
                    <div className="flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPage}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
