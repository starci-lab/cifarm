import React, { FC, ReactNode } from "react"
import { Card, CardBody } from "@/components"
import { Spinner } from "../Spinner"

export interface PressableActionProps {
  name: string;
  icon: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const PressableAction: FC<PressableActionProps> = ({ icon, name, isLoading, ...props }: PressableActionProps) => {
    return (
        <Card {...props} pressable disabled={isLoading || props.disabled}>
            <CardBody className="w-full grid place-items-center">
                <div className="grid gap-2 place-items-center text-secondary w-full">
                    {icon}
                    <div className="text-sm text-center flex gap-2 items-center">  
                        {isLoading && <Spinner />}
                        {name}
                    </div> 
                </div> 
            </CardBody>
        </Card>
    )
}