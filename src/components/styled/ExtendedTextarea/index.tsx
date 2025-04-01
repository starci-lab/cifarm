import React, { FC } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "../../ui"

export interface ExtendedTextareaProps extends React.ComponentProps<"textarea"> {
  value: string;
  onValueChange: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  className?: string;
  startContent?: React.ReactNode; // Custom content for the left of the input
  endContent?: React.ReactNode; // Custom content for the right of the input
  classNames?: {
    base?: string;
    errorMessage?: string;  
    textarea?: string;
  };
}

export const ExtendedTextarea: FC<ExtendedTextareaProps> = ({
    value,
    onValueChange,
    isInvalid,
    placeholder,
    errorMessage,
    classNames = {},
    className,
    ...props
}) => {
    const {
        base: baseClassName,
        errorMessage: errorMessageClassName,
        textarea: textareaClassName,
    } = classNames
    return (
        <div className={cn("space-y-2", baseClassName, className)}>
            <Textarea
                value={value}
                onChange={(event) => onValueChange(event.target.value)}
                className={
                    cn(      
                        "flex w-full",   
                        "outline-none bg-transparent resize-none",
                        isInvalid && "focus-within:border-destructive border-destructive focus-within:ring-destructive focus-visible:ring-destructive",
                        textareaClassName
                    )
                }
                placeholder={placeholder}
                {...props}
            />
            {/* Error Message */}
            {isInvalid && errorMessage && (
                <div className={cn("text-xs text-destructive mt-1", errorMessageClassName)}>{errorMessage}</div>
            )}
        </div>
    )
}

                  