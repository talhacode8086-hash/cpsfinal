'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const NeumorphismGen = () => {
    const [color, setColor] = useState('#e0e0e0');
    const [size, setSize] = useState(150);
    const [radius, setRadius] = useState(30);
    const [distance, setDistance] = useState(10);
    const [intensity, setIntensity] = useState(0.15);
    const [blur, setBlur] = useState(20);
    const [shape, setShape] = useState('flat');

    const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    };

    const getDarkerColor = (hex: string, amt: number) => {
        const { r, g, b } = hexToRgb(hex);
        return `rgb(${Math.max(0, r - amt)}, ${Math.max(0, g - amt)}, ${Math.max(0, b - amt)})`;
    };

    const getLighterColor = (hex: string, amt: number) => {
        const { r, g, b } = hexToRgb(hex);
        return `rgb(${Math.min(255, r + amt)}, ${Math.min(255, g + amt)}, ${Math.min(255, b + amt)})`;
    };

    const shadowStyles = useMemo(() => {
        const dark = getDarkerColor(color, Math.round(255 * intensity));
        const light = getLighterColor(color, Math.round(255 * intensity));

        const shadow = `${distance}px ${distance}px ${blur}px ${dark}, -${distance}px -${distance}px ${blur}px ${light}`;

        let background = color;
        if (shape === 'concave') background = `linear-gradient(145deg, ${getDarkerColor(color, 20)}, ${getLighterColor(color, 20)})`;
        if (shape === 'convex') background = `linear-gradient(145deg, ${getLighterColor(color, 20)}, ${getDarkerColor(color, 20)})`;

        return {
            backgroundColor: color,
            borderRadius: `${radius}px`,
            boxShadow: shadow,
            background: background,
            width: `${size}px`,
            height: `${size}px`
        };
    }, [color, size, radius, distance, intensity, blur, shape]);

    const cssCode = useMemo(() => {
        return `border-radius: ${radius}px;
background: ${shadowStyles.background};
box-shadow: ${shadowStyles.boxShadow};`;
    }, [radius, shadowStyles]);

    const copyCode = () => {
        navigator.clipboard.writeText(cssCode);
        toast.success('Neumorphism CSS copied!');
    };

    return (
        <Card className="w-full max-w-5xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-indigo-500" />
                    Neumorphism Generator
                </CardTitle>
                <CardDescription>Generate "Soft UI" effects with realistic inner and outer shadows</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div className="space-y-2">
                                <Label>Base Color</Label>
                                <div className="flex gap-2">
                                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-10 p-1 bg-transparent rounded" />
                                    <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 bg-zinc-50 dark:bg-zinc-800 border rounded px-3 text-sm font-mono" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Size: {size}px</Label>
                                    <Slider value={[size]} min={100} max={250} onValueChange={(v) => setSize(v[0])} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Radius: {radius}px</Label>
                                    <Slider value={[radius]} min={0} max={100} onValueChange={(v) => setRadius(v[0])} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Distance: {distance}px</Label>
                                    <Slider value={[distance]} min={5} max={30} onValueChange={(v) => setDistance(v[0])} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Blur: {blur}px</Label>
                                    <Slider value={[blur]} min={0} max={60} onValueChange={(v) => setBlur(v[0])} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Intensity: {(intensity * 100).toFixed(0)}%</Label>
                                <Slider value={[intensity]} min={0.05} max={0.5} step={0.01} onValueChange={(v) => setIntensity(v[0])} />
                            </div>
                            <div className="space-y-2">
                                <Label>Shape</Label>
                                <Select value={shape} onValueChange={setShape}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="flat">Flat</SelectItem>
                                        <SelectItem value="concave">Concave</SelectItem>
                                        <SelectItem value="convex">Convex</SelectItem>
                                        <SelectItem value="pressed">Pressed (Inset)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </section>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div
                            className="flex-1 min-h-[350px] flex items-center justify-center rounded-2xl"
                            style={{ backgroundColor: color }}
                        >
                            <div
                                style={{
                                    ...shadowStyles,
                                    boxShadow: shape === 'pressed'
                                        ? `inset ${distance}px ${distance}px ${blur}px ${getDarkerColor(color, Math.round(255 * intensity))}, inset -${distance}px -${distance}px ${blur}px ${getLighterColor(color, Math.round(255 * intensity))}`
                                        : shadowStyles.boxShadow
                                }}
                                className="flex items-center justify-center text-[10px] font-bold text-zinc-500 uppercase tracking-tighter"
                            >
                                Preview
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

export default NeumorphismGen;
