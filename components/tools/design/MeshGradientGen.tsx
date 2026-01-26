'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MeshGradientGen() {
    const [colors, setColors] = useState(['#ff0080', '#7928ca', '#ff4d4d', '#f9cb28']);
    const [copied, setCopied] = useState(false);

    const generateMesh = () => {
        const newColors = Array.from({ length: 4 }).map(() => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`);
        setColors(newColors);
    };

    const cssCode = `background-color: ${colors[0]};\nbackground-image:\n  radial-gradient(at 0% 0%, ${colors[0]} 0px, transparent 50%),\n  radial-gradient(at 50% 0%, ${colors[1]} 0px, transparent 50%),\n  radial-gradient(at 100% 0%, ${colors[2]} 0px, transparent 50%),\n  radial-gradient(at 0% 100%, ${colors[3]} 0px, transparent 50%);`;

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Palette className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">CSS Mesh Gradient Gen</CardTitle>
                <p className="text-muted-foreground mt-2">Design stunning, liquid-style mesh gradients for high-end web backgrounds.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div
                        className="w-full lg:w-[500px] h-[400px] rounded-[3.5rem] shadow-3xl overflow-hidden animate-in zoom-in duration-700 relative"
                        style={{
                            backgroundColor: colors[0],
                            backgroundImage: `
                                radial-gradient(at 0% 0%, ${colors[0]} 0px, transparent 50%),
                                radial-gradient(at 50% 0%, ${colors[1]} 0px, transparent 50%),
                                radial-gradient(at 100% 0%, ${colors[2]} 0px, transparent 50%),
                                radial-gradient(at 0% 100%, ${colors[3]} 0px, transparent 50%)
                            `
                        }}
                    >
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
                    </div>

                    <div className="flex-1 space-y-8">
                        <section className="space-y-4">
                            <label className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">Current Palette</label>
                            <div className="grid grid-cols-2 gap-4">
                                {colors.map((c, i) => (
                                    <div key={i} className="flex gap-3 items-center p-3 rounded-2xl bg-muted/20 border border-primary/5">
                                        <div className="w-10 h-10 rounded-xl shadow-lg" style={{ backgroundColor: c }} />
                                        <input
                                            value={c}
                                            onChange={(e) => {
                                                const newColors = [...colors];
                                                newColors[i] = e.target.value;
                                                setColors(newColors);
                                            }}
                                            className="bg-transparent font-mono text-xs w-20 outline-none uppercase font-bold"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="flex gap-4">
                            <Button onClick={generateMesh} size="lg" className="h-16 flex-1 rounded-2xl font-black text-lg shadow-xl shadow-primary/20">
                                <RefreshCw className="mr-2 h-5 w-5" /> Randomize
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    navigator.clipboard.writeText(cssCode);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="h-16 px-8 rounded-2xl border-2 border-primary/10"
                            >
                                {copied ? <Check className="text-green-500" /> : <Copy />}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <p className="text-[10px] font-black uppercase text-primary tracking-[0.3em] opacity-40">Generated CSS Source</p>
                    <pre className="p-8 rounded-[3rem] bg-muted/20 border border-primary/10 font-mono text-xs overflow-x-auto leading-relaxed">
                        {cssCode}
                    </pre>
                </div>
            </CardContent>
        </Card>
    );
}
