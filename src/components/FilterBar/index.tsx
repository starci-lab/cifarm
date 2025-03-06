import { FunnelIcon } from "@heroicons/react/24/outline"
import { Input, Link } from "@heroui/react"
import React, { FC, useEffect, useState } from "react"

export interface FetchMethodParams {
  searchString: string;
  abortController: AbortController;
}

export interface FilterBarProps {
  fetchMethod: (params: FetchMethodParams) => void | Promise<void>;
}
const TIMEOUT = 500

export const FilterBar: FC<FilterBarProps> = ({
    fetchMethod,
}: FilterBarProps) => {
    const [searchString, setSearchString] = useState("")
    const [mounted, setMounted] = useState(false)
    // apply abort controller and debounce the search
    useEffect(() => {
        if (!mounted) {
            setMounted(true)
            return
        }
        const abortController = new AbortController()
        const debounceFn = setTimeout(() => {
            fetchMethod({ searchString, abortController })
        }, TIMEOUT)
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
                endContent={
                    <Link color="primary" onPress={() => {}} as="button">
                        <FunnelIcon className="w-5 h-5" />
                    </Link>
                }
            />
        </div>
    )
}
