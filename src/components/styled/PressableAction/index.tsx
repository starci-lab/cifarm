import React, { FC, ReactNode } from "react"
import { PressableCard, PressableCardProps } from "@/components"
import { Spinner } from "../Spinner"
export interface PressableActionProps extends PressableCardProps {
  name: string;
  icon: ReactNode;
  isLoading?: boolean;
}

export const PressableAction: FC<PressableActionProps> = ({ icon, name, isLoading, ...props }: PressableActionProps) => {
    return (
        <PressableCard {...props} classNames={{ base: "w-full h-full p-3 justify-center" }} isLoading={false} disabled={isLoading || props.disabled}>
            <div className="grid gap-2 place-items-center text-secondary w-full">
                {icon}
                <div className="text-sm text-center flex gap-2 items-center">  
                    {isLoading && <Spinner />}
                    {name}
                </div> 
            </div>
        </PressableCard>
    )
}