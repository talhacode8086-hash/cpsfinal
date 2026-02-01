'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Type } from 'lucide-react';
import { toast } from 'sonner';

const CSSInputStylizer = () => {
    const [padding, setPadding] = useState(12);
    const [radius, setRadius] = useState(8);
    const [borderWidth, setBorderWidth] = useState(2);
    const [borderColor, setBorderColor] = useState('#e4e4e7');
    const [focusColor, setFocusColor] = useState('#6366f1');
    const [fontSize, setFontSize] = useState(14);

    const cssCode = useMemo(() => {
        return `.custom-input {
  width: 100%;
  padding: ${padding}px;
  font-size: ${fontSize}px;
  border: ${borderWidth}px solid ${borderColor};
  border-radius: ${radius}px;
  outline: none;
  transition: all 0.2s ease;
}

.custom-input:focus {
  border-color: ${focusColor};
  box-shadow: 0 0 0 4px ${focusColor}33;
}`;
    }, [padding, radius, borderWidth, borderColor, focusColor, fontSize]);

    const copyCode = () => {
        navigator.clipboard.writeText(cssCode);
        toast.success('Input CSS copied!');
    };

    return (
        <Card className="w-full max-w-4xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <style dangerouslySetInnerHTML={{ __html: cssCode }} />
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Type className="w-6 h-6 text-indigo-500" />
                    CSS Input Stylizer
                </CardTitle>
                <CardDescription>Custom style generator for text inputs with focus states</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Padding: {padding}px</Label>
                                    <Slider value={[padding]} min={4} max={24} onValueChange={(v) => setPadding(v[0])} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Radius: {radius}px</Label>
                                    <Slider value={[radius]} min={0} max={30} onValueChange={(v) => setRadius(v[0])} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Border: {borderWidth}px</Label>
                                    <Slider value={[borderWidth]} min={0} max={6} onValueChange={(v) => setBorderWidth(v[0])} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Font Size: {fontSize}px</Label>
                                    <Slider value={[fontSize]} min={12} max={24} onValueChange={(v) => setFontSize(v[0])} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Border Color</Label>
                                    <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="w-full h-10 p-1 bg-transparent rounded" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Focus Color</Label>
                                    <input type="color" value={focusColor} onChange={(e) => setFocusColor(e.target.value)} className="w-full h-10 p-1 bg-transparent rounded" />
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex-1 min-h-[200px] flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                            <div className="w-full max-w-sm space-y-2">
                                <Label className="text-xs opacity-60">Preview Input</Label>
                                <input type="text" className="custom-input" placeholder="Type something..." />
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

export default CSSInputStylizer;
