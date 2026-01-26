'use client';

import { useState, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export default function ColorContrast() {
    const [fgColor, setFgColor] = useState('#ffffff');
    const [bgColor, setBgColor] = useState('#3b82f6');

    const contrast = useMemo(() => {
        const getRGB = (hex: string) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return [r, g, b].map(v => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
        };

        const getLuminance = (rgb: number[]) => 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

        const l1 = getLuminance(getRGB(fgColor));
        const l2 = getLuminance(getRGB(bgColor));

        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        return ratio;
    }, [fgColor, bgColor]);

    const passes = {
        normalAA: contrast >= 4.5,
        normalAAA: contrast >= 7,
        largeAA: contrast >= 3,
        largeAAA: contrast >= 4.5
    };

    const swapColors = () => {
        setFgColor(bgColor);
        setBgColor(fgColor);
    };

    return (
        <div className="space-y-12">
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label className="font-bold">Foreground Color</Label>
                            <div className="flex gap-2">
                                <div className="w-12 h-12 rounded-xl border-2" style={{ backgroundColor: fgColor }} />
                                <Input
                                    value={fgColor}
                                    onChange={(e) => setFgColor(e.target.value)}
                                    className="rounded-xl h-12 font-mono"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label className="font-bold">Background Color</Label>
                            <div className="flex gap-2">
                                <div className="w-12 h-12 rounded-xl border-2" style={{ backgroundColor: bgColor }} />
                                <Input
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="rounded-xl h-12 font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    <Button variant="secondary" className="w-full rounded-2xl h-12" onClick={swapColors}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Swap Colors
                    </Button>

                    <div className="p-8 rounded-3xl border shadow-lg transition-colors border-none overflow-hidden relative" style={{ backgroundColor: bgColor, color: fgColor }}>
                        <div className="relative z-10 text-center space-y-4">
                            <h3 className="text-4xl font-black">Design Preview</h3>
                            <p className="text-lg opacity-90 max-w-sm mx-auto leading-relaxed">
                                This is an example of how your text elements would look with this color combination.
                            </p>
                            <Button className="rounded-full px-8" style={{ backgroundColor: fgColor, color: bgColor }}>Example Button</Button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center p-8 bg-muted/20 rounded-3xl border-2 border-dashed">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Contrast Ratio</p>
                        <p className="text-7xl font-black tracking-tighter text-primary">{contrast.toFixed(2)}:1</p>
                    </div>

                    <div className="grid gap-4">
                        <ResultRow label="Normal Text (AA)" status={passes.normalAA} min="4.5:1" />
                        <ResultRow label="Normal Text (AAA)" status={passes.normalAAA} min="7.0:1" />
                        <ResultRow label="Large Text (AA)" status={passes.largeAA} min="3.0:1" />
                        <ResultRow label="Large Text (AAA)" status={passes.largeAAA} min="4.5:1" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ResultRow({ label, status, min }: { label: string; status: boolean; min: string }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-card border shadow-sm">
            <div className="flex items-center gap-3">
                {status ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-destructive" />}
                <span className="font-bold">{label}</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Require: {min}</span>
        </div>
    );
}
