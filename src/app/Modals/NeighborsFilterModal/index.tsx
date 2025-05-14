"use client"
import { NEIGHBORS_FILTER_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import React, { FC } from "react"
import { Dialog, DialogContent, DialogFooter, ExtendedButton, FilterBar } from "@/components"
import { AdvancedSearchContent } from "./AdvancedSearchContent"
import { useAppDispatch, useAppSelector, SelectedSearch, setUseAdvancedNeighborsSearch } from "@/redux"
import { ArrowCounterClockwise, Funnel } from "@phosphor-icons/react"

export const NeighborsFilterModal: FC = () => {
    const { toggle, isOpen } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_FILTER_DISCLOSURE)

    const selectedSearch = useAppSelector((state) => state.searchReducer.selectedSearch)
    const neighborsSearch = useAppSelector((state) => state.searchReducer.neighborsSearch)
    const followeesSearch = useAppSelector((state) => state.searchReducer.followeesSearch)
    const useAdvancedSearch = selectedSearch === SelectedSearch.Neighbors ? neighborsSearch.useAdvancedSearch : followeesSearch.useAdvancedSearch
    const dispatch = useAppDispatch()
    
    return (
        <Dialog 
            open={isOpen} 
            onOpenChange={toggle}
        >
            <DialogContent className="sm:max-w-[425px]">
                <div>
                    <div className="flex items-center gap-2">
                        <FilterBar className="bg-transparent flex-1" classNames={{
                            input: "focus-within:ring-0",
                        }} handleSearchResult={() => {
                        }} />
                        <div className="flex items-center gap-2">
                            <ExtendedButton
                                variant="icon"
                                onClick={() => dispatch(setUseAdvancedNeighborsSearch(!useAdvancedSearch))}
                                size="icon"
                                className="shrink-0"
                            >
                                <Funnel className="h-6 w-6" />
                            </ExtendedButton>
                            <ExtendedButton
                                variant="icon"
                                size="icon"
                                className="shrink-0"
                            >
                                <ArrowCounterClockwise className="h-6 w-6" />
                            </ExtendedButton>
                        </div>
                    </div>
                    {!useAdvancedSearch && <AdvancedSearchContent />}
                    <DialogFooter>
                        <ExtendedButton variant="default" className="w-full">Search</ExtendedButton>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}