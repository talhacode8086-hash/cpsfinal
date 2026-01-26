'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, RefreshCw, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/ui/slider';

// Helper to generate random hex color
const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Helper for contrast text color
const getContrastColor = (hex: string) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#FFFFFF';
};

export default function ColorPaletteGenerator() {
    const [colors, setColors] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [count, setCount] = useState(5);

    const generatePalette = () => {
        const newColors = Array.from({ length: count }, () => generateRandomColor());
        setColors(newColors);
    };

    useEffect(() => {
        generatePalette();
    }, [count]);

    const copyToClipboard = (color: string, index: number) => {
        navigator.clipboard.writeText(color);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <Card className="border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="text-center border-b border-primary/5 pb-8">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                        <Palette className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold">AI Color Palette Generator</CardTitle>
                    <p className="text-muted-foreground mt-2">Instantly generate beautiful, harmonious color schemes for your projects.</p>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="h-[400px] flex flex-col md:flex-row w-full">
                        <AnimatePresence mode='wait'>
                            {colors.map((color, index) => (
                                <motion.div
                                    key={`${color}-${index}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="relative flex-1 h-full min-h-[80px] flex flex-col items-center justify-center group cursor-pointer transition-all hover:flex-[1.5]"
                                    style={{ backgroundColor: color }}
                                    onClick={() => copyToClipboard(color, index)}
                                >
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                                        <div className="p-3 rounded-full bg-white/20 backdrop-blur-md shadow-lg">
                                            {copiedIndex === index ? (
                                                <Check className="h-6 w-6 text-white" />
                                            ) : (
                                                <Copy className="h-6 w-6 text-white" />
                                            )}
                                        </div>
                                        <span
                                            className="font-mono font-bold text-lg uppercase tracking-wider"
                                            style={{ color: getContrastColor(color) }}
                                        >
                                            {color}
                                        </span>
                                    </div>

                                    {/* Mobile View Label */}
                                    <span
                                        className="md:hidden font-mono font-bold uppercase tracking-wider mt-2"
                                        style={{ color: getContrastColor(color) }}
                                    >
                                        {color}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 space-y-8 bg-background">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="w-full md:w-64 space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-sm font-bold text-muted-foreground uppercase">Count: {count}</span>
                                </div>
                                <Slider
                                    value={[count]}
                                    min={2}
                                    max={8}
                                    step={1}
                                    onValueChange={(v) => setCount(v[0])}
                                />
                            </div>

                            <Button
                                size="lg"
                                onClick={generatePalette}
                                className="h-16 px-12 rounded-full text-xl font-bold shadow-2xl shadow-primary/20 hover:scale-105 transition-transform"
                            >
                                <RefreshCw className="mr-3 h-6 w-6" /> Generate New
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Monochromatic', 'Analogous', 'Complementary', 'Triadic'].map((mode) => (
                    <div key={mode} className="p-6 rounded-2xl bg-muted/10 border border-primary/5 text-center opacity-50 hover:opacity-100 transition-opacity cursor-not-allowed">
                        <span className="text-xs font-black uppercase tracking-widest">{mode}</span>
                        <p className="text-[10px] mt-1 text-muted-foreground">Coming Soon</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
