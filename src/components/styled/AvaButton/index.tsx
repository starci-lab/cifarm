import { cn } from "@/utils"
import { FC, ReactNode } from "react"
import { ExtendedButton } from "../ExtendedButton"
import React from "react"
export interface AvaButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  classNames?: {
    base?: string;
    icon?: string;
    text?: string;
  };
  text?: string;
}

export const AvaButton: FC<AvaButtonProps> = ({
    icon,
    onClick,
    classNames,
    text,
}) => {
    return (
        <ExtendedButton className="flex items-center justify-between" color="secondary" onClick={onClick} variant="flat">
            <div className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-all duration-300">
                {icon}
                <div className={cn(classNames?.text)}>{text}</div>
            </div>
        </ExtendedButton>
    )
}
