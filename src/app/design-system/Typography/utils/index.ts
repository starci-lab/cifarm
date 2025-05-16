//Major Third 1.25
//Minor Third 1.2
//Major Second 1.125

export const MAJOR_THIRD = 1.25 // desktop - lg
export const MINOR_THIRD = 1.2 // tablet - md
export const MAJOR_SECOND = 1.125 // mobile 

export const FONT_BASE_SIZE = 16.0

//enum font type
export enum FontType {
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
    H5 = "h5",
    H6 = "h6",
    Body = "body", // Font base size 16px
    Caption = "caption",
    Small = "small",
}

//rounded to the nearest 2 decimal places
export const roundTo2Decimals = (value: number) => {
    return Math.round(value * 100) / 100
}

export interface FontSizeValue{
    mobile: string
    tablet: string
    desktop: string
}

//Font base size * major third
export const fontSizeMap: Record<FontType, FontSizeValue> = {
    [FontType.H1]: {
        mobile: `text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, 6))}px]`,
        tablet: `md:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, 6))}px]`,
        desktop: `lg:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, 6))}px]`
    },
    [FontType.H2]: {
        mobile: `text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, 5))}px]`,
        tablet: `md:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, 5))}px]`,
        desktop: `lg:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, 5))}px]`
    },
    [FontType.H3]: {
        mobile: `text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, 4))}px]`,
        tablet: `md:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, 4))}px]`,
        desktop: `lg:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, 4))}px]`
    },
    [FontType.H4]: {
        mobile: `text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, 3))}px]`,
        tablet: `md:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, 3))}px]`,
        desktop: `lg:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, 3))}px]`
    },
    [FontType.H5]: {
        mobile: `text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, 2))}px]`,
        tablet: `md:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, 2))}px]`,
        desktop: `lg:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, 2))}px]`
    },
    [FontType.H6]: {
        mobile: `text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, 1))}px]`,
        tablet: `md:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, 1))}px]`,
        desktop: `lg:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, 1))}px]`
    },
    [FontType.Body]: {
        mobile: `text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, 0))}px]`,
        tablet: `md:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, 0))}px]`,
        desktop: `lg:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, 0))}px]`
    },
    [FontType.Caption]: {
        mobile: `text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, -1))}px]`,
        tablet: `md:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, -1))}px]`,
        desktop: `lg:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, -1))}px]`
    },
    [FontType.Small]: {
        mobile: `text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_SECOND, -2))}px]`,
        tablet: `md:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MINOR_THIRD, -2))}px]`,
        desktop: `lg:text-[${roundTo2Decimals(FONT_BASE_SIZE * Math.pow(MAJOR_THIRD, -2))}px]`
    }
}
