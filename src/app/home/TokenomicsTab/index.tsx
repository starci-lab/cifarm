import { distributionData, PieChart } from "./PieChart"
import React, { FC } from "react"

export const TokenomicsTab: FC = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center p-4">
            <PieChart />
            <div className="w-full lg:w-[500px]">
                <h3 className="text-xl font-semibold mb-4">Token Distribution</h3>
                <div className="space-y-3">
                    {distributionData.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg transition-colors">
                            <div 
                                className="w-4 h-4 rounded-full flex-shrink-0" 
                                style={{ backgroundColor: item.fill }}
                            />
                            <div className="flex-1 min-w-[120px]">{item.section}</div>
                            <div className="font-medium w-[60px] text-right">{item.percentage}%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 flex-1 ml-4">{item.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>  
    )
}


