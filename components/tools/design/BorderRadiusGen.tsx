'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MousePointer2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function BorderRadiusGen() {
    const [tl, setTl] = useState(30);
    const [tr, setTr] = useState(70);
    const [br, setBr] = useState(40);
    const [bl, setBl] = useState(60);

    // Fancy mode (8 values)
    const [tl2, setTl2] = useState(70);
    const [tr2, setTr2] = useState(30);
    const [br2, setBr2] = useState(60);
    const [bl2, setBl2] = useState(40);

    const [copied, setCopied] = useState(false);

    const radius = `${tl}% ${tr}% ${br}% ${bl}% / ${tl2}% ${tr2}% ${br2}% ${bl2}%`;
    const cssCode = `border-radius: ${radius};`;

    const copyCode = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <MousePointer2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Fancy Border Radius</CardTitle>
                <p className="text-muted-foreground mt-2">Generate organic, blob-like CSS shapes for modern web designs.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
                    <div className="grid grid-cols-2 gap-8 w-full md:w-auto">
                        <CornerControl label="Top Left" v1={tl} v2={tl2} onChange1={setTl} onChange2={setTl2} />
                        <CornerControl label="Top Right" v1={tr} v2={tr2} onChange1={setTr} onChange2={setTr2} />
                        <CornerControl label="Bottom Right" v1={br} v2={br2} onChange1={setBr} onChange2={setBr2} />
                        <CornerControl label="Bottom Left" v1={bl} v2={bl2} onChange1={setBl} onChange2={setBl2} />
                    </div>

                    <div
                        className="w-64 h-64 bg-primary text-white shadow-3xl shadow-primary/30 transition-all duration-500 ease-in-out flex items-center justify-center p-8"
                        style={{ borderRadius: radius }}
                    >
                        <span className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Organic Shape</span>
                    </div>
                </div>

                <div className="w-full max-w-xl mx-auto space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-primary">
                        <span>Generated CSS Code</span>
                        <button onClick={copyCode} className="flex items-center gap-2 text-primary hover:opacity-100 transition-opacity">
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            {copied ? 'COPIED!' : 'COPY CSS'}
                        </button>
                    </div>
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 font-mono text-sm break-all leading-relaxed">
                        {cssCode}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function CornerControl({ label, v1, v2, onChange1, onChange2 }: any) {
    return (
        <div className="space-y-4 text-left">
            <p className="text-[10px] font-black uppercase text-primary mb-2">{label}</p>
            <Slider value={[v1]} onValueChange={(v) => onChange1(v[0])} min={0} max={100} className="w-32" />
            <Slider value={[v2]} onValueChange={(v) => onChange2(v[0])} min={0} max={100} className="w-32 opacity-50" />
        </div>
    );
}
