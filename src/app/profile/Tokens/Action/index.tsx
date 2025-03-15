import React, { FC, ReactNode } from "react"
import { Card, CardBody } from "@heroui/react"

export interface ActionProps {
  name: string;
  icon: ReactNode;
  onPress?: () => void;
}

export const Action: FC<ActionProps> = ({ icon, name, onPress }: ActionProps) => {
    return (
        <Card isPressable onPress={onPress}>
            <CardBody>
                <div className="grid gap-2 place-items-center">
                    {icon}
                    <div className="text-sm text-center">{name}</div>
                </div>
            </CardBody>
        </Card>
    )
}