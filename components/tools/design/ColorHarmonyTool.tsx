'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const ColorHarmonyTool = () => {
    const [baseColor, setBaseColor] = useState('#ef4444'); // Default Red

    const hexToHSL = (hex: string) => {
        let r: any = 0, g: any = 0, b: any = 0;
        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        r /= 255; g /= 255; b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0, s = 0, l = 0;

        if (delta === 0) h = 0;
        else if (cmax === r) h = ((g - b) / delta) % 6;
        else if (cmax === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);
        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return { h, s, l };
    };

    const hslToHex = (h: number, s: number, l: number) => {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    };

    const getHarmonies = (hex: string) => {
        const { h, s, l } = hexToHSL(hex);

        return {
            complementary: [hex, hslToHex((h + 180) % 360, s, l)],
            analogous: [hslToHex((h + 330) % 360, s, l), hex, hslToHex((h + 30) % 360, s, l)],
            triadic: [hex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)],
            tetradic: [hex, hslToHex((h + 90) % 360, s, l), hslToHex((h + 180) % 360, s, l), hslToHex((h + 270) % 360, s, l)],
            monochromatic: [
                hslToHex(h, s, Math.max(0, l - 30)),
                hslToHex(h, s, Math.max(0, l - 15)),
                hex,
                hslToHex(h, s, Math.min(100, l + 15)),
                hslToHex(h, s, Math.min(100, l + 30))
            ]
        };
    };

    const harmonies = useMemo(() => getHarmonies(baseColor), [baseColor]);

    const copyToClipboard = (color: string) => {
        navigator.clipboard.writeText(color.toUpperCase());
        toast.success(`Copied ${color.toUpperCase()}`);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-amber-500" />
                            Color Harmony Tool
                        </CardTitle>
                        <CardDescription>Explore classical color relationships based on the color wheel</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2">
                        <Label>Pick a Base Color</Label>
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="font-mono"
                            />
                            <Input
                                type="color"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="w-12 h-10 p-1"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {Object.entries(harmonies).map(([type, colors]) => (
                        <section key={type} className="space-y-3">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                                {type}
                                <span className="text-[10px] font-normal lowercase opacity-60">Click to copy</span>
                            </h3>
                            <div className="flex h-24 w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                {colors.map((color, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => copyToClipboard(color)}
                                        className="flex-1 transition-all hover:flex-[1.5] group relative overflow-hidden"
                                        style={{ backgroundColor: color }}
                                    >
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <Copy className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="absolute bottom-1 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[10px] font-mono text-white bg-black/50 px-1 rounded">{color.toUpperCase()}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ColorHarmonyTool;
