import { cn } from "@/lib/utils"
import React, { FC } from "react"
import { Link as LinkIcon } from "@phosphor-icons/react"
import { PropsWithChildren } from "react"
import { Spinner } from "../Spinner"
import { cva } from "class-variance-authority"

export interface LinkProps extends PropsWithChildren {
  onClick?: () => void;
  href?: string;
  classNames?: Partial<{
    base: string;
  }>;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive"
  showIcon?: boolean;
  target?: string;
  isLoading?: boolean;
}

export const Link: FC<LinkProps> = ({
    children,
    classNames: { base } = {},
    onClick,
    href,
    target,
    isLoading,
    color = "primary",
    showIcon = false,
}) => {
  
    const linkVariants = cva(
        "transition-colors",
        {
            variants: {
                color: {
                    default: "text-foreground hover:text-foreground/75",
                    primary: "text-primary hover:text-primary/75",
                    secondary: "text-secondary hover:text-secondary/75",
                    success: "text-success hover:text-success/75",
                    warning: "text-warning hover:text-warning/75",
                    destructive: "text-destructive hover:text-destructive/75",
                },
            },
            defaultVariants: {
                color: "primary",
            },
        }
    )

    return (
        <a
            href={href}
            onClick={onClick}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className={cn(linkVariants({ color }), base, "w-fit flex items-center gap-2")}
        >
            {isLoading ? <Spinner /> : (
                <>
                    {children}
                    {showIcon && <LinkIcon className="w-4 h-4" />}
                </>
            )}
        </a>
    )
}
