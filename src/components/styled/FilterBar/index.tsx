"use client"

import { ExtendedInput } from "@/components"
import React, { FC, useEffect, useState } from "react"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface HandleSearchResultParams {
  searchString: string;
  abortController?: AbortController;
}

export interface FilterBarProps extends React.ComponentPropsWithoutRef<"input"> {
  handleSearchResult: (params: HandleSearchResultParams) => void | Promise<void>;
  timeout?: number;
  disableDebounce?: boolean;
  className?: string;
}

const TIMEOUT = 500

export const FilterBar: FC<FilterBarProps> = ({
    handleSearchResult,
    timeout = TIMEOUT,
    disableDebounce = false,
    className,
    placeholder = "Search",
}: FilterBarProps) => {
    const [searchString, setSearchString] = useState("")
    const [mounted, setMounted] = useState(false)

    // Apply abort controller and debounce the search
    useEffect(() => {
        if (!mounted) {
            setMounted(true)
            return
        }
        if (disableDebounce) {
            handleSearchResult({ searchString })
            return
        }
        const abortController = new AbortController()
        const debounceFn = setTimeout(() => {
            handleSearchResult({ searchString, abortController })
        }, timeout)
        return () => {
            clearTimeout(debounceFn)
            abortController.abort()
        }
    }, [searchString])

    return (
        <ExtendedInput
            startContent={<SearchIcon className="w-5 h-5 text-muted-foreground" />}
            value={searchString}
            onValueChange={(value) => setSearchString(value)}
            placeholder={placeholder}
            className={cn("w-full", className)}
        />
    )
}