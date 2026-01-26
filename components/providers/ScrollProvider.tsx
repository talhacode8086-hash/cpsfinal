'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function ScrollProvider({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        }}>
            {children}
        </ReactLenis>
    );
}
