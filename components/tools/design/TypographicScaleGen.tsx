'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Type, Copy, Check, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';

export default function TypographicScaleGen() {
    const [baseSize, setBaseSize] = useState(16);
    const [ratio, setRatio] = useState(1.25); // Major Third
    const [copied, setCopied] = useState<number | null>(null);

    const ratios = [
        { name: 'Minor Second', value: 1.067 },
        { name: 'Major Second', value: 1.125 },
        { name: 'Minor Third', value: 1.200 },
        { name: 'Major Third', value: 1.250 },
        { name: 'Perfect Fourth', value: 1.333 },
        { name: 'Augmented Fourth', value: 1.414 },
        { name: 'Perfect Fifth', value: 1.500 },
        { name: 'Golden Ratio', value: 1.618 },
    ];

    const generateScale = () => {
        const scale = [];
        for (let i = 5; i >= -2; i--) {
            scale.push({
                level: i > 0 ? `H${6 - i}` : i === 0 ? 'Body' : `Small ${Math.abs(i)}`,
                size: baseSize * Math.pow(ratio, i),
                key: i
            });
        }
        return scale.reverse();
    };

    const scale = generateScale();

    return (
        <Card className="max-w-5xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Type className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Typographic Scale Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Create harmonious font hierarchies using mathematical ratios.</p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col md:flex-row min-h-[600px]">
                <div className="w-full md:w-80 bg-muted/5 p-8 border-b md:border-b-0 md:border-r border-primary/5 space-y-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-primary">Base Size (px)</label>
                        <Input type="number" value={baseSize} onChange={(e) => setBaseSize(parseInt(e.target.value) || 16)} className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-primary">Scale Ratio</label>
                        <Select value={ratio.toString()} onValueChange={(v) => setRatio(parseFloat(v))}>
                            <SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {ratios.map(r => <SelectItem key={r.value} value={r.value.toString()}>{r.name} ({r.value})</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex-1 p-12 space-y-8 overflow-y-auto">
                    {scale.map((item, idx) => (
                        <div key={item.key} className="group relative flex items-baseline gap-8 border-b border-primary/5 pb-8 hover:bg-primary/5 p-4 rounded-2xl transition-all">
                            <div className="w-24 shrink-0">
                                <p className="text-[10px] font-black uppercase text-primary opacity-40">{item.level}</p>
                                <p className="text-xs font-bold">{item.size.toFixed(2)}px</p>
                            </div>
                            <h2
                                className="flex-1 font-black text-primary overflow-hidden text-ellipsis whitespace-nowrap"
                                style={{ fontSize: `${item.size}px` }}
                            >
                                Harmony in Design
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                    navigator.clipboard.writeText(`${item.size.toFixed(2)}px`);
                                    setCopied(idx);
                                    setTimeout(() => setCopied(null), 2000);
                                }}
                            >
                                {copied === idx ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
