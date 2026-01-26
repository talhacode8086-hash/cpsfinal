'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function MonitorPPICalculator() {
    const [width, setWidth] = useState('1920');
    const [height, setHeight] = useState('1080');
    const [size, setSize] = useState('24');

    const diagonalPixels = Math.sqrt(Math.pow(parseInt(width) || 0, 2) + Math.pow(parseInt(height) || 0, 2));
    const ppi = size ? (diagonalPixels / (parseFloat(size) || 1)).toFixed(1) : '0';

    const dotPitch = ppi !== '0' ? (25.4 / parseFloat(ppi)).toFixed(4) : '0';
    const totalPixels = ((parseInt(width) || 0) * (parseInt(height) || 0) / 1000000).toFixed(2);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Monitor className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Monitor PPI Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Calculate Pixel Density and clarity specs for your display.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label>Width (Pixels)</Label>
                        <Input value={width} onChange={(e) => setWidth(e.target.value)} type="number" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label>Height (Pixels)</Label>
                        <Input value={height} onChange={(e) => setHeight(e.target.value)} type="number" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label>Diagonal Size (Inches)</Label>
                        <Input value={size} onChange={(e) => setSize(e.target.value)} type="number" step="0.1" className="h-12 rounded-xl border-primary/30" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SpecCard label="Pixel Density" value={ppi} unit="PPI" sub="Clarity score" primary />
                    <SpecCard label="Dot Pitch" value={dotPitch} unit="mm" sub="Distance between pixels" />
                    <SpecCard label="Resolution" value={totalPixels} unit="MP" sub="Total sensor load" />
                </div>

                <div className="p-6 rounded-2xl bg-muted/20 border border-primary/5 space-y-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" /> Visual Benchmarks
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between p-3 rounded-xl bg-background/50 border border-primary/5">
                            <span className="text-muted-foreground">Standard 1080p (24")</span>
                            <span className="font-bold">92 PPI</span>
                        </div>
                        <div className="flex justify-between p-3 rounded-xl bg-background/50 border border-primary/5">
                            <span className="text-muted-foreground">MacBook Retina (14")</span>
                            <span className="font-bold">254 PPI</span>
                        </div>
                        <div className="flex justify-between p-3 rounded-xl bg-background/50 border border-primary/5">
                            <span className="text-muted-foreground">Standard 1440p (27")</span>
                            <span className="font-bold">109 PPI</span>
                        </div>
                        <div className="flex justify-between p-3 rounded-xl bg-background/50 border border-primary/5">
                            <span className="text-muted-foreground">Modern 4K (27")</span>
                            <span className="font-bold">163 PPI</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Custom element helper
function SpecCard({ label, value, unit, sub, primary }: any) {
    return (
        <div className={`p-8 rounded-2xl border text-center space-y-2 ${primary ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/10' : 'bg-muted/30 border-primary/5'
            }`}>
            <p className={`text-[10px] font-black uppercase tracking-widest ${primary ? 'text-white/70' : 'text-primary'}`}>{label}</p>
            <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black">{value}</span>
                <span className="text-sm font-bold opacity-70">{unit}</span>
            </div>
            <p className={`text-[10px] ${primary ? 'text-white/60' : 'text-muted-foreground'}`}>{sub}</p>
        </div>
    );
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'spec-card': any;
        }
    }
}
// Using real components since intrinsic elements aren't defined here
const specCard = SpecCard;
