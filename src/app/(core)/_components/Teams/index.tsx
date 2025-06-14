import { Card, CardContent, Image, Spacer, Separator, WrappedAnimation } from "@/components"
import React from "react"

const individuals = [
    {
        name: "Stacy Nguyen",
        x: "https://x.com/mrstacynguyen",
        imageUrl: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy.jpg?id=1",
        description: "CiFarm Technical Founder. Has a deep understanding of blockchain and Web3.",
    },
    {
        name: "Uy Le",
        x: "https://x.com/uy_le",
        imageUrl: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/uyle.jpg",
        description: "CiFarm Technical Co-founder. Enthusiastic about Web3 and HTML5 game development.",
    },
    {
        name: "Kyle Dong",
        x: "https://x.com/kylei_dev",
        imageUrl: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/kyle.jpg",
        description: "CiFarm Non-technical Founder. Experienced in business and marketing.",
    },
    {
        name: "Trang Dai",
        x: "https://x.com/trang_dai",
        imageUrl: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/trangdai.jpg",
        description: "CiFarm Lead Game Artist. Experienced in game design and art.",
    }
]

export const Teams = () => (
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {individuals.map((individual, index) => (
                <WrappedAnimation 
                    key={individual.name}
                    type="fade-slide" 
                    direction="up" 
                    delay={0.2 + (index * 0.1)}
                >
                    <Card className="h-full">
                        <CardContent className="h-full">
                            <div className="flex flex-col items-center text-center">
                                <Image 
                                    src={individual.imageUrl} 
                                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover" 
                                />
                                <Spacer y={2}/>
                                <Separator />
                                <Spacer y={2}/>
                                <div className="flex flex-col gap-2">
                                    <div className="text-lg font-semibold text-text">
                                        {individual.name}
                                    </div>
                                    <div className="text-sm text-text-secondary">
                                        {individual.description}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </WrappedAnimation>
            ))}
        </div>
    </div>
) 