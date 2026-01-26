'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function GlassmorphismPro() {
    const [blur, setBlur] = useState(16);
    const [transparency, setTransparency] = useState(0.2);
    const [saturation, setSaturation] = useState(180);
    const [border, setBorder] = useState(20);
    const [copied, setCopied] = useState(false);

    const cssCode = `background: rgba(255, 255, 255, ${transparency});\nbackdrop-filter: blur(${blur}px) saturate(${saturation}%);\n-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);\nborder: 1px solid rgba(255, 255, 255, ${border / 100});\nborder-radius: 24px;`;

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Layers className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Glassmorphism Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Design premium frosted-glass effects with advanced backdrop filters.</p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col lg:flex-row min-h-[500px]">
                {/* Controls */}
                <div className="w-full lg:w-96 bg-muted/5 p-8 border-b lg:border-b-0 lg:border-r border-primary/5 space-y-10">
                    <ParamSlider label="Backdrop Blur" value={blur} max={40} unit="px" onChange={setBlur} />
                    <ParamSlider label="Transparency" value={transparency} max={1} step={0.01} unit="" onChange={setTransparency} />
                    <ParamSlider label="Saturation" value={saturation} max={250} min={100} unit="%" onChange={setSaturation} />
                    <ParamSlider label="Border Opacity" value={border} max={100} unit="%" onChange={setBorder} />
                </div>

                {/* Preview */}
                <div className="relative flex-1 p-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center gap-16">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20 pointer-events-none" />

                    <div
                        className="w-64 h-64 shadow-2xl transition-all duration-300 relative z-10 flex items-center justify-center text-center p-8"
                        style={{
                            background: `rgba(255, 255, 255, ${transparency})`,
                            backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                            WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                            border: `1px solid rgba(255, 255, 255, ${border / 100})`,
                            borderRadius: '24px'
                        }}
                    >
                        <p className="text-white font-black uppercase tracking-[0.3em] opacity-40 text-xs">Glass Layout</p>
                    </div>

                    <div className="w-full max-w-xl space-y-4 relative z-10">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-white tracking-widest opacity-70">
                            <span>CSS Filter Rules</span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(cssCode);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-300" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'COPIED' : 'COPY'}
                            </button>
                        </div>
                        <pre className="p-8 rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-white/20 text-white font-mono text-xs leading-relaxed overflow-x-auto">
                            {cssCode}
                        </pre>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ParamSlider({ label, value, max, min = 0, step = 1, unit, onChange }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary/60">
                <span>{label}</span>
                <span>{value}{unit}</span>
            </div>
            <Slider value={[value]} onValueChange={(v) => onChange(v[0])} max={max} min={min} step={step} />
        </div>
    );
}
