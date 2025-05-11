import { Card, CardContent, Image, Spacer, Separator } from "@/components"
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
    <div className="grid grid-cols-4 gap-4">
        {individuals.map((individual) => (
            <div key={individual.name}>
                <Card variant="default">
                    <CardContent>
                        <div className="flex flex-col justify-start">
                            <Image src={individual.imageUrl} className="w-40 h-40 rounded-full" />
                            <Spacer y={2}/>
                            <Separator />
                            <Spacer y={2}/>
                            <div className="flex gap-2">
                                <div className="text-lg text-text">
                                    {individual.name}
                                </div>
                            </div>
                            <div className="text-sm text-text-secondary">
                                {individual.description}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        ))}
    </div>
) 