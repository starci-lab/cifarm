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
        base = "",
    } = {},
    ...props
}) => {
    return (
        <button
            className={cn(base, "transition-colors grid place-items-center")}
            {...props}
        >
            {isValidElement(children)
                ? React.cloneElement(children as ReactElement, {
                    className: cn(
                        children.props.className,
                        "hover:opacity-75",
                    ),
                })
                : children}
        </button>
    )
}
