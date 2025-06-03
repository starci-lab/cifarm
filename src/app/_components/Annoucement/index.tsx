"use client"
import React from "react"

export const Announcement = () => {
    return (
        <div className="flex items-center justify-center my-20 mt-32">
            <div className="text-center space-y-6 p-8">
                {/* Title with shimmer effect on hover */}
                <div className="group cursor-pointer">
                    <div className="flex items-center justify-center text-8xl md:text-9xl font-bold">
                        <span className="text-primary transition-all motion-reduce:hover:transition-none [mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%] animate-shimmer duration-[4000ms]">
              10.000 USDC
                        </span>
                    </div>
                </div>

                {/* Subtitle with the same shimmer effect */}
                <h2 className="text-4xl md:text-5xl font-serif text-primary-2 transition-all hover:duration-1000 motion-reduce:hover:transition-none [mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%] hover:[mask-position:100%] cursor-pointer">
                TREASUARY
                </h2>

                {/* Details text */}
                <p className="text-text-default text-lg">(more details soon)</p>
            </div>
        </div>
    )
}
