import React, { FC, ReactNode } from "react"
import { PressableCard } from "@/components"

export interface ActionProps {
  name: string;
  icon: ReactNode;
  onClick?: () => void;
}

export const Action: FC<ActionProps> = ({ icon, name, onClick }: ActionProps) => {
    return (
        <PressableCard onClick={onClick} classNames={{ base: "w-full h-full p-3 justify-center" }}>
            <div className="grid gap-2 place-items-center">
                {icon}
                <div className="text-sm text-center">{name}</div> 
            </div>
        </PressableCard>
    )
}