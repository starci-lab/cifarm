import { Card } from "@/components"
import { MoreHorizontal } from "lucide-react"
import { Eye } from "lucide-react"
import React from "react"

const BalanceCard = ({
    address,
    balance = 0,
    imageUrl = ""
}) => {
    return (
        <Card className="p-6 bg-gradient-to-br from-purple-300 to-blue-400 relative rounded-lg overflow-hidden">
            {/* add dark overlay */}
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-black/30 to-transparent"></div>

            <div className='relative z-20'>
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2 text-gray-700 font-mono">
                        <span>{address}</span>
                        <button className="text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                        </button>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-5 w-5" />
                    </button>
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