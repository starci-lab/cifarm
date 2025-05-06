import { ChevronDownIcon } from "lucide-react"
import React, { FC } from "react"
import { ImageGroup } from "@/components"

export const ConnectButton: FC = () => {
    return (
        <button className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-card p-1 pr-2 hover:bg-card/50 transition-all duration-300">
                <ImageGroup
                    images={[
                        "https://docs.somnia.network/~gitbook/image?url=https%3A%2F%2F1813806305-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Forganizations%252FXixzx30CXHthiaKhEu1D%252Fsites%252Fsite_m7x2t%252Ficon%252FjdslfIGTxvTkjBH77O7V%252Flogo.png%3Falt%3Dmedia%26token%3Dfbc7ca1b-24b9-4847-ad0c-574ac536eff3&width=32&dpr=4&quality=100&sign=4c1bc3e1&sv=2",
                        "/sui.svg",
                        "/solana.svg",
                    ]}
                />
                <div className="text-sm">Connect</div>
                <ChevronDownIcon className="w-3.5 h-3.5" />
            </div>
        </button>
    )
}
