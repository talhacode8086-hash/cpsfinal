'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MousePointer2, Settings2, Trash2 } from 'lucide-react';

export default function TrailVisualizer() {
    const [points, setPoints] = useState<{ x: number, y: number, id: number, age: number }[]>([]);
    const [color, setColor] = useState('hsl(var(--primary))');
    const [thickness, setThickness] = useState(4);
    const [maxAge, setMaxAge] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    setPoints(prev => [...prev, { x, y, id: Math.random(), age: 0 }]);
                }
            }
        };

        const update = () => {
            setPoints(prev =>
                prev
                    .map(p => ({ ...p, age: p.age + 1 }))
                    .filter(p => p.age < maxAge)
            );
            frameRef.current = requestAnimationFrame(update);
        };

        window.addEventListener('mousemove', handleMouseMove);
        frameRef.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [maxAge]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                    <div
                        ref={containerRef}
                        className="h-[450px] bg-zinc-950 rounded-3xl overflow-hidden relative border-4 border-zinc-900 cursor-none"
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <MousePointer2 className="h-64 w-64 text-white" />
                        </div>
                        <svg className="w-full h-full relative z-10">
                            {points.map((p, i) => {
                                if (i === 0) return null;
                                const prev = points[i - 1];
                                const opacity = 1 - (p.age / maxAge);
                                return (
                                    <line
                                        key={p.id}
                                        x1={prev.x}
                                        y1={prev.y}
                                        x2={p.x}
                                        y2={p.y}
                                        stroke={color}
                                        strokeWidth={thickness}
                                        strokeOpacity={opacity}
                                        strokeLinecap="round"
                                    />
                                );
                            })}
                        </svg>
                    </div>
                </Card>

                <Card>
                    <CardHeader className="p-6">
                        <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest text-muted-foreground">
                            <Settings2 className="h-4 w-4" />
                            Trail Settings
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-0">
                        <div className="space-y-3">
                            <label className="text-sm font-medium">Color</label>
                            <div className="flex gap-2 flex-wrap">
                                {['hsl(var(--primary))', '#ef4444', '#22c55e', '#3b82f6', '#eab308'].map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-white' : 'border-transparent'}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <label className="font-medium">Length</label>
                                <span className="text-muted-foreground">{maxAge}</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="200"
                                value={maxAge}
                                onChange={(e) => setMaxAge(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <label className="font-medium">Thickness</label>
                                <span className="text-muted-foreground">{thickness}px</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={thickness}
                                onChange={(e) => setThickness(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <Button
                            variant="outline"
                            className="w-full text-destructive hover:text-destructive gap-2"
                            onClick={() => setPoints([])}
                        >
                            <Trash2 className="h-4 w-4" /> Clear Canvas
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-muted/50 p-6 rounded-3xl border border-muted">
                <h3 className="font-bold mb-2">How it works</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    This tool visualizes your mouse polling and movement consistency. Smooth, unbroken lines indicate consistent sampling, while gaps or jagged corners can highlight sensor issues or system latency. Use the settings to customize the trail for better visual analysis.
                </p>
            </div>
        </div>
    );
}
