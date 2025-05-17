import React from "react"
import { Typography } from "./Typography"

const Page = () => {
    return (
        <div className="p-8 space-y-8">
            <Typography size="h1" weight="bold">Typography System</Typography>
            
            <section className="space-y-4">
                <Typography size="h2" weight="bold">Headings</Typography>
                <div className="space-y-2">
                    <Typography size="h1" weight="bold">Heading 1</Typography>
                    <Typography size="h2" weight="bold">Heading 2</Typography>
                    <Typography size="h3" weight="bold">Heading 3</Typography>
                    <Typography size="h4" weight="bold">Heading 4</Typography>
                    <Typography size="h5" weight="bold">Heading 5</Typography>
                    <Typography size="h6" weight="bold">Heading 6</Typography>
                    <Typography size="body" weight="bold">Body</Typography>
                    <Typography size="caption" weight="bold">Caption</Typography>
                    <Typography size="small" weight="bold">Small</Typography>
                </div>
            </section>
            <section className="space-y-4">
                <Typography size="h2" weight="semibold">Colors</Typography>
                <div className="space-y-2">
                    <Typography color="primary">Primary text</Typography>
                    <Typography color="secondary">Secondary text</Typography>
                    <Typography color="muted">Muted text</Typography>
                    <Typography color="accent">Accent text</Typography>
                </div>
            </section>
        </div>
    )
}

export default Page