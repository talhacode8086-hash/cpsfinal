'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, MousePointer, Info } from 'lucide-react';
import { toast } from 'sonner';

const CSSScrollbarCustomizer = () => {
    const [width, setWidth] = useState(12);
    const [thumbColor, setThumbColor] = useState('#6366f1');
    const [trackColor, setTrackColor] = useState('#f4f4f5');
    const [radius, setRadius] = useState(10);
    const [borderWidth, setBorderWidth] = useState(3);
    const [borderColor, setBorderColor] = useState('#ffffff');

    const cssCode = useMemo(() => {
        return `/* Width */
::-webkit-scrollbar {
  width: ${width}px;
}

/* Track */
::-webkit-scrollbar-track {
  background: ${trackColor};
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: ${thumbColor};
  border-radius: ${radius}px;
  border: ${borderWidth}px solid ${borderColor};
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  filter: brightness(0.85);
}`;
    }, [width, thumbColor, trackColor, radius, borderWidth, borderColor]);

    const copyCode = () => {
        navigator.clipboard.writeText(cssCode);
        toast.success('Scrollbar CSS copied!');
    };

    return (
        <Card className="w-full max-w-5xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: `.scrollbar-preview::-webkit-scrollbar { width: ${width}px; } .scrollbar-preview::-webkit-scrollbar-track { background: ${trackColor}; } .scrollbar-preview::-webkit-scrollbar-thumb { background: ${thumbColor}; border-radius: ${radius}px; border: ${borderWidth}px solid ${borderColor}; } .scrollbar-preview::-webkit-scrollbar-thumb:hover { filter: brightness(0.85); }` }} />
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <MousePointer className="w-6 h-6 text-indigo-500" />
                    CSS Scrollbar Customizer
                </CardTitle>
                <CardDescription>Design custom scrollbars for Webkit browsers (Chrome, Edge, Safari)</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Width: {width}px</Label>
                                    <Slider value={[width]} min={4} max={24} onValueChange={(v) => setWidth(v[0])} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Border Radius: {radius}px</Label>
                                    <Slider value={[radius]} min={0} max={20} onValueChange={(v) => setRadius(v[0])} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Thumb Color</Label>
                                    <div className="flex gap-2">
                                        <Input type="text" value={thumbColor} onChange={(e) => setThumbColor(e.target.value)} className="font-mono h-8 text-xs" />
                                        <Input type="color" value={thumbColor} onChange={(e) => setThumbColor(e.target.value)} className="w-10 h-8 p-1" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Track Color</Label>
                                    <div className="flex gap-2">
                                        <Input type="text" value={trackColor} onChange={(e) => setTrackColor(e.target.value)} className="font-mono h-8 text-xs" />
                                        <Input type="color" value={trackColor} onChange={(e) => setTrackColor(e.target.value)} className="w-10 h-8 p-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Border Width: {borderWidth}px</Label>
                                    <Slider value={[borderWidth]} min={0} max={10} onValueChange={(v) => setBorderWidth(v[0])} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Border Color</Label>
                                    <div className="flex gap-2">
                                        <Input type="text" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="font-mono h-8 text-xs" />
                                        <Input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="w-10 h-8 p-1" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-700 dark:text-amber-300 text-[10px] flex gap-2">
                            <Info className="w-4 h-4 shrink-0" />
                            <p>Note: Custom scrollbars using <code>::-webkit-scrollbar</code> are only supported in Chromium-based browsers and Safari. For Firefox, use <code>scrollbar-width</code> and <code>scrollbar-color</code>.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="scrollbar-preview h-[250px] overflow-y-scroll rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                            <h3 className="text-xl font-bold mb-4">Scroll Area Preview</h3>
                            {[...Array(10)].map((_, i) => (
                                <p key={i} className="mb-4 text-sm text-muted-foreground leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider opacity-70">CSS Snippet</Label>
                            <div className="relative group">
                                <pre className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-x-auto text-[10px] font-mono border dark:border-zinc-700 max-h-[160px]">
                                    <code>{cssCode}</code>
                                </pre>
                                <Button size="sm" variant="secondary" className="absolute top-2 right-2" onClick={copyCode}>
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

export default CSSScrollbarCustomizer;
