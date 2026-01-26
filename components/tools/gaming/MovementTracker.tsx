'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MousePointer2, RefreshCw } from 'lucide-react';

export default function MovementTracker() {
    const [points, setPoints] = useState<{ x: number, y: number }[]>([]);
    const [distance, setDistance] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    setPoints(prev => {
                        const newPoints = [...prev.slice(-100), { x, y }];
                        if (prev.length > 0) {
                            const last = prev[prev.length - 1];
                            const d = Math.sqrt(Math.pow(x - last.x, 2) + Math.pow(y - last.y, 2));
                            setDistance(prevD => prevD + d);
                        }
                        return newPoints;
                    });
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const reset = () => {
        setPoints([]);
        setDistance(0);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Distance</div>
                        <div className="text-4xl font-bold mt-1">{(distance / 100).toFixed(2)}m</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Path Precision</div>
                        <div className="text-4xl font-bold mt-1">{points.length} pts</div>
                    </CardContent>
                </Card>
            </div>

            <div
                ref={containerRef}
                className="relative h-[400px] bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center overflow-hidden cursor-none"
            >
                <div className="absolute inset-0">
                    <svg className="w-full h-full">
                        <polyline
                            points={points.map(p => `${p.x},${p.y}`).join(' ')}
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-50"
                        />
                        {points.length > 0 && (
                            <circle
                                cx={points[points.length - 1].x}
                                cy={points[points.length - 1].y}
                                r="6"
                                fill="hsl(var(--primary))"
                            />
                        )}
                    </svg>
                </div>
                {points.length === 0 && (
                    <div className="text-muted-foreground flex flex-col items-center gap-2 pointer-events-none">
                        <MousePointer2 className="h-8 w-8 animate-bounce" />
                        <p>Move your mouse in this area to track movement</p>
                    </div>
                )}

                <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-4 right-4 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={reset}
                >
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
