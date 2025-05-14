"use client"

import { ExtendedButton, ExtendedInput } from "@/components"
import React, { FC, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { MagnifyingGlass } from "@phosphor-icons/react"

export interface HandleSearchResultParams {
  searchString: string;
  abortController?: AbortController;
}

export interface FilterBarProps {
  handleSearchResult?: (
    params: HandleSearchResultParams
  ) => void | Promise<void>;
  timeout?: number;
  disableDebounce?: boolean;
  asButton?: boolean;
  placeholder?: string;
  className?: string;
  onClick?: () => void;
  classNames?: {
    base?: string;
    input?: string;
  }
}

const TIMEOUT = 500

export const FilterBar: FC<FilterBarProps> = (props) => {
    return props.asButton ? (
        <ButtonFilterBar {...props} />
    ) : (
        <SearchFilterBar {...props} />
    )
}

const ButtonFilterBar: FC<FilterBarProps> = ({
    placeholder = "Search",
    onClick,
}) => {
    return (
        <ExtendedButton
            removeClassName
            onClick={onClick}
            classNames={{
                base: "gap-2 bg-content-2 flex items-center h-10 w-full rounded-lg px-3 text-base transition-colotext-smrs file:border-0 file:bg-transparent file: file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                container: "justify-start",
            }}
        >
            <MagnifyingGlass className="w-6 h-6 text-muted-foreground" />
            <div className="text-muted-foreground">{placeholder}</div>
        </ExtendedButton>
    )
}

const SearchFilterBar: FC<FilterBarProps> = ({
    handleSearchResult,
    timeout = TIMEOUT,
    disableDebounce = false,
    className,
    placeholder = "Search",
    classNames = {
        input: "",
        base: "",
    }
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
            handleSearchResult?.({ searchString })
            return
        }
        const abortController = new AbortController()
        const debounceFn = setTimeout(() => {
            handleSearchResult?.({ searchString, abortController })
        }, timeout)
        return () => {
            clearTimeout(debounceFn)
            abortController.abort()
        }
    }, [searchString])

    return (
        <ExtendedInput
            startContent={<MagnifyingGlass className="w-5 h-5 text-muted-foreground" />}
            value={searchString}
            classNames={{
                base: classNames.base,
                input: classNames.input,
            }}
            onValueChange={(value) => setSearchString(value)}
            placeholder={placeholder}
            className={cn("w-full", className)}
        />
    )
}
