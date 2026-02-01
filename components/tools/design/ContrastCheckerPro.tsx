'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, Info, ShieldCheck } from 'lucide-react';

const ContrastCheckerPro = () => {
    const [fgColor, setFgColor] = useState('#ffffff');
    const [bgColor, setBgColor] = useState('#6366f1');

    const getLuminance = (hex: string) => {
        const rgb = hex.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)) || [0, 0, 0];
        const a = rgb.map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const contrastRatio = useMemo(() => {
        const l1 = getLuminance(fgColor);
        const l2 = getLuminance(bgColor);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        return ratio.toFixed(2);
    }, [fgColor, bgColor]);

    const ratio = parseFloat(contrastRatio);

    const results = {
        aaNormal: ratio >= 4.5,
        aaLarge: ratio >= 3,
        aaaNormal: ratio >= 7,
        aaaLarge: ratio >= 4.5,
    };

    return (
        <Card className="w-full max-w-4xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                    Contrast Checker Pro
                </CardTitle>
                <CardDescription>Verify WCAG 2.1 accessibility standards for color combinations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Foreground (Text)</Label>
                            <div className="flex gap-2">
                                <Input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="font-mono" />
                                <Input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-12 h-10 p-1" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Background</Label>
                            <div className="flex gap-2">
                                <Input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="font-mono" />
                                <Input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 h-10 p-1" />
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl flex flex-col items-center justify-center gap-4 border border-zinc-200 dark:border-zinc-800 shadow-inner overflow-hidden relative">
                            <div className="absolute inset-0 z-0" style={{ backgroundColor: bgColor }} />
                            <div className="relative z-10 text-center space-y-2">
                                <h4 className="text-4xl font-black" style={{ color: fgColor }}>Contrast Ratio</h4>
                                <div className="text-6xl font-black tabular-nums" style={{ color: fgColor }}>
                                    {contrastRatio}:1
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid gap-4">
                            {[
                                { label: 'WCAG AA Normal Text', status: results.aaNormal, req: '4.5:1' },
                                { label: 'WCAG AA Large Text', status: results.aaLarge, req: '3.0:1' },
                                { label: 'WCAG AAA Normal Text', status: results.aaaNormal, req: '7.0:1' },
                                { label: 'WCAG AAA Large Text', status: results.aaaLarge, req: '4.5:1' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                                    <div>
                                        <p className="font-bold text-sm">{item.label}</p>
                                        <p className="text-xs text-muted-foreground">Requires {item.req}</p>
                                    </div>
                                    {item.status ? (
                                        <div className="flex items-center gap-1 text-green-500 font-bold">
                                            <CheckCircle2 className="w-5 h-5" /> PASS
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-red-500 font-bold">
                                            <XCircle className="w-5 h-5" /> FAIL
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-700 dark:text-blue-300 text-xs flex gap-3">
                            <Info className="w-5 h-5 shrink-0" />
                            <p>Large text is defined as 18pt (24px) or larger, or 14pt (18.67px) and bold. AA is the minimum standard for most web projects.</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800" style={{ backgroundColor: bgColor, color: fgColor }}>
                    <h3 className="text-xl font-bold mb-4">Live Preview Container</h3>
                    <p className="mb-4">This is how your text combination looks in a real-world scenario. Accessibility is key to providing a great user experience for everyone, including those with visual impairments.</p>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 rounded-lg border-2 font-bold" style={{ borderColor: fgColor }}>Button Ghost</button>
                        <button className="px-6 py-2 rounded-lg font-bold" style={{ backgroundColor: fgColor, color: bgColor }}>Button Solid</button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ContrastCheckerPro;
