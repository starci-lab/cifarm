import React, { FC } from "react"
import { Spacer } from "../Spacer"

interface ModalHeaderProps {
  title: string;
  description?: string;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ title, description }) => {
    return (
        <div>
            <div className="text-xl font-bold">{title}</div>
            {description && (
                <>
                    <Spacer y={1.5} />  
                    <div className="text-muted-foreground font-normal">
                        {description}
                    </div>
                </>
            )}
        </div>
    )
}
