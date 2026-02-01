"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ChevronRight, Info, Waves } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function EMWaveCalculator() {
    const [freq_log, setFreqLog] = useState<number>(14); // log10 of Hz

    const c = 2.99792458e8; // Speed of light m/s
    const h = 6.62607e-34; // Planck constant J·s
    const eV = 1.60217e-19; // eV to Joules

    const waveData = useMemo(() => {
        const f = Math.pow(10, freq_log);
        const lambda = c / f;
        const eJ = h * f;
        const eEV = eJ / eV;

        let label = "Unknown";
        let color = "bg-primary";

        if (f < 1e9) { label = "Radio Waves"; color = "bg-blue-500"; }
        else if (f < 3e11) { label = "Microwaves"; color = "bg-cyan-500"; }
        else if (f < 4e14) { label = "Infrared"; color = "bg-red-400"; }
        else if (f < 7.5e14) { label = "Visible Light"; color = "bg-green-500"; }
        else if (f < 3e16) { label = "Ultraviolet"; color = "bg-purple-500"; }
        else if (f < 3e19) { label = "X-Rays"; color = "bg-amber-500"; }
        else { label = "Gamma Rays"; color = "bg-red-600"; }

        return { f, lambda, eJ, eEV, label, color };
    }, [freq_log]);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Waves className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">EM Wave Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Frequency, Wavelength, and Photon Energy.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Frequency (10^x Hz)</label>
                            <span className="font-mono text-primary font-bold">10^{freq_log.toFixed(2)} Hz</span>
                        </div>
                        <Slider value={[freq_log]} min={2} max={22} step={0.1} onValueChange={([val]) => setFreqLog(val)} />
                        <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" className="h-6 text-[10px]" onClick={() => setFreqLog(6)}>Radio</Button>
                            <Button size="sm" variant="outline" className="h-6 text-[10px]" onClick={() => setFreqLog(10)}>Micro</Button>
                            <Button size="sm" variant="outline" className="h-6 text-[10px]" onClick={() => setFreqLog(14)}>Visible</Button>
                            <Button size="sm" variant="outline" className="h-6 text-[10px]" onClick={() => setFreqLog(18)}>X-Ray</Button>
                        </div>
                    </div>

                    <div className={`p-8 rounded-[2.5rem] ${waveData.color} transition-colors duration-500 text-white shadow-2xl overflow-hidden relative`}>
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Zap className="w-32 h-32" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-80">Spectrum Range</h3>
                            <div className="text-4xl font-black mb-8">{waveData.label}</div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold uppercase opacity-60">Wavelength (λ)</div>
                                    <div className="text-2xl font-mono font-bold">
                                        {waveData.lambda < 0.01
                                            ? waveData.lambda.toExponential(3)
                                            : waveData.lambda.toFixed(3)} m
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold uppercase opacity-60">Photon Energy</div>
                                    <div className="text-2xl font-mono font-bold">{waveData.eEV.toExponential(2)} eV</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-primary/5">
                    <div className="space-y-4">
                        <h4 className="font-bold flex items-center gap-2">
                            <Info className="w-4 h-4 text-primary" /> Wave Relations
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex justify-between font-mono p-2 bg-secondary/10 rounded-lg">
                                <span>c = fλ</span>
                                <span className="text-[10px]">Wavelength Relation</span>
                            </div>
                            <div className="flex justify-between font-mono p-2 bg-secondary/10 rounded-lg">
                                <span>E = hf</span>
                                <span className="text-[10px]">Planck-Einstein Relation</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-3xl p-6 border border-primary/5 flex flex-col justify-center">
                        <div className="text-[10px] font-black uppercase text-muted-foreground mb-4">Physics Highlight</div>
                        <p className="text-xs leading-relaxed italic text-muted-foreground">
                            Electromagnetic waves travel at exactly {c.toExponential(0)} m/s in a vacuum, regardless of their frequency or observer motion.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
