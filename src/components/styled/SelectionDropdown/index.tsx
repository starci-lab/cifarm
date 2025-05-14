import React from "react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../../ui"
import { cn } from "@/lib/utils"
import { ExtendedButton } from "../ExtendedButton"

export interface SelectionDropdownOption {
  key: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}

export interface SelectionDropdownProps {
  selectedKey: string;
  onSelectKeyChange: (key: string) => void;
  options: Array<SelectionDropdownOption>;
  classNames?: {
    trigger?: string;
  }
}

export const SelectionDropdown = ({
    selectedKey,
    onSelectKeyChange,
    options,
    classNames = {},
}: SelectionDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ExtendedButton className={cn(classNames?.trigger)} color="secondary">
                    <div>
                        <div className="flex items-center gap-2">
                            {options.find((option) => option.key === selectedKey)?.icon}
                            {options.find((option) => option.key === selectedKey)?.label}                  
                        </div>
                    </div>
                </ExtendedButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options.map((option) => (
                    <DropdownMenuItem key={option.key} onClick={() => onSelectKeyChange(option.key)}>
                        <div>
                            <div className={cn("flex items-center gap-2 w-fit")}>
                                {option.icon}
                                {option.label}
                            </div>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
