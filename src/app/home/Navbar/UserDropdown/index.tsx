import { useAppSelector } from "@/redux"
import { Image } from "@/components"
import { ChevronDownIcon } from "lucide-react"
import React, { FC } from "react"
    
export const UserDropdown: FC = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)
    return (
        <button className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-card p-1 pr-2 hover:bg-card/50 transition-all duration-300">
                <Image src={user?.avatarUrl || ""} alt="Logo" className="rounded-full w-8 h-8"/>
                <div className="text-sm">
                    {user?.username}
                </div>
                <ChevronDownIcon className="w-3.5 h-3.5" />
            </div>
        </button>
    )
}
