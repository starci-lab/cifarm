import React, { FC } from "react"
import { Spinner } from "../Spinner"
interface DropdownContentProps {
    children: React.ReactNode
    icon?: React.ReactNode
    isLoading?: boolean
    onClick?: () => void
}

export const DropdownContent: FC<DropdownContentProps> = ({ children, icon, isLoading, onClick }) => {
    return (
        <div className="flex gap-2 items-center" onClick={onClick}>
            {isLoading ? <Spinner /> : icon}
            {children}
        </div>
    )
}
