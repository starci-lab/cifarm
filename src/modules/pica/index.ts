import pica from "pica"

const createImageFromBlob = (blob: Blob): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.src = URL.createObjectURL(blob)
    })
}
export const resizeBlobWithPica = async (blob: Blob, scale: number): Promise<string> => {
    const img = await createImageFromBlob(blob) 
    const canvas = document.createElement("canvas")
    canvas.width = img.width * scale
    canvas.height = img.height * scale
    const offscreen = document.createElement("canvas")
    offscreen.width = img.width
    offscreen.height = img.height
    const ctx = offscreen.getContext("2d")
    ctx?.drawImage(img, 0, 0)
    const result = await pica().resize(offscreen, canvas)
    const blobResult = await pica().toBlob(result, blob.type)
    return URL.createObjectURL(blobResult)
}

