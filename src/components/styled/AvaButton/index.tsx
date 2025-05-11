import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"
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
    chevron?: string;
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
        <ExtendedButton className="flex items-center justify-between" variant="secondary" onClick={onClick}>
            <div className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-all duration-300">
                {icon}
                <div className={cn("text-sm", classNames?.text)}>{text}</div>
                <ChevronDownIcon className={cn("w-3.5 h-3.5", classNames?.chevron)} />
            </div>
        </ExtendedButton>
    )
}
