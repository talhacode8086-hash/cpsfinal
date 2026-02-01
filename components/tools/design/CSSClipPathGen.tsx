'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, Scissors, RefreshCw, Triangle, Square, Pentagon, Hexagon } from 'lucide-react';
import { toast } from 'sonner';

interface Point {
    x: number;
    y: number;
}

const CSSClipPathGen = () => {
    const [points, setPoints] = useState<Point[]>([
        { x: 50, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 }
    ]);
    const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const clipPathString = useMemo(() => {
        return `polygon(${points.map(p => `${p.x}% ${p.y}%`).join(', ')})`;
    }, [points]);

    const handlePresets = {
        triangle: [{ x: 50, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }],
        square: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }],
        pentagon: [{ x: 50, y: 0 }, { x: 100, y: 38 }, { x: 82, y: 100 }, { x: 18, y: 100 }, { x: 0, y: 38 }],
        hexagon: [{ x: 25, y: 0 }, { x: 75, y: 0 }, { x: 100, y: 50 }, { x: 75, y: 100 }, { x: 25, y: 100 }, { x: 0, y: 50 }]
    };

    const copyCode = () => {
        const code = `clip-path: ${clipPathString};
-webkit-clip-path: ${clipPathString};`;
        navigator.clipboard.writeText(code);
        toast.success('Clip Path code copied!');
    };

    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
        if (draggingIdx === null || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let x = ((e.clientX - rect.left) / rect.width) * 100;
        let y = ((e.clientY - rect.top) / rect.height) * 100;

        x = Math.max(0, Math.min(100, Math.round(x)));
        y = Math.max(0, Math.min(100, Math.round(y)));

        const newPoints = [...points];
        newPoints[draggingIdx] = { x, y };
        setPoints(newPoints);
    };

    const handleMouseUp = () => setDraggingIdx(null);

    useEffect(() => {
        if (draggingIdx !== null) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingIdx]);

    return (
        <Card className="w-full max-w-5xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Scissors className="w-6 h-6 text-indigo-500" />
                            CSS Clip-Path Generator
                        </CardTitle>
                        <CardDescription>Drag the handles to create custom polygon shapes</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <Label className="text-xs font-bold uppercase tracking-wider opacity-70">Presets</Label>
                            <div className="grid grid-cols-4 gap-2">
                                <Button variant="outline" size="sm" onClick={() => setPoints(handlePresets.triangle)} className="flex-col gap-1 h-16">
                                    <Triangle className="w-4 h-4" /> <span className="text-[10px]">Triangle</span>
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setPoints(handlePresets.square)} className="flex-col gap-1 h-16">
                                    <Square className="w-4 h-4" /> <span className="text-[10px]">Square</span>
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setPoints(handlePresets.pentagon)} className="flex-col gap-1 h-16">
                                    <Pentagon className="w-4 h-4" /> <span className="text-[10px]">Pentagon</span>
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setPoints(handlePresets.hexagon)} className="flex-col gap-1 h-16">
                                    <Hexagon className="w-4 h-4" /> <span className="text-[10px]">Hexagon</span>
                                </Button>
                            </div>
                        </section>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider opacity-70">Points Info</Label>
                            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                                {points.map((p, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg border dark:border-zinc-700">
                                        <span className="w-5 h-5 flex items-center justify-center bg-indigo-500 text-white rounded-full text-[10px] font-bold">{i + 1}</span>
                                        <div className="flex-1 grid grid-cols-2 gap-2">
                                            <div className="text-[10px] font-mono">X: {p.x}%</div>
                                            <div className="text-[10px] font-mono">Y: {p.y}%</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div
                            ref={containerRef}
                            className="aspect-square relative rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 overflow-hidden"
                            onMouseDown={(e) => { }}
                        >
                            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-10 pointer-events-none">
                                {[...Array(100)].map((_, i) => (
                                    <div key={i} className="border border-zinc-500" />
                                ))}
                            </div>

                            {/* The Clipped Element */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
                                style={{ clipPath: clipPathString }}
                            />

                            {/* Interaction Layer */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                <polyline
                                    points={points.map(p => `${p.x * 3.5},${p.y * 3.5}`).join(' ')}
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1"
                                    strokeDasharray="4 2"
                                    className="opacity-30"
                                />
                            </svg>

                            {points.map((p, i) => (
                                <div
                                    key={i}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        setDraggingIdx(i);
                                    }}
                                    className="absolute w-5 h-5 -ml-2.5 -mt-2.5 bg-white border-2 border-indigo-500 rounded-full cursor-move shadow-lg z-20 flex items-center justify-center text-[8px] font-bold text-indigo-500 hover:scale-125 transition-transform"
                                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider opacity-70">CSS Snippet</Label>
                            <div className="relative group">
                                <pre className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-x-auto text-[10px] font-mono border dark:border-zinc-700">
                                    <code className="text-pink-500">
                                        clip-path: {clipPathString};{'\n'}
                                        -webkit-clip-path: {clipPathString};
                                    </code>
                                </pre>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="absolute top-2 right-2 h-8"
                                    onClick={copyCode}
                                >
                                    <Copy className="w-3 h-3 mr-2" /> Copy
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CSSClipPathGen;
