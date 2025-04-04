import React, { FC, ReactNode } from "react"
import { PressableCard } from "@/components"

export interface PressableActionProps {
  name: string;
  icon: ReactNode;
  onClick?: () => void;
}

export const PressableAction: FC<PressableActionProps> = ({ icon, name, onClick }: PressableActionProps) => {
    return (
        <PressableCard onClick={onClick} classNames={{ base: "w-full h-full p-3 justify-center" }}>
            <div className="grid gap-2 place-items-center">
                {icon}
                <div className="text-sm text-center">{name}</div> 
            </div>
        </PressableCard>
    )
}