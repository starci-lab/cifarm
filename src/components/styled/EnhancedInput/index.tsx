import React, { FC } from "react"
import { cn } from "@/lib/utils"

export interface EnhancedInputProps extends React.ComponentProps<"input"> {
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

export const EnhancedInput: FC<EnhancedInputProps> = ({
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
                    "flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    isInvalid && "focus-within:border-destructive border-destructive focus-within:ring-destructive",
                )
            }
            >
                {startContent && (
                    <div className={cn("absolute left-2 flex items-center", startContentClassName)}>
                        {startContent}  </div> 
                )}
                <input
                    value={value}
                    onChange={(event) => onValueChange(event.target.value)}
                    className={
                        cn(      
                            "flex w-full",   
                            "outline-none",
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

                  