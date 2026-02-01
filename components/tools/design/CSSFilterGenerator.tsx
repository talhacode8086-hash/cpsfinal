'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, Sliders, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const CSSFilterGenerator = () => {
    const [filters, setFilters] = useState({
        brightness: 100,
        contrast: 100,
        saturate: 100,
        grayscale: 0,
        sepia: 0,
        hueRotate: 0,
        blur: 0,
        invert: 0,
        opacity: 100
    });

    const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000');

    const filterString = useMemo(() => {
        return `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) hue-rotate(${filters.hueRotate}deg) blur(${filters.blur}px) invert(${filters.invert}%) opacity(${filters.opacity}%)`;
    }, [filters]);

    const copyCode = () => {
        const code = `filter: ${filterString};
-webkit-filter: ${filterString};`;
        navigator.clipboard.writeText(code);
        toast.success('CSS Filter code copied!');
    };

    const resetFilters = () => {
        setFilters({
            brightness: 100,
            contrast: 100,
            saturate: 100,
            grayscale: 0,
            sepia: 0,
            hueRotate: 0,
            blur: 0,
            invert: 0,
            opacity: 100
        });
    };

    const updateFilter = (key: string, value: number[]) => {
        setFilters(prev => ({ ...prev, [key]: value[0] }));
    };

    return (
        <Card className="w-full max-w-5xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Sliders className="w-6 h-6 text-indigo-500" />
                            CSS Filter Generator
                        </CardTitle>
                        <CardDescription>Visually adjust CSS filters and generate optimized code</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={resetFilters} className="gap-2">
                        <RefreshCw className="w-4 h-4" /> Reset
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            {[
                                { label: 'Brightness', key: 'brightness', unit: '%', min: 0, max: 200 },
                                { label: 'Contrast', key: 'contrast', unit: '%', min: 0, max: 200 },
                                { label: 'Saturation', key: 'saturate', unit: '%', min: 0, max: 200 },
                                { label: 'Grayscale', key: 'grayscale', unit: '%', min: 0, max: 100 },
                                { label: 'Sepia', key: 'sepia', unit: '%', min: 0, max: 100 },
                                { label: 'Hue Rotate', key: 'hueRotate', unit: 'deg', min: 0, max: 360 },
                                { label: 'Blur', key: 'blur', unit: 'px', min: 0, max: 20 },
                                { label: 'Invert', key: 'invert', unit: '%', min: 0, max: 100 },
                                { label: 'Opacity', key: 'opacity', unit: '%', min: 0, max: 100 },
                            ].map((config) => (
                                <div key={config.key} className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label className="text-xs font-bold uppercase tracking-wider opacity-70">
                                            {config.label}
                                        </Label>
                                        <span className="text-xs font-mono font-bold text-indigo-500">
                                            {filters[config.key as keyof typeof filters]}{config.unit}
                                        </span>
                                    </div>
                                    <Slider
                                        value={[filters[config.key as keyof typeof filters]]}
                                        min={config.min}
                                        max={config.max}
                                        step={1}
                                        onValueChange={(val) => updateFilter(config.key, val)}
                                        className="py-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-700">
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="w-full h-[400px] object-cover transition-all"
                                style={{ filter: filterString }}
                            />
                            <div className="absolute top-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="Paste image URL..."
                                    className="flex-1 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg border-white/20 outline-none"
                                />
                                <div className="bg-black/60 backdrop-blur-md p-2 rounded-lg text-white">
                                    <ImageIcon className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider opacity-70">Generated CSS</Label>
                            <div className="relative group">
                                <pre className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-x-auto text-xs font-mono leading-relaxed border dark:border-zinc-700">
                                    <code className="text-indigo-600 dark:text-indigo-400">
                                        filter: {filterString};{'\n'}
                                        -webkit-filter: {filterString};
                                    </code>
                                </pre>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
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

export default CSSFilterGenerator;
