'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout, Copy, Eye } from 'lucide-react';
import { toast } from 'sonner';

const CardLayoutVisualizer = () => {
    const [style, setStyle] = useState('glass');
    const [padding, setPadding] = useState(24);
    const [gap, setGap] = useState(16);
    const [radius, setRadius] = useState(16);
    const [columns, setColumns] = useState(3);

    const cardStyles = {
        glass: "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white",
        minimal: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm",
        elevated: "bg-white dark:bg-zinc-900 shadow-2xl scale-100 hover:scale-[1.02] transition-transform",
        bordered: "bg-transparent border-2 border-indigo-500/30 dark:border-indigo-400/30",
        solid: "bg-indigo-600 text-white border-none shadow-lg shadow-indigo-500/20"
    };

    const copyCode = (variant: string) => {
        toast.success(`Copied ${variant} style classes!`);
    };

    return (
        <Card className="w-full max-w-6xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Layout className="w-6 h-6 text-indigo-500" />
                    Card Layout Visualizer
                </CardTitle>
                <CardDescription>Test and compare different card component styles and grid layouts</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                        <div className="space-y-2">
                            <Label>Style Preset</Label>
                            <Select value={style} onValueChange={setStyle}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="glass">Glassmorphism</SelectItem>
                                    <SelectItem value="minimal">Minimalist</SelectItem>
                                    <SelectItem value="elevated">Elevated Shadow</SelectItem>
                                    <SelectItem value="bordered">Bold Border</SelectItem>
                                    <SelectItem value="solid">Solid Accent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Grid Columns: {columns}</Label>
                            <Slider value={[columns]} min={1} max={4} onValueChange={(v) => setColumns(v[0])} />
                        </div>
                        <div className="space-y-2">
                            <Label>Grid Gap: {gap}px</Label>
                            <Slider value={[gap]} min={8} max={40} onValueChange={(v) => setGap(v[0])} />
                        </div>
                        <div className="space-y-2">
                            <Label>Border Radius: {radius}px</Label>
                            <Slider value={[radius]} min={0} max={40} onValueChange={(v) => setRadius(v[0])} />
                        </div>
                    </div>

                    <div
                        className={`p-12 rounded-3xl min-h-[400px] flex items-center justify-center ${style === 'glass' ? 'bg-gradient-to-br from-indigo-500 to-rose-500' : 'bg-zinc-100 dark:bg-zinc-950 border-2 border-dashed border-zinc-200 dark:border-zinc-800'}`}
                    >
                        <div
                            className="w-full grid gap-4"
                            style={{
                                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                                gap: `${gap}px`
                            }}
                        >
                            {[...Array(columns * 2)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`p-6 transition-all duration-300 ${cardStyles[style as keyof typeof cardStyles]}`}
                                    style={{ borderRadius: `${radius}px`, padding: `${padding}px` }}
                                >
                                    <div className="w-10 h-10 rounded-full bg-zinc-400/20 mb-4 flex items-center justify-center">
                                        <Eye className="w-5 h-5 opacity-60" />
                                    </div>
                                    <h4 className="font-bold mb-2">Cool Feature {i + 1}</h4>
                                    <p className="text-xs opacity-70 leading-relaxed">
                                        Experimenting with {style} style at {radius}px radius. Looks pretty clean!
                                    </p>
                                    <div className="mt-6 pt-4 border-t border-current/10 flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Detail</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-current/10" onClick={() => copyCode(style)}>
                                            <Copy className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardLayoutVisualizer;
