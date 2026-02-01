'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, ToggleLeft } from 'lucide-react';
import { toast } from 'sonner';

const CSSCheckboxStylizer = () => {
    const [size, setSize] = useState(20);
    const [color, setColor] = useState('#6366f1');
    const [radius, setRadius] = useState(4);
    const [borderWidth, setBorderWidth] = useState(2);

    const cssCode = useMemo(() => {
        return `.custom-checkbox {
  appearance: none;
  width: ${size}px;
  height: ${size}px;
  border: ${borderWidth}px solid #d1d5db;
  border-radius: ${radius}px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.custom-checkbox:checked {
  background-color: ${color};
  border-color: ${color};
}

.custom-checkbox:checked::after {
  content: "";
  position: absolute;
  left: 35%;
  top: 15%;
  width: 25%;
  height: 50%;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}`;
    }, [size, color, radius, borderWidth]);

    const copyCode = () => {
        navigator.clipboard.writeText(cssCode);
        toast.success('Checkbox CSS copied!');
    };

    return (
        <Card className="w-full max-w-4xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <style dangerouslySetInnerHTML={{ __html: cssCode }} />
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <ToggleLeft className="w-6 h-6 text-indigo-500" />
                    CSS Checkbox Stylizer
                </CardTitle>
                <CardDescription>Design custom checkboxes without external image dependencies</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div className="space-y-2">
                                <Label>Size: {size}px</Label>
                                <Slider value={[size]} min={16} max={40} onValueChange={(v) => setSize(v[0])} />
                            </div>
                            <div className="space-y-2">
                                <Label>Border Radius: {radius}px</Label>
                                <Slider value={[radius]} min={0} max={20} onValueChange={(v) => setRadius(v[0])} />
                            </div>
                            <div className="space-y-2">
                                <Label>Checked Color</Label>
                                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 p-1 bg-transparent rounded" />
                            </div>
                            <div className="space-y-2">
                                <Label>Border: {borderWidth}px</Label>
                                <Slider value={[borderWidth]} min={1} max={4} onValueChange={(v) => setBorderWidth(v[0])} />
                            </div>
                        </section>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex-1 min-h-[200px] flex items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="custom-checkbox" defaultChecked />
                                <Label className="cursor-pointer">Custom Checkbox</Label>
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

export default CSSCheckboxStylizer;
