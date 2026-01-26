'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Copy, Shuffle } from 'lucide-react';
import { toast } from 'sonner';

export default function GradientGenerator() {
    const [color1, setColor1] = useState('#6366f1');
    const [color2, setColor2] = useState('#a855f7');
    const [angle, setAngle] = useState(135);

    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`background: ${gradient};`);
        toast.success('CSS Code copied!');
    };

    const randomize = () => {
        const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setColor1(randomHex());
        setColor2(randomHex());
        setAngle(Math.floor(Math.random() * 360));
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">CSS Gradient Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Design smooth, modern gradients and export the CSS code.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="h-64 rounded-3xl shadow-2xl transition-all duration-500" style={{ background: gradient }} />

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Start Color</label>
                        <div className="flex gap-2">
                            <div className="w-12 h-12 rounded-xl border border-primary/20" style={{ background: color1 }} />
                            <Input value={color1} onChange={e => setColor1(e.target.value)} className="font-mono h-12 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">End Color</label>
                        <div className="flex gap-2">
                            <div className="w-12 h-12 rounded-xl border border-primary/20" style={{ background: color2 }} />
                            <Input value={color2} onChange={e => setColor2(e.target.value)} className="font-mono h-12 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Angle: {angle}°</label>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            className="w-full h-12 accent-primary"
                            value={angle}
                            onChange={e => setAngle(parseInt(e.target.value))}
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button className="flex-1 h-12 rounded-xl font-bold shadow-lg shadow-primary/20" onClick={handleCopy}>
                        <Copy className="mr-2 h-5 w-5" />
                        Copy CSS Code
                    </Button>
                    <Button variant="outline" className="h-12 w-12 rounded-xl" onClick={randomize}>
                        <Shuffle className="h-5 w-5" />
                    </Button>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border border-primary/5 font-mono text-sm break-all">
                    background: {gradient};
                </div>
            </CardContent>
        </Card>
    );
}
