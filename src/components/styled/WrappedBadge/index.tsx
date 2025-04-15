import React from "react"
import { ExtendedBadge } from "@/components"
import { PackageIcon } from "lucide-react"


export const WrappedBadge = () => {
    return (
        <ExtendedBadge>  
            <PackageIcon className="w-4 h-4 min-w-4 min-h-4" />
        </ExtendedBadge>
    )
}

