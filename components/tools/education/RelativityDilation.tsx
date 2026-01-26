'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function RelativityDilation() {
    const [speedPercent, setSpeedPercent] = useState([50]); // % of c

    const c = 299792458; // m/s
    const v = (speedPercent[0] / 100) * c;
    const beta = speedPercent[0] / 100;

    // Lorentz Factor gamma = 1 / sqrt(1 - v^2/c^2)
    const gamma = 1 / Math.sqrt(1 - Math.pow(beta, 2));

    // Time dilation: t' = t * gamma
    // If 1 year passes for the moving observer, how much passes for stationary?
    const stationaryTime = 1 * gamma;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Relativity Time Dilation</CardTitle>
                <p className="text-muted-foreground mt-2">Explore Einstein's special relativity and the stretching of time at near-light speeds.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    {/* Controls */}
                    <div className="w-full md:w-80 space-y-8 animate-in slide-in-from-left-4">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">
                                <span>VELOCITY / C</span>
                                <span className="text-lg text-primary">{speedPercent[0]}%</span>
                            </div>
                            <Slider value={speedPercent} onValueChange={setSpeedPercent} min={0} max={99.9} step={0.1} className="py-2" />
                        </div>

                        <div className="p-8 rounded-[3rem] bg-muted/10 border border-primary/5 space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black text-primary/40">
                                <span>REAL VELOCITY</span>
                                <span className="font-bold">{(v / 1000000).toFixed(2)} Mm/s</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black text-primary/40">
                                <span>LORENTZ FACTOR (Î³)</span>
                                <span className="font-bold text-primary">{gamma.toFixed(4)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Simulation Visualization */}
                    <div className="flex-1 space-y-8">
                        <div className="relative h-64 bg-slate-950 rounded-[3rem] border-4 border-primary/20 shadow-2xl overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-red-500/10 opacity-30" />

                            {/* Stationary Reference */}
                            <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center">
                                    <div className="w-1 h-6 bg-primary/40 rounded-full animate-spin duration-[4000ms]" style={{ animationDuration: '2s' }} />
                                </div>
                                <span className="text-[8px] font-black text-white/40 uppercase">Stationary</span>
                            </div>

                            {/* Moving Reference */}
                            <div className="relative flex flex-col items-center gap-2 animate-pulse" style={{ transform: `scale(${1 / gamma})` }}>
                                <Rocket className="h-16 w-16 text-primary drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                                <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
                                    <div className="w-1 h-5 bg-primary rounded-full animate-spin" style={{ animationDuration: `${2 * gamma}s` }} />
                                </div>
                                <span className="text-[8px] font-black text-primary uppercase">Relativistic</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-10 rounded-[3rem] bg-primary border-4 border-primary shadow-3xl shadow-primary/30 text-white flex flex-col items-center justify-center gap-2 group hover:scale-105 transition-all">
                                <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.4em]">STATIONARY TIME</p>
                                <h3 className="text-5xl font-black">{stationaryTime.toFixed(2)}<span className="text-sm ml-1 opacity-50">Yrs</span></h3>
                            </div>
                            <div className="p-10 rounded-[3rem] bg-background border-4 border-primary/5 flex flex-col items-center justify-center gap-2 transition-all">
                                <p className="text-[10px] font-black uppercase text-primary/40 tracking-[0.4em]">TRAVELER TIME</p>
                                <h3 className="text-5xl font-black text-primary">1.00<span className="text-sm ml-1 opacity-40">Yr</span></h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-10 rounded-[4rem] bg-primary/5 border border-primary/10 space-y-4">
                    <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-primary" />
                        <h4 className="text-lg font-black text-primary uppercase text-[10px] tracking-widest">Physics Logic</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                        According to Einstein's special relativity, as an object's velocity approaches the speed of light ($c$), time for that object slowing down relative to a stationary observer. This is not an illusion, but a fundamental property of spacetime.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
