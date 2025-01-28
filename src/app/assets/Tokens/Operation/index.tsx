import React, { FC, ReactNode } from "react"
import { Card, CardBody } from "@heroui/react"

export interface OperationProps {
  name: string;
  icon: ReactNode;
  onPress?: () => void;
}

const Page: FC<OperationProps> = ({ icon, name, onPress }: OperationProps) => {
    return (
        <Card isPressable onPress={onPress}>
            <CardBody>
                <div className="grid gap-2 place-items-center">
                    {icon}
                    <div className="text-sm">{name}</div>
                </div>
            </CardBody>
        </Card>
    )
}

export default Page
