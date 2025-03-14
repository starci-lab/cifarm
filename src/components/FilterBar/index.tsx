import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Input, InputProps, Link } from "@heroui/react"
import React, { FC, useEffect, useState } from "react"

export interface HandleSearchResultParams {
  searchString: string;
  abortController?: AbortController;
}

export interface FilterBarProps extends InputProps {
    handleSearchResult: (params: HandleSearchResultParams) => void | Promise<void>;
    useAdvancedSearch?: boolean;
    timeout?: number;
    disableDebounce?: boolean;
}

const TIMEOUT = 500

export const FilterBar: FC<FilterBarProps> = ({
    handleSearchResult,
    useAdvancedSearch = false,
    timeout = TIMEOUT,
    disableDebounce = false,
}: FilterBarProps) => {
    const [searchString, setSearchString] = useState("")
    const [mounted, setMounted] = useState(false)
    // apply abort controller and debounce the search
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
        <div className="flex gap-2 w-full">
            <Input
                onValueChange={(value) => setSearchString(value)}
                value={searchString}
                placeholder="Search"
                startContent={
                    <MagnifyingGlassIcon className="w-5 h-5 text-foreground-400" />
                }
                endContent={
                    useAdvancedSearch && (
                        <Link color="primary" onPress={() => {}} as="button">
                            <FunnelIcon className="w-5 h-5" />
                        </Link>
                    )
                }
            />
        </div>
    )
}
