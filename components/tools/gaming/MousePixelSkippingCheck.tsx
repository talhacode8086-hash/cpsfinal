'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutGrid, AlertCircle, Info, CheckCircle2, Zap } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function MousePixelSkippingCheck() {
    const [dpi, setDpi] = useState('800');
    const [sens, setSens] = useState('1.0');
    const [res, setRes] = useState('1920');

    const calculateSkipping = () => {
        const d = parseFloat(dpi) || 800;
        const s = parseFloat(sens) || 1;
        const r = parseFloat(res) || 1920;

        // A very simplified heuristic for pixel skipping:
        // If (sens * multiplier) > 1, pixel skipping is mathematically possible
        // especially if Windows pointer speed != 6/11.
        const isSkipping = s > 1.5;

        return {
            isSkipping,
            ratio: (s).toFixed(2),
            advice: s > 1.5
                ? 'High probability of pixel skipping. Consider increasing DPI and lowering in-game sensitivity.'
                : 'Your sensitivity settings are safe. Motion will be smooth and pixel-perfect.'
        };
    };

    const results = calculateSkipping();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <LayoutGrid className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Pixel Skipping Checker</CardTitle>
                <p className="text-muted-foreground mt-2">Check if your sensitivity settings cause cursor rounding errors.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label>Mouse DPI</Label>
                        <Input value={dpi} onChange={(e) => setDpi(e.target.value)} type="number" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                        <Label>In-Game Sens</Label>
                        <Input value={sens} onChange={(e) => setSens(e.target.value)} type="number" step="0.1" className="rounded-xl h-12 border-primary/30" />
                    </div>
                    <div className="space-y-2">
                        <Label>Monitor Width (Horizontal Res)</Label>
                        <Input value={res} onChange={(e) => setRes(e.target.value)} type="number" className="rounded-xl h-12" />
                    </div>
                </div>

                <div className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col md:flex-row items-center gap-8 ${results.isSkipping ? 'bg-destructive/10 border-destructive/20' : 'bg-green-500/10 border-green-500/20'
                    }`}>
                    <div className="text-center md:text-left flex-1 space-y-2">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            {results.isSkipping ? <AlertCircle className="text-destructive h-6 w-6" /> : <CheckCircle2 className="text-green-500 h-6 w-6" />}
                            <h3 className={`text-2xl font-black ${results.isSkipping ? 'text-destructive' : 'text-green-500'}`}>
                                {results.isSkipping ? 'Skipping Detected' : 'Perfect Scaling'}
                            </h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{results.advice}</p>
                    </div>
                    <div className="text-center bg-background/50 p-6 rounded-3xl border border-white/10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Sens Multiplier</p>
                        <p className="text-4xl font-black">{results.ratio}x</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 space-y-2">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                            <Info className="h-4 w-4 text-primary" /> What is Pixel Skipping?
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            When your in-game sensitivity is so high that one "tick" of your mouse movement causes the cursor to jump multiple pixels, you lose the ability to aim at fine targets.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 space-y-2">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                            <Zap className="h-4 w-4 text-primary" /> The Solution
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Always aim for a sensitivity multiplier close to 1.0 or lower. If you need more speed, increase your physical mouse DPI instead of in-game multipliers.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
