'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Grid3X3, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const SVGPatternGenerator = () => {
    const [pattern, setPattern] = useState('polka');
    const [size, setSize] = useState(20);
    const [strokeWidth, setStrokeWidth] = useState(1);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [fgColor, setFgColor] = useState('#6366f1');
    const [opacity, setOpacity] = useState(0.2);

    const patterns = {
        polka: (s: number, sw: number, f: string) => `
<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${s / 2}" cy="${s / 2}" r="${s / 4}" fill="${f}" />
</svg>`,
        stripes: (s: number, sw: number, f: string) => `
<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${s / 2}" height="${s}" fill="${f}" />
</svg>`,
        squares: (s: number, sw: number, f: string) => `
<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${s / 2}" height="${s / 2}" fill="${f}" />
  <rect x="${s / 2}" y="${s / 2}" width="${s / 2}" height="${s / 2}" fill="${f}" />
</svg>`,
        dots: (s: number, sw: number, f: string) => `
<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${s / 2}" cy="0" r="1" fill="${f}" />
  <circle cx="${s / 2}" cy="${s}" r="1" fill="${f}" />
  <circle cx="0" cy="${s / 2}" r="1" fill="${f}" />
  <circle cx="${s}" cy="${s / 2}" r="1" fill="${f}" />
</svg>`,
        lines: (s: number, sw: number, f: string) => `
<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="0" x2="${s}" y2="${s}" stroke="${f}" stroke-width="${sw}" />
</svg>`
    };

    const currentSvg = useMemo(() => {
        return patterns[pattern as keyof typeof patterns](size, strokeWidth, fgColor);
    }, [pattern, size, strokeWidth, fgColor]);

    const base64Svg = useMemo(() => {
        return btoa(currentSvg.trim());
    }, [currentSvg]);

    const cssCode = useMemo(() => {
        return `background-color: ${bgColor};
background-image: url("data:image/svg+xml;base64,${base64Svg}");
background-size: ${size}px ${size}px;
opacity: ${opacity};`;
    }, [bgColor, base64Svg, size, opacity]);

    const copyCode = () => {
        navigator.clipboard.writeText(cssCode);
        toast.success('Pattern CSS copied!');
    };

    return (
        <Card className="w-full max-w-5xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Grid3X3 className="w-6 h-6 text-indigo-500" />
                    SVG Pattern Generator
                </CardTitle>
                <CardDescription>Generate lightweight CSS backgrounds using repeatable SVG patterns</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Pattern</Label>
                                <Select value={pattern} onValueChange={setPattern}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="polka">Polka Dots</SelectItem>
                                        <SelectItem value="stripes">Vertical Stripes</SelectItem>
                                        <SelectItem value="squares">Checkered Squares</SelectItem>
                                        <SelectItem value="dots">Fine Grid Dots</SelectItem>
                                        <SelectItem value="lines">Diagonal Lines</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Size: {size}px</Label>
                                    <Slider value={[size]} min={10} max={100} onValueChange={(v) => setSize(v[0])} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Stroke: {strokeWidth}px</Label>
                                    <Slider value={[strokeWidth]} min={1} max={10} onValueChange={(v) => setStrokeWidth(v[0])} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Background</Label>
                                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 p-1 bg-transparent rounded" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Shape Color</Label>
                                    <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-10 p-1 bg-transparent rounded" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Pattern Opacity: {(opacity * 100).toFixed(0)}%</Label>
                                <Slider value={[opacity]} min={0.05} max={1} step={0.05} onValueChange={(v) => setOpacity(v[0])} />
                            </div>
                        </section>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div
                            className="flex-1 min-h-[300px] rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 shadow-inner relative overflow-hidden"
                            style={{
                                backgroundColor: bgColor,
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;base64,${base64Svg}")`,
                                    backgroundSize: `${size}px ${size}px`,
                                    opacity: opacity
                                }}
                            />
                            <div className="relative z-10 p-6 flex items-center justify-center h-full">
                                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-bold shadow-xl border border-white/20">
                                    Pattern Preview
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <pre className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-x-auto text-[10px] font-mono border dark:border-zinc-700 max-h-[150px]">
                                <code>{cssCode}</code>
                            </pre>
                            <Button size="sm" variant="secondary" className="absolute top-2 right-2" onClick={copyCode}>
                                <Copy className="w-3 h-3 mr-2" /> Copy
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SVGPatternGenerator;
