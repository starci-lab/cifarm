import { Card, CardContent, ScaledImage } from "@/components"
import { cn } from "@/lib/utils"
import React, { FC } from "react"
interface ItemCardProps {
  quantity?: number;
  stackable?: boolean;
  imageUrl?: string;
  frameOnly?: boolean;
  onClick?: () => void;
  faded?: boolean;
  hideCardContentBg?: boolean;
  classNames?: {
    card?: string
    cardContent?: string
  }
}

export const ItemCard: FC<ItemCardProps> = ({
    quantity,
    stackable,
    imageUrl,
    frameOnly,
    onClick,
    faded,
    hideCardContentBg = false,
    classNames = {}
}) => {
    return (
        <Card
            className={cn(
                "w-fit h-fit p-0 min-w-fit min-h-fit border-none shadow-none cursor-pointer bg-transparent",
                classNames.card
            )}
            onClick={onClick}
        >
            <CardContent
                className={cn(
                    "grid place-items-center p-0 w-14 h-14 relative rounded-md",
                    classNames.cardContent,
                    {
                        "bg-foreground/10": !hideCardContentBg,
                    }
                )}
            >
                {!frameOnly &&
          (() => {
              return (
                  <div className="absolute w-12 h-12">
                      <ScaledImage
                          src={imageUrl ?? ""}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                              filter: faded ? "grayscale(100%)" : "grayscale(0%)",
                          }}
                      />
                      {stackable && (
                          <div className="absolute bottom-0 right-0 bg-background/50 text-xs grid place-items-center rounded-md p-0.5">
                              {quantity}
                          </div>
                      )}
                  </div>
              )
          })()}
            </CardContent>
        </Card>
    )
}
