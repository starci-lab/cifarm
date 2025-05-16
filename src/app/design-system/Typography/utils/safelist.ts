import { FONT_BASE_SIZE, MAJOR_SECOND, MINOR_THIRD, MAJOR_THIRD } from "./index"

const roundTo2Decimals = (value: number) => Math.round(value * 100) / 100

// Generate font sizes for each type
const generateFontSizes = () => {
    const sizes = [
        // H1-H6 sizes
        ...Array.from({ length: 6 }, (_, i) => [
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, 6 - i)),
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, 6 - i)),
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, 6 - i))
        ]),
        // Body size
        [
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, 0)),
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, 0)),
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, 0))
        ],
        // Caption size
        [
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, -1)),
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, -1)),
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, -1))
        ],
        // Small size
        [
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, -2)),
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, -2)),
            roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, -2))
        ]
    ].flat()

    return sizes.flatMap(size => [
        `text-[${size}px]`,
        `md:text-[${size}px]`,
        `lg:text-[${size}px]`
    ])
}

export const typographySafelist = generateFontSizes() 