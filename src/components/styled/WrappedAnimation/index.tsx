import { AnimationControls, motion, TargetAndTransition, VariantLabels, Variants } from "framer-motion"
import React from "react"

interface WrappedAnimationProps {
    children: React.ReactNode
    variants?: Variants
    className?: string
    delay?: number
    duration?: number
    direction?: "up" | "down" | "left" | "right"
    distance?: number
    type?: "fade" | "slide" | "scale" | "fade-slide"
    initial?: boolean | TargetAndTransition | VariantLabels
    animate?: boolean | TargetAndTransition | VariantLabels | AnimationControls
    exit?: TargetAndTransition | VariantLabels
}

const getDirectionOffset = (direction: string, distance: number) => {
    switch (direction) {
    case "up":
        return { y: distance }
    case "down":
        return { y: -distance }
    case "left":
        return { x: distance }
    case "right":
        return { x: -distance }
    default:
        return { y: distance }
    }
}

const getAnimationVariants = (type: string, direction: string, distance: number): Variants => {
    const offset = getDirectionOffset(direction, distance)
    
    switch (type) {
    case "fade":
        return {
            hidden: { opacity: 0 },
            visible: { 
                opacity: 1,
                transition: { duration: 0.5 }
            },
            exit: {
                opacity: 0,
                transition: { duration: 0.3 }
            }
        }
    case "slide":
        return {
            hidden: { ...offset, opacity: 0 },
            visible: { 
                x: 0,
                y: 0,
                opacity: 1,
                transition: { duration: 0.5 }
            },
            exit: {
                ...offset,
                opacity: 0,
                transition: { duration: 0.3 }
            }
        }
    case "scale":
        return {
            hidden: { scale: 0.8, opacity: 0 },
            visible: { 
                scale: 1,
                opacity: 1,
                transition: { duration: 0.5 }
            },
            exit: {
                scale: 0.8,
                opacity: 0,
                transition: { duration: 0.3 }
            }
        }
    case "fade-slide":
    default:
        return {
            hidden: { ...offset, opacity: 0 },
            visible: { 
                x: 0,
                y: 0,
                opacity: 1,
                transition: { duration: 0.5 }
            },
            exit: {
                ...offset,
                opacity: 0,
                transition: { duration: 0.3 }
            }
        }
    }
}

export const WrappedAnimation: React.FC<WrappedAnimationProps> = ({
    children,
    variants,
    className = "",
    delay = 0,
    duration = 0.5,
    direction = "up",
    distance = 20,
    type = "fade-slide",
    initial = "hidden",
    animate = "visible",
    exit = "exit"
}) => {
    const defaultVariants = getAnimationVariants(type, direction, distance)
    const finalVariants = variants || defaultVariants

    return (
        <motion.div
            className={className}
            variants={finalVariants}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={{
                delay,
                duration,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    )
} 