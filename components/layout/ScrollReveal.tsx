'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
}

export default function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    className = ''
}: ScrollRevealProps) {
    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
    };

    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                ...directions[direction],
                scale: 0.95
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
        >
            {children}
        </motion.div>
    );
}
