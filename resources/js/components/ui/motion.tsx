'use client';

import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
import { useRef, ReactNode } from 'react';

// Animation variants - slower, more elegant movements
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const slideLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
};

const slideRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
};

const staggerContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const staggerItem: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
};

// Variant map
const variants = {
    fadeUp,
    fadeIn,
    slideLeft,
    slideRight,
    scaleIn,
    staggerContainer,
    staggerItem,
};

type VariantName = keyof typeof variants;

interface RevealProps {
    children: ReactNode;
    variant?: VariantName;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
    amount?: number;
}

export function Reveal({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 0.8,
    className = '',
    once = true,
    amount = 0.15,
}: RevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants[variant]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerProps {
    children: ReactNode;
    className?: string;
    once?: boolean;
    amount?: number;
    staggerDelay?: number;
}

export function Stagger({
    children,
    className = '',
    once = true,
    amount = 0.15,
    staggerDelay = 0.12,
}: StaggerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: { opacity: 1 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.15,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className = '',
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            variants={staggerItem}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Re-export motion and AnimatePresence for custom animations
export { motion, AnimatePresence };
