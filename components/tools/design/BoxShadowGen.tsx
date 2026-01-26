'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Copy, Check, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function BoxShadowGen() {
    const [hOffset, setHOffset] = useState(0);
    const [vOffset, setVOffset] = useState(15);
    const [blur, setBlur] = useState(30);
    const [spread, setSpread] = useState(0);
    const [opacity, setOpacity] = useState(0.1);
    const [color, setColor] = useState('#000000');
    const [inset, setInset] = useState(false);

    const [copied, setCopied] = useState(false);

    const shadowStr = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    const cssCode = `box-shadow: ${shadowStr};`;

    const copyCode = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Layers className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Box Shadow Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Design professional, realistic CSS shadows with a visual playground.</p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col lg:flex-row">
                {/* Controls */}
                <div className="w-full lg:w-96 bg-muted/5 p-8 border-b lg:border-b-0 lg:border-r border-primary/5 space-y-8">
                    <section className="space-y-4">
                        <LabelSlider label="Horizontal Offset" value={hOffset} min={-100} max={100} onChange={setHOffset} />
                        <LabelSlider label="Vertical Offset" value={vOffset} min={-100} max={100} onChange={setVOffset} />
                        <LabelSlider label="Blur Radius" value={blur} min={0} max={150} onChange={setBlur} />
                        <LabelSlider label="Spread Radius" value={spread} min={-50} max={100} onChange={setSpread} />
                        <LabelSlider label="Opacity" value={opacity} min={0} max={1} step={0.01} onChange={setOpacity} />
                    </section>

                    <div className="space-y-4 pt-4 border-t border-primary/5">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-primary">Inset Shadow</span>
                            <Button variant={inset ? "default" : "outline"} size="sm" onClick={() => setInset(!inset)} className="rounded-xl px-6">
                                {inset ? 'ON' : 'OFF'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 p-16 flex flex-col items-center justify-center gap-16 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                    <div
                        className="w-64 h-64 bg-background rounded-3xl border border-primary/5 flex items-center justify-center transition-all duration-300"
                        style={{ boxShadow: shadowStr }}
                    >
                        <Sliders className="h-12 w-12 text-primary opacity-20" />
                    </div>

                    <div className="w-full max-w-xl space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-primary">
                            <span>Generated CSS Code</span>
                            <button onClick={copyCode} className="flex items-center gap-2 text-primary hover:opacity-100 transition-opacity">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'COPIED!' : 'COPY CODE'}
                            </button>
                        </div>
                        <div className="p-6 rounded-2xl bg-muted/20 border border-primary/10 font-mono text-sm break-all">
                            {cssCode}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function LabelSlider({ label, value, min, max, step = 1, onChange }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-primary opacity-60">
                <span>{label}</span>
                <span>{value}{step < 1 ? '' : 'px'}</span>
            </div>
            <Slider value={[value]} onValueChange={(v) => onChange(v[0])} min={min} max={max} step={step} />
        </div>
    );
}
