import React from "react"

export interface HeaderProps {
  title: string
}

export const Header = ({ title }: HeaderProps) => {
    return (
        <div className="text-4xl font-bold">{title}</div>
    )
}