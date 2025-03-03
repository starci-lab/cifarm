// ignore the typescript error
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import jazzicon from "@metamask/jazzicon"

export const createJazziconBlobUrl = (address: string) => {
    const jazziconSvg = jazzicon(16, parseInt(address.slice(2, 10), 16))
    const jazziconSvgString = new XMLSerializer().serializeToString(jazziconSvg)
    // keep the SVG
    const svgString = jazziconSvgString.substring(
        jazziconSvgString.indexOf("<svg"),
        jazziconSvgString.indexOf("</svg>") + 6
    )
    // Create the Blob from the updated SVG string
    const blob = new Blob([svgString], { type: "image/svg+xml" })
    return URL.createObjectURL(blob)
}