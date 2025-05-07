import React, { FC } from "react"
import { cn } from "@/lib/utils"

export interface ExtendedInputProps extends React.ComponentProps<"input"> {
  value: string;
  onValueChange: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  className?: string;
  startContent?: React.ReactNode; // Custom content for the left of the input
  endContent?: React.ReactNode; // Custom content for the right of the input
  classNames?: {
    input?: string;
    errorMessage?: string;
    startContent?: string;
    endContent?: string;
    base?: string;
  };
}

export const ExtendedInput: FC<ExtendedInputProps> = ({
    value,
    onValueChange,
    isInvalid,
    errorMessage,
    startContent,
    endContent,
    placeholder,
    classNames = {},
    className,
    ...props
}) => {
    const {
        base: baseClassName,
        input: inputClassName,
        errorMessage: errorMessageClassName,
        startContent: startContentClassName,
        endContent: endContentClassName, 
    } = classNames
    return (
        <div className={cn("space-y-2", baseClassName, className)}>
            <div className={
                cn(
                    "gap-2 bg-content1",
                    "flex items-center h-10 w-full rounded-lg px-3 py-1 text-base transition-colotext-smrs file:border-0 file:bg-transparent file: file:font-medium file:text-foreground placeholder:text-muted-foreground focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    isInvalid && "focus-within:border-destructive border-destructive focus-within:ring-destructive",
                    inputClassName
                )
            }
            >
                {startContent && (
                    <div className={cn(startContentClassName)}>
                        {startContent}  </div> 
                )}
                <input
                    value={value}
                    onChange={(event) => onValueChange(event.target.value)}
                    className={
                        cn(      
                            "flex w-full",   
                            "outline-none bg-transparent",
                            inputClassName
                        )
                    }
                    placeholder={placeholder}
                    {...props}
                />
                {endContent && (
                    <div className={cn(endContentClassName)}>{endContent}</div>
                )}
            </div>

            {/* Error Message */}
            {isInvalid && errorMessage && (
                <div className={cn("text-xs text-destructive mt-1", errorMessageClassName)}>{errorMessage}</div>
            )}
        </div>
    )
}

                  