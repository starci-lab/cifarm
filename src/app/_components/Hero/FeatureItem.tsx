import React from "react"

export interface FeatureItemProps {
    icon: React.ReactNode
    title: string
    description: string
}

export const FeatureItem = ({ icon, title, description }: FeatureItemProps) => (
    <div className="flex items-center gap-3 flex-1">
        <div className="bg-content-2 p-2 rounded-full">
            {
                icon
            }
        </div>
        <div className="text-left">
            <p className="font-semibold text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
) 