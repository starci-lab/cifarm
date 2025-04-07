import React from "react"
import { ExtendedBadge } from "@/components"
import { PackageIcon } from "lucide-react"


export const WrappedBadge = () => {
    return (<ExtendedBadge> 
        <div className="flex items-center gap-2">   
            <PackageIcon className="w-4 h-4 min-w-4 min-h-4" />
            <div className="text-xs">Wrapped</div>
        </div>
    </ExtendedBadge>)
}

