import React from "react"

interface WrappedSectionProps {
    title: string
    description?: string
    children: React.ReactNode
}

export const WrappedSection: React.FC<WrappedSectionProps> = ({ title, description, children }) => {
    return (
        <section className="w-full py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>
                <div className="mt-8">
                    {children}
                </div>
            </div>
        </section>
    )
} 