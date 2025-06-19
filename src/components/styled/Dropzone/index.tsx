import React, { FC } from "react"
import {useDropzone} from "react-dropzone"
import { Folder, FolderOpen } from "@phosphor-icons/react"
import { Spacer, addErrorToast } from "@/components"

export interface DropzoneProps {
    onDrop: (acceptedFiles: Array<File>) => void
    dragMessage?: string
    dropMessage?: string
}
export const Dropzone: FC<DropzoneProps> = ({onDrop, dragMessage, dropMessage}) => {
    const _onDrop = (acceptedFiles: Array<File>) => {
        for (const file of acceptedFiles) {
            if (!file.type.startsWith("image/")) {
                console.log(file)
                addErrorToast({
                    errorMessage: "Only image files are allowed"
                })
                return
            }
        }
        onDrop(acceptedFiles)
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: _onDrop, 
        multiple: false,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".ico", ".webp"]
        }
    })
    // only allow image files
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <div className="border-dashed border-2 border-primary rounded-md p-4 grid place-items-center">
                        <FolderOpen weight="fill" className="w-10 h-10 text-muted-foreground"/>
                        <Spacer y={2} />
                        <div className="text-muted-foreground">{dropMessage || "Drop the files here ..."}</div>
                    </div>  
                    :
                    <div className="border-dashed border-2 border-primary rounded-md p-4 grid place-items-center">
                        <Folder weight="fill" className="w-10 h-10 text-muted-foreground"/>
                        <Spacer y={2} />
                        <div className="text-muted-foreground">{dragMessage || "Drag &apos;n&apos; drop some files here, or click to select files"}</div>
                    </div>
            }
        </div>
    )
}