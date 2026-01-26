'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scaling, Copy, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PixelToRem() {
    const [pixels, setPixels] = useState('16');
    const [baseSize, setBaseSize] = useState('16');
    const [copied, setCopied] = useState(false);

    const rem = parseFloat(pixels) / parseFloat(baseSize);

    const copyResult = (val: string) => {
        navigator.clipboard.writeText(val);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Scaling className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Pixel to REM Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Convert static PX to accessible REM units for professional web typography.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                    <div className="space-y-4 text-left">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest">Base Font Size (Usually 16px)</label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={baseSize}
                                onChange={(e) => setBaseSize(e.target.value)}
                                className="h-20 text-4xl font-black rounded-3xl bg-muted/10 border-primary/10 pl-8 pr-16"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black opacity-20 text-xl">PX</span>
                        </div>
                    </div>

                    <div className="space-y-4 text-left">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest">Pixel Value to Convert</label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={pixels}
                                onChange={(e) => setPixels(e.target.value)}
                                className="h-20 text-4xl font-black rounded-3xl bg-primary text-white border-none pl-8 pr-16 shadow-2xl shadow-primary/20"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black opacity-50 text-xl">PX</span>
                        </div>
                    </div>
                </div>

                <div className="p-16 rounded-[4rem] bg-background border-2 border-primary/10 flex flex-col items-center justify-center relative group">
                    <div className="absolute top-8 right-8">
                        <Button variant="ghost" size="icon" onClick={() => copyResult(`${rem.toFixed(3)}rem`)} className="h-12 w-12 rounded-xl">
                            {copied ? <Check className="text-green-500" /> : <Copy className="opacity-30 group-hover:opacity-100 transition-opacity" />}
                        </Button>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary opacity-50 mb-4">Resulting REM Value</p>
                    <h3 className="text-8xl font-black text-primary tracking-tighter">
                        {isNaN(rem) ? '0' : rem.toFixed(3)}<span className="text-3xl opacity-30">rem</span>
                    </h3>
                </div>

                <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/5 flex items-center gap-6 text-left">
                    <Info className="h-8 w-8 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        <strong>Why use REM?</strong> Unlike pixels, REM units scale with the user's browser font size settings, which is essential for web accessibility and responsive design.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
