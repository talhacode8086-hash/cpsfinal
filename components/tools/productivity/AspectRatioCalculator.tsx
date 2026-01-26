'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Link, Unlink } from 'lucide-react';

export default function AspectRatioCalculator() {
    const [width, setWidth] = useState<number>(1920);
    const [height, setHeight] = useState<number>(1080);
    const [locked, setLocked] = useState(true);

    const ratio = width / height;

    const handleWidthChange = (val: number) => {
        setWidth(val);
        if (locked) setHeight(Math.round(val / ratio));
    };

    const handleHeightChange = (val: number) => {
        setHeight(val);
        if (locked) setWidth(Math.round(val * ratio));
    };

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const commonDivisor = gcd(width, height);
    const simpleRatio = `${width / commonDivisor}:${height / commonDivisor}`;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Monitor className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Aspect Ratio Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Calculate dimensions and ratios for video, images, or screens.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Width (px)</label>
                        <Input type="number" className="h-14 rounded-2xl text-xl font-black text-center" value={width} onChange={e => handleWidthChange(parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="flex justify-center">
                        <Button variant="ghost" size="icon" className={`h-12 w-12 rounded-full border ${locked ? 'bg-primary/10 border-primary text-primary' : 'bg-muted border-border'}`} onClick={() => setLocked(!locked)}>
                            {locked ? <Link className="h-5 w-5" /> : <Unlink className="h-5 w-5" />}
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Height (px)</label>
                        <Input type="number" className="h-14 rounded-2xl text-xl font-black text-center" value={height} onChange={e => handleHeightChange(parseInt(e.target.value) || 0)} />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-10 rounded-[2.5rem] bg-muted/50 border border-primary/10 text-center space-y-2">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Simplified Ratio</p>
                        <h2 className="text-5xl font-black text-primary">{simpleRatio}</h2>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-primary text-primary-foreground text-center space-y-2 shadow-2xl">
                        <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Decimal Ratio</p>
                        <h2 className="text-5xl font-black">{ratio.toFixed(3)}</h2>
                    </div>
                </div>

                <div className="pt-6 border-t border-primary/5">
                    <p className="text-xs text-muted-foreground text-center">
                        Common Ratios: 16:9 (HD), 4:3 (SD), 21:9 (Ultrawide), 1:1 (Square), 9:16 (Portrait)
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
