import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { fontSizeMap, FontType } from "./utils"

const typographyVariants = cva("", {
    variants: {
        size: {
            h1: `${fontSizeMap[FontType.H1].mobile} ${fontSizeMap[FontType.H1].tablet} ${fontSizeMap[FontType.H1].desktop}`,
            h2: `${fontSizeMap[FontType.H2].mobile} ${fontSizeMap[FontType.H2].tablet} ${fontSizeMap[FontType.H2].desktop}`,
            h3: `${fontSizeMap[FontType.H3].mobile} ${fontSizeMap[FontType.H3].tablet} ${fontSizeMap[FontType.H3].desktop}`,
            h4: `${fontSizeMap[FontType.H4].mobile} ${fontSizeMap[FontType.H4].tablet} ${fontSizeMap[FontType.H4].desktop}`,
            h5: `${fontSizeMap[FontType.H5].mobile} ${fontSizeMap[FontType.H5].tablet} ${fontSizeMap[FontType.H5].desktop}`,
            h6: `${fontSizeMap[FontType.H6].mobile} ${fontSizeMap[FontType.H6].tablet} ${fontSizeMap[FontType.H6].desktop}`,
            body: `${fontSizeMap[FontType.Body].mobile} ${fontSizeMap[FontType.Body].tablet} ${fontSizeMap[FontType.Body].desktop}`,
            caption: `${fontSizeMap[FontType.Caption].mobile} ${fontSizeMap[FontType.Caption].tablet} ${fontSizeMap[FontType.Caption].desktop}`,
            small: `${fontSizeMap[FontType.Small].mobile} ${fontSizeMap[FontType.Small].tablet} ${fontSizeMap[FontType.Small].desktop}`,
        },
        weight: {
            light: "font-light",
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
        },
        color: {
            default: "text-default",
            primary: "text-primary",
            secondary: "text-secondary",
            muted: "text-muted-foreground",
            accent: "text-accent",
        },
    },
    defaultVariants: {
        size: "body",
        weight: "normal",
        color: "default",
    },
})

type TypographyVariantProps = VariantProps<typeof typographyVariants>

interface TypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
    as?: keyof JSX.IntrinsicElements
    children: React.ReactNode
    size?: TypographyVariantProps["size"]
    weight?: TypographyVariantProps["weight"]
    color?: TypographyVariantProps["color"]
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
    (
        {
            className,
            size,
            weight,
            color,
            as: Component = "div",
            children,
            ...props
        },
        ref
    ) => {
        const Element = Component as React.ElementType
        return (
            <Element
                ref={ref as React.Ref<HTMLElement>}
                className={cn(
                    typographyVariants({
                        size,
                        weight,
                        color,
                        className,
                    })
                )}
                {...props}
            >
                {children}
            </Element>
        )
    }
)

Typography.displayName = "Typography"

export { Typography, typographyVariants }
export type { TypographyProps }
