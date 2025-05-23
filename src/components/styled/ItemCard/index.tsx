import { Card, CardContent, ScaledImage, TooltipTrigger, Tooltip, TooltipContent } from "@/components"
import { cn } from "@/lib/utils"
import { assetIconMap, AssetIconId } from "@/modules/assets"
import React, { FC } from "react"

export enum TintColor {
    Default = "default",
    Green = "green",
}

interface ItemCardProps {
  quantity?: number;
  stackable?: boolean;
  imageUrl?: string;
  frameOnly?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  tint?: boolean;
  tintColor?: TintColor;
  hideCardContentBg?: boolean;
  classNames?: {
    card?: string
    cardContent?: string
  }
  name?: string;
  description?: string;
  showTooltip?: boolean;
  isQuality?: boolean;
}

export const ItemCard: FC<ItemCardProps> = ({
    name,
    description,
    showTooltip = false,
    ...props
}) => {
    return (<>
        {showTooltip && !props.frameOnly ? (
            <>
                <Tooltip>
                    <TooltipTrigger>
                        <ItemCardCore {...props} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <div>
                            <div className="text-sm">{name}</div>
                            <div className="text-xs text-muted-foreground">{description}</div>
                        </div>
                    </TooltipContent>    
                </Tooltip>
                
            </>
        ) : (
            <ItemCardCore {...props} />
        )}
    </>)
}

const ItemCardCore: FC<ItemCardProps> = ({
    quantity,
    stackable,
    imageUrl,
    frameOnly,
    isSelected,
    onClick,
    tint,
    tintColor,
    isQuality,
    hideCardContentBg = false,
    classNames = {},
}) => {
    const tintMap: Record<TintColor, string> = {
        [TintColor.Default]: "grayscale(100%)",
        [TintColor.Green]: "grayscale(100%)",
    }
    return (
        <Card
            className={cn(
                "w-fit h-fit p-0 min-w-fit min-h-fit",
                classNames.card
            )}
            onClick={onClick}
        >
            <CardContent
                className={cn(
                    "grid place-items-center p-0 w-14 h-14 relative rounded-lg",
                    classNames.cardContent,
                    {
                        "bg-content-6": !hideCardContentBg,
                        "bg-secondary transition-transform transform scale-110 duration-300 ease-in-out shadow-lg": !frameOnly && isSelected,
                    }
                )}
            >
                {!frameOnly &&
          (() => {
              return (
                  <div className="relative w-14 h-14">
                      {isQuality && (
                          <ScaledImage
                              src={assetIconMap[AssetIconId.QualityStar].base.assetUrl}
                              className="absolute top-0 left-0 z-20"
                              style={{
                                  filter: tint ? tintMap[tintColor ?? TintColor.Default] : "grayscale(0%)",
                              }}
                          />
                      )}
                      {stackable && (
                          <div className="absolute bottom-0 right-0 bg-background/75 text-xs grid place-items-center rounded-md p-0.5">
                              {quantity}
                          </div>
                      )}
                      <ScaledImage
                          src={imageUrl ?? ""}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                              filter: tint ? tintMap[tintColor ?? TintColor.Default] : "grayscale(0%)",
                          }}
                      />
                      {stackable && (
                          <div className="absolute bottom-0 right-0 bg-background/75 text-xs grid place-items-center rounded-md p-0.5">
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
