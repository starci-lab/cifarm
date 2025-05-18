import {
    Image,
    Spacer,
    Spinner,
    Separator,
    Card,
    CardBody,
} from "@/components"
import React, { FC } from "react"

interface DAppCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
  content?: React.ReactNode;
  isLoading?: boolean;
}

export const DAppCard: FC<DAppCardProps> = ({
    title,
    description,
    imageUrl,
    onClick,
    content,
    isLoading,
}) => {
    return (
        <Card
            onClick={onClick}
            disabled={isLoading}
            className="h-full"
            pressable
        >
            <CardBody className="pb-2">
                <Image src={imageUrl} className="w-32 h-32 object-contain" />
                <Spacer y={4} />
                <div className="flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                        {isLoading && <Spinner />}
                        <div className="text-lg">{title}</div>
                    </div>
                </div>
            </CardBody>
            <Separator />
            <CardBody className="pt-2">
                <div className="text-muted-foreground">{description}</div>
                <Spacer y={2} />
                {content}
            </CardBody>
        </Card>
    )
}
