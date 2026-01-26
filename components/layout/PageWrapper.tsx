'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const variants = {
    initial: {
        opacity: 0,
        y: 10,
        filter: 'blur(5px)',
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: "circOut" as const,
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        filter: 'blur(5px)',
        transition: {
            duration: 0.3,
            ease: "circIn" as const,
        },
    },
};

export default function PageWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
