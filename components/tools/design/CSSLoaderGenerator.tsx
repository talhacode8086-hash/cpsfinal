'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const CSSLoaderGenerator = () => {
    const [loaderType, setLoaderType] = useState('spinner');
    const [size, setSize] = useState(48);
    const [color, setColor] = useState('#6366f1');
    const [speed, setSpeed] = useState(1);

    const loaderData = {
        spinner: {
            html: '<div className="loader"></div>',
            css: `.loader {
  width: ${size}px;
  height: ${size}px;
  border: ${size / 8}px solid #f3f3f3;
  border-top: ${size / 8}px solid ${color};
  border-radius: 50%;
  animation: spin ${speed}s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`
        },
        dots: {
            html: '<div className="loader"><span></span><span></span><span></span></div>',
            css: `.loader {
  display: flex;
  gap: ${size / 6}px;
}
.loader span {
  width: ${size / 4}px;
  height: ${size / 4}px;
  background-color: ${color};
  border-radius: 50%;
  animation: bounce ${speed}s infinite ease-in-out;
}
.loader span:nth-child(2) { animation-delay: ${speed / 4}s; }
.loader span:nth-child(3) { animation-delay: ${speed / 2}s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}`
        },
        bar: {
            html: '<div className="loader"></div>',
            css: `.loader {
  width: ${size * 2}px;
  height: ${size / 6}px;
  background-color: #f3f3f3;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.loader::after {
  content: "";
  position: absolute;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: ${color};
  animation: loading ${speed}s linear infinite;
}

@keyframes loading {
  0% { left: -100%; }
  100% { left: 100%; }
}`
        }
    };

    const currentLoader = loaderData[loaderType as keyof typeof loaderData];

    const copyCode = () => {
        const code = `/* HTML */\n${currentLoader.html}\n\n/* CSS */\n${currentLoader.css}`;
        navigator.clipboard.writeText(code);
        toast.success('Loader code copied!');
    };

    return (
        <Card className="w-full max-w-4xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <style dangerouslySetInnerHTML={{ __html: currentLoader.css }} />
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                    CSS Loader Generator
                </CardTitle>
                <CardDescription>Create lightweight, CSS-only loading indicators</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div className="space-y-2">
                                <Label>Loader Type</Label>
                                <Select value={loaderType} onValueChange={setLoaderType}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="spinner">Classic Spinner</SelectItem>
                                        <SelectItem value="dots">Bouncing Dots</SelectItem>
                                        <SelectItem value="bar">Progress Bar</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Size: {size}px</Label>
                                <Slider value={[size]} min={20} max={100} onValueChange={(v) => setSize(v[0])} />
                            </div>
                            <div className="space-y-2">
                                <Label>Color</Label>
                                <div className="flex gap-2">
                                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-10 p-1 bg-transparent" />
                                    <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 bg-zinc-50 dark:bg-zinc-800 border rounded px-3 text-sm font-mono" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Animation Speed: {speed}s</Label>
                                <Slider value={[speed]} min={0.5} max={3} step={0.1} onValueChange={(v) => setSpeed(v[0])} />
                            </div>
                        </section>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex-1 min-h-[200px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                            <div dangerouslySetInnerHTML={{ __html: currentLoader.html }} />
                        </div>
                        <div className="relative group">
                            <pre className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-x-auto text-[10px] font-mono border dark:border-zinc-700 max-h-[150px]">
                                <code>{currentLoader.css}</code>
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

export default CSSLoaderGenerator;
