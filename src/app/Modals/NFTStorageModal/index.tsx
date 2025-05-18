import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    ExtendedButton,
    FilterBar,
    Pagination,
    Spacer,
    DialogBody,
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
import { ArrowsCounterClockwise } from "@phosphor-icons/react"

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
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        NFT Storage
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div className="flex gap-2">
                        <FilterBar
                            searchString={""}
                            onSearchStringChange={() => {}}
                        />
                        <ExtendedButton
                            variant="flat"
                            size="icon"
                            color="secondary"
                            onClick={() => mutate()}
                            className="shrink-0"
                        >
                            <ArrowsCounterClockwise />
                        </ExtendedButton>
                    </div>  
                    <Spacer y={4}/>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {
                            storedPlacedItems.map((item) => (
                                <NFTCard
                                    key={item.id}
                                    placedItem={item}
                                />
                            ))
                        }
                    </div>
                    <Spacer y={4}/>
                    <div className="flex justify-center">
                        <Pagination
                            color="secondary"
                            currentPage={currentPage}
                            totalPages={totalPage}
                            onPageChange={setPage}
                        />
                    </div>
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
