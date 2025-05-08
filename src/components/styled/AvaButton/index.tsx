import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"
import React, { FC, ReactNode } from "react"

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
        <button className="flex items-center justify-between" onClick={onClick}>
            <div className="flex items-center gap-2 rounded-lg bg-content1 p-1 pr-2 hover:bg-content1/75 transition-all duration-300">
                {icon}
                <div className={cn("text-sm", classNames?.text)}>{text}</div>
                <ChevronDownIcon className={cn("w-3.5 h-3.5", classNames?.chevron)} />
            </div>
        </button>
    )
}
