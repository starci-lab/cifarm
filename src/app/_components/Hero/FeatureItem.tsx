import { LucideIcon } from "lucide-react"
import React from "react"

interface FeatureItemProps {
    icon: LucideIcon
    title: string
    description: string
}

export const FeatureItem = ({ icon: Icon, title, description }: FeatureItemProps) => (
    <div className="flex items-center gap-3">
        <div className="bg-primary-2/10 p-2 rounded-full">
            <Icon className="h-5 w-5 text-primary-2" />
        </div>
        <div className="text-left">
            <p className="font-medium">{title}</p>
            <p className="text-sm">{description}</p>
        </div>
    </div>
) 