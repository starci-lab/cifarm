import { FunnelIcon } from "@heroicons/react/24/outline"
import { Button, EnhancedInput } from "@/components"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import React, { FC, useEffect, useState } from "react"

export interface HandleSearchResultParams {
  searchString: string;
  abortController?: AbortController;
}

export interface FilterBarProps extends React.ComponentPropsWithoutRef<"input"> {
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
        <div className="flex gap-2 w-full">
            <EnhancedInput
                value={searchString}
                onValueChange={(value) => setSearchString(value)}
                placeholder="Search"
                className="w-full"
            />
            {useAdvancedSearch && (
                <Tooltip>
                    <TooltipTrigger>
                        <Button variant="outline" onClick={() => {}} className="flex items-center gap-2">
                            <FunnelIcon className="w-5 h-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Advanced Search
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    )
}