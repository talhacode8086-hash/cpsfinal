'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, Palette } from 'lucide-react';
import { toast } from 'sonner';

const ColorShadesGenerator = () => {
    const [baseColor, setBaseColor] = useState('#6366f1'); // Default Indigo

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    const generateShades = (hex: string) => {
        const rgb = hexToRgb(hex);
        const shades = [];
        const tints = [];

        // Generate 10 tints (lighter)
        for (let i = 1; i <= 10; i++) {
            const factor = i * 0.1;
            const r = Math.round(rgb.r + (255 - rgb.r) * factor);
            const g = Math.round(rgb.g + (255 - rgb.g) * factor);
            const b = Math.round(rgb.b + (255 - rgb.b) * factor);
            tints.push(rgbToHex(r, g, b));
        }

        // Generate 10 shades (darker)
        for (let i = 1; i <= 10; i++) {
            const factor = 1 - (i * 0.1);
            const r = Math.round(rgb.r * factor);
            const g = Math.round(rgb.g * factor);
            const b = Math.round(rgb.b * factor);
            shades.push(rgbToHex(r, g, b));
        }

        return { tints: tints.reverse(), shades };
    };

    const { tints, shades } = useMemo(() => generateShades(baseColor), [baseColor]);

    const copyToClipboard = (color: string) => {
        navigator.clipboard.writeText(color.toUpperCase());
        toast.success(`Copied ${color.toUpperCase()} to clipboard!`);
    };

    const generateRandomColor = () => {
        const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setBaseColor(randomHex);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Palette className="w-6 h-6 text-indigo-500" />
                            Color Shades Generator
                        </CardTitle>
                        <CardDescription>Generate monochrome tints and shades for any base color</CardDescription>
                    </div>
                    <Button variant="outline" size="icon" onClick={generateRandomColor} title="Random Color">
                        <RefreshCw className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="base-color">Base Color (HEX)</Label>
                        <div className="flex gap-2">
                            <div
                                className="w-10 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-inner"
                                style={{ backgroundColor: baseColor }}
                            />
                            <Input
                                id="base-color"
                                type="text"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="font-mono text-center"
                                placeholder="#000000"
                            />
                            <Input
                                type="color"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="w-12 p-1 h-10 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tints (Lighter)</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                            {tints.map((color, idx) => (
                                <button
                                    key={`tint-${idx}`}
                                    onClick={() => copyToClipboard(color)}
                                    className="group relative flex flex-col items-center gap-1 transition-transform hover:scale-105"
                                >
                                    <div
                                        className="w-full aspect-square rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4">{color}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <div className="h-20 flex items-center justify-center relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <div className="absolute inset-0" style={{ backgroundColor: baseColor }} />
                        <div className="relative z-10 px-4 py-1 bg-black/20 backdrop-blur-md rounded-full text-white font-mono text-lg font-bold">
                            {baseColor.toUpperCase()}
                        </div>
                    </div>

                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Shades (Darker)</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                            {shades.map((color, idx) => (
                                <button
                                    key={`shade-${idx}`}
                                    onClick={() => copyToClipboard(color)}
                                    className="group relative flex flex-col items-center gap-1 transition-transform hover:scale-105"
                                >
                                    <div
                                        className="w-full aspect-square rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4">{color}</span>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg text-xs space-y-2">
                    <p className="font-semibold flex items-center gap-1">
                        <Copy className="w-3 h-3" /> Tip:
                    </p>
                    <p>Click any color swatch to copy its HEX code. Tints are created by mixing the base color with white, while shades are created by mixing with black.</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ColorShadesGenerator;
