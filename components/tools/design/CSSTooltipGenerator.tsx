'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const CSSTooltipGenerator = () => {
    const [position, setPosition] = useState('top');
    const [bgColor, setBgColor] = useState('#333333');
    const [textColor, setTextColor] = useState('#ffffff');
    const [padding, setPadding] = useState(8);
    const [radius, setRadius] = useState(4);
    const [arrowSize, setArrowSize] = useState(6);

    const cssCode = useMemo(() => {
        const arrowMap: Record<string, string> = {
            top: `bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-${arrowSize}px);`,
            bottom: `top: 100%; left: 50%; transform: translateX(-50%) translateY(${arrowSize}px);`,
            left: `right: 100%; top: 50%; transform: translateY(-50%) translateX(-${arrowSize}px);`,
            right: `left: 100%; top: 50%; transform: translateY(-50%) translateX(${arrowSize}px);`
        };

        const triangleMap: Record<string, string> = {
            top: `bottom: -${arrowSize}px; left: 50%; transform: translateX(-50%); border-top: ${arrowSize}px solid ${bgColor}; border-left: ${arrowSize}px solid transparent; border-right: ${arrowSize}px solid transparent;`,
            bottom: `top: -${arrowSize}px; left: 50%; transform: translateX(-50%); border-bottom: ${arrowSize}px solid ${bgColor}; border-left: ${arrowSize}px solid transparent; border-right: ${arrowSize}px solid transparent;`,
            left: `right: -${arrowSize}px; top: 50%; transform: translateY(-50%); border-left: ${arrowSize}px solid ${bgColor}; border-top: ${arrowSize}px solid transparent; border-bottom: ${arrowSize}px solid transparent;`,
            right: `left: -${arrowSize}px; top: 50%; transform: translateY(-50%); border-right: ${arrowSize}px solid ${bgColor}; border-top: ${arrowSize}px solid transparent; border-bottom: ${arrowSize}px solid transparent;`
        };

        return `.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-text {
  visibility: hidden;
  background-color: ${bgColor};
  color: ${textColor};
  text-align: center;
  padding: ${padding}px ${padding * 1.5}px;
  border-radius: ${radius}px;
  position: absolute;
  z-index: 1;
  white-space: nowrap;
  font-size: 14px;
  ${arrowMap[position]}
}

.tooltip-text::after {
  content: "";
  position: absolute;
  ${triangleMap[position]}
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
}`;
    }, [position, bgColor, textColor, padding, radius, arrowSize]);

    const copyCode = () => {
        navigator.clipboard.writeText(cssCode);
        toast.success('Tooltip CSS copied!');
    };

    return (
        <Card className="w-full max-w-4xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <style dangerouslySetInnerHTML={{ __html: cssCode }} />
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-indigo-500" />
                    CSS Tooltip Generator
                </CardTitle>
                <CardDescription>Generate clean, arrow-tip css tooltips with easy customization</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div className="space-y-2">
                                <Label>Position</Label>
                                <Select value={position} onValueChange={setPosition}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="top">Top</SelectItem>
                                        <SelectItem value="bottom">Bottom</SelectItem>
                                        <SelectItem value="left">Left</SelectItem>
                                        <SelectItem value="right">Right</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Background</Label>
                                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 p-1 bg-transparent rounded" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Text Color</Label>
                                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-10 p-1 bg-transparent rounded" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Padding: {padding}px</Label>
                                <Slider value={[padding]} min={4} max={20} onValueChange={(v) => setPadding(v[0])} />
                            </div>
                            <div className="space-y-2">
                                <Label>Border Radius: {radius}px</Label>
                                <Slider value={[radius]} min={0} max={20} onValueChange={(v) => setRadius(v[0])} />
                            </div>
                        </section>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex-1 min-h-[200px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                            <div className="tooltip-container">
                                <Button variant="outline" className="font-bold">Hover Me</Button>
                                <span className="tooltip-text">I am a tooltip!</span>
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

export default CSSTooltipGenerator;
