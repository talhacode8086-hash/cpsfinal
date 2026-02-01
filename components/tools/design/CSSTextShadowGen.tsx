'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Plus, Trash2, Type } from 'lucide-react';
import { toast } from 'sonner';

interface ShadowLayer {
    x: number;
    y: number;
    blur: number;
    color: string;
}

const CSSTextShadowGen = () => {
    const [layers, setLayers] = useState<ShadowLayer[]>([
        { x: 2, y: 2, blur: 4, color: '#00000040' }
    ]);
    const [previewText, setPreviewText] = useState('Premium Design');
    const [fontSize, setFontSize] = useState(64);
    const [fontColor, setFontColor] = useState('#6366f1');

    const shadowString = useMemo(() => {
        return layers.map(l => `${l.x}px ${l.y}px ${l.blur}px ${l.color}`).join(', ');
    }, [layers]);

    const addLayer = () => {
        setLayers([...layers, { x: 4, y: 4, blur: 8, color: '#00000020' }]);
    };

    const removeLayer = (index: number) => {
        if (layers.length > 1) {
            setLayers(layers.filter((_, i) => i !== index));
        }
    };

    const updateLayer = (index: number, updates: Partial<ShadowLayer>) => {
        const newLayers = [...layers];
        newLayers[index] = { ...newLayers[index], ...updates };
        setLayers(newLayers);
    };

    const copyCode = () => {
        const code = `text-shadow: ${shadowString};`;
        navigator.clipboard.writeText(code);
        toast.success('Text Shadow code copied!');
    };

    return (
        <Card className="w-full max-w-5xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl font-sans">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Type className="w-6 h-6 text-indigo-500" />
                            CSS Text Shadow Generator
                        </CardTitle>
                        <CardDescription>Layer multiple shadows for realistic and aesthetic text effects</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={addLayer} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Layer
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div className="space-y-2">
                                <Label>Preview Text</Label>
                                <Input value={previewText} onChange={(e) => setPreviewText(e.target.value)} className="bg-zinc-50 dark:bg-zinc-800" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Font Size: {fontSize}px</Label>
                                    <Slider value={[fontSize]} min={20} max={120} step={1} onValueChange={(v) => setFontSize(v[0])} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Text Color</Label>
                                    <div className="flex gap-2">
                                        <Input type="text" value={fontColor} onChange={(e) => setFontColor(e.target.value)} className="font-mono h-10" />
                                        <Input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} className="w-12 h-10 p-1" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                            {layers.map((layer, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border dark:border-zinc-700 space-y-4 relative group">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-50">Layer {idx + 1}</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeLayer(idx)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px]">X Offset: {layer.x}px</Label>
                                            <Slider value={[layer.x]} min={-50} max={50} onValueChange={(v) => updateLayer(idx, { x: v[0] })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px]">Y Offset: {layer.y}px</Label>
                                            <Slider value={[layer.y]} min={-50} max={50} onValueChange={(v) => updateLayer(idx, { y: v[0] })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px]">Blur: {layer.blur}px</Label>
                                            <Slider value={[layer.blur]} min={0} max={100} onValueChange={(v) => updateLayer(idx, { blur: v[0] })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px]">Color</Label>
                                            <Input type="text" value={layer.color} onChange={(e) => updateLayer(idx, { color: e.target.value })} className="h-8 text-xs font-mono" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="h-[300px] flex items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
                            <h1
                                className="font-black text-center transition-all px-4"
                                style={{
                                    fontSize: `${fontSize}px`,
                                    color: fontColor,
                                    textShadow: shadowString
                                }}
                            >
                                {previewText}
                            </h1>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider opacity-70">CSS Property</Label>
                            <div className="relative group">
                                <pre className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-x-auto text-xs font-mono border dark:border-zinc-700 min-h-[100px] flex items-center">
                                    <code className="text-indigo-600 dark:text-indigo-400 whitespace-pre-wrap">
                                        text-shadow: {shadowString};
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

export default CSSTextShadowGen;
