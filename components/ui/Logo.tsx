import React from 'react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className={cn("w-10 h-10", className)}
            fill="none"
        >
            <defs>
                <linearGradient id="logo-gradient" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FB923C" /> {/* orange-400 */}
                    <stop offset="100%" stopColor="#EA580C" /> {/* orange-600 */}
                </linearGradient>
            </defs>

            {/* Orbital Ring - Grey Swoosh */}
            {/* An orbit going around the central shape */}
            <path
                d="M160 100 A 70 30 0 1 1 40 100 A 70 30 0 1 1 160 100"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                className="text-slate-400 dark:text-slate-500 opacity-60"
                transform="rotate(-30, 100, 100)"
                fill="none"
            />

            {/* Central Arrow/Triangle - Orange */}
            {/* Stylized 'A' shape / Arrowhead */}
            <path
                d="M100 40 L160 150 L100 130 L40 150 Z"
                fill="url(#logo-gradient)"
                style={{ filter: "drop-shadow(0px 4px 10px rgba(234, 88, 12, 0.4))" }}
            />

        </svg>
    );
}
