import { Card, ExtendedButton } from "@/components"
import { IconWrapper } from "@/components/styled/IconWrapper"
import { useGlobalAccountAddress } from "@/hooks"
import { truncateString } from "@/modules/common"
import { MoreHorizontal } from "lucide-react"
import { Eye } from "lucide-react"
import React from "react"

const BalanceCard = () => {
    const { accountAddress } = useGlobalAccountAddress()
    return (
        <Card className="p-6 bg-gradient-to-br from-purple-300 to-blue-400 relative rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-black/30 to-transparent"></div>
            <div className='relative z-20'>
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                        <div className="text-text-secondary">
                            {truncateString(accountAddress || "")}
                        </div>
                        <ExtendedButton variant="icon" size="icon">
                            <Eye className="h-5 w-5" />
                        </ExtendedButton>
                    </div>
                    <IconWrapper>
                        <MoreHorizontal className="h-5 w-5" />
                    </IconWrapper>
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-300 to-blue-400"></div>
                </div>

                <div className="mt-4">
                    <div className="text-3xl font-bold text-gray-900">$0.00</div>
                </div>
            </div>
        </Card>
    )
}

export default BalanceCard