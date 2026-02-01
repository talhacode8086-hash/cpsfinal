'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Bookmark } from 'lucide-react';
import { toast } from 'sonner';

const CSSRibbonGenerator = () => {
    const [text, setText] = useState('New');
    const [bgColor, setBgColor] = useState('#f43f5e');
    const [textColor, setTextColor] = useState('#ffffff');
    const [size, setSize] = useState(40);
    const [offset, setOffset] = useState(10);

    const cssCode = useMemo(() => {
        return `.ribbon-container {
  width: 200px;
  height: 200px;
  position: relative;
  background: #eee;
  overflow: hidden;
}

.ribbon {
  width: ${size * 3}px;
  padding: ${size / 5}px 0;
  background-color: ${bgColor};
  color: ${textColor};
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  position: absolute;
  top: ${offset}px;
  right: -${size}px;
  transform: rotate(45deg);
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}`;
    }, [size, bgColor, textColor, offset]);

    const copyCode = () => {
        navigator.clipboard.writeText(cssCode);
        toast.success('Ribbon CSS copied!');
    };

    return (
        <Card className="w-full max-w-4xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <style dangerouslySetInnerHTML={{ __html: cssCode }} />
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Bookmark className="w-6 h-6 text-rose-500" />
                    CSS Ribbon Generator
                </CardTitle>
                <CardDescription>Create decorative corner ribbons for cards and product listing</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div className="space-y-2">
                                <Label>Ribbon Text</Label>
                                <Input value={text} onChange={(e) => setText(e.target.value)} className="bg-zinc-50 dark:bg-zinc-800" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Color</Label>
                                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 p-1 bg-transparent rounded" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Text Color</Label>
                                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-10 p-1 bg-transparent rounded" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Size: {size}px</Label>
                                <Slider value={[size]} min={20} max={60} onValueChange={(v) => setSize(v[0])} />
                            </div>
                            <div className="space-y-2">
                                <Label>Offset: {offset}px</Label>
                                <Slider value={[offset]} min={0} max={50} onValueChange={(v) => setOffset(v[0])} />
                            </div>
                        </section>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex-1 min-h-[250px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
                            <div className="w-48 h-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl relative overflow-hidden shadow-lg">
                                <div className="ribbon">{text}</div>
                                <div className="p-6">
                                    <div className="w-2/3 h-4 bg-zinc-100 dark:bg-zinc-800 rounded mb-2"></div>
                                    <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded mb-1"></div>
                                    <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
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

export default CSSRibbonGenerator;
