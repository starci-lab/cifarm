import { cn } from "@/lib/utils"
import React, {
    FC,
    isValidElement,
    PropsWithChildren,
    ReactElement,
} from "react"

export interface IconWrapperProps extends PropsWithChildren {
  classNames?: Partial<{
    base: string;
  }>;
}

export const IconWrapper: FC<IconWrapperProps> = ({
    children,
    classNames: {
        base = "text-muted-foreground",
    } = {},
    ...props
}) => {
    return (
        <div
            className={cn(base, "cursor-pointer transition-colors grid place-items-center")}
            {...props}
        >
            {isValidElement(children)
                ? React.cloneElement(children as ReactElement, {
                    className: cn(
                        children.props.className,
                        "hover:opacity-50",
                        "active:opacity-75"
                    ),
                })
                : children}
        </div>
    )
}
