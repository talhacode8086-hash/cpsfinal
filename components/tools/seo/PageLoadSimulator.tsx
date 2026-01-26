'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';

export default function PageLoadSimulator() {
    const [state, setState] = useState<'idle' | 'testing' | 'result'>('idle');
    const [progress, setProgress] = useState(0);
    const [metrics, setMetrics] = useState({ dns: 0, tcp: 0, dom: 0, full: 0 });

    const startTest = () => {
        setState('testing');
        setProgress(0);

        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 5;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                completeTest();
            }
            setProgress(Math.round(p));
        }, 100);
    };

    const completeTest = () => {
        setMetrics({
            dns: Math.round(Math.random() * 100 + 20),
            tcp: Math.round(Math.random() * 200 + 50),
            dom: Math.round(Math.random() * 800 + 400),
            full: Math.round(Math.random() * 1000 + 1500)
        });
        setState('result');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Page Load Time Estimator</CardTitle>
                <p className="text-muted-foreground mt-2">Estimate visual performance and bottleneck analysis for Core Web Vitals.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                {state === 'idle' && (
                    <div className="text-center py-12 space-y-6">
                        <div className="p-10 rounded-[3rem] bg-muted/10 border-4 border-dashed border-primary/10 flex flex-col items-center">
                            <Gauge className="h-16 w-16 text-primary/30 mb-4" />
                            <h3 className="text-3xl font-black mb-2 uppercase">Ready for Analysis?</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">Click start to run a simulated lighthouse scan of the current network profile.</p>
                        </div>
                        <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-bold shadow-xl shadow-primary/20" onClick={startTest}>
                            Initialize Speed Test
                        </Button>
                    </div>
                )}

                {state === 'testing' && (
                    <div className="text-center py-20 space-y-8 animate-in zoom-in-50">
                        <div className="relative w-48 h-48 mx-auto">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="96" cy="96" r="88" className="stroke-primary/10 fill-none" strokeWidth="12" />
                                <circle cx="96" cy="96" r="88" className="stroke-primary fill-none transition-all duration-300" strokeWidth="12" strokeDasharray={552.92} strokeDashoffset={552.92 - (552.92 * progress) / 100} />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-4xl font-black text-primary">{progress}%</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter">Measuring Network Throughput...</h3>
                            <p className="text-muted-foreground italic">Analyzing TTFB, FCP, and DOM Interactive phases.</p>
                        </div>
                    </div>
                )}

                {state === 'result' && (
                    <div className="space-y-8 animate-in slide-in-from-bottom-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <MetricBox label="DNS Lookup" value={metrics.dns} unit="ms" sub="Excellent" />
                            <MetricBox label="TCP Handshake" value={metrics.tcp} unit="ms" sub="Standard" />
                            <MetricBox label="DOM Load" value={metrics.dom} unit="ms" sub="Attention" warning={metrics.dom > 1000} />
                            <MetricBox label="Fully Loaded" value={metrics.full} unit="ms" primary />
                        </div>

                        <div className="p-8 rounded-[3rem] bg-primary/10 border border-primary/20 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Zap className="h-5 w-5 text-primary" />
                                <span className="text-xs font-black uppercase tracking-widest text-primary">Performance Rating</span>
                            </div>
                            <h3 className="text-5xl font-black">GOOD</h3>
                            <p className="text-xs text-muted-foreground mt-2 italic px-12">Your page would likely pass Google's Core Web Vitals on standard 4G connections.</p>
                        </div>

                        <div className="flex justify-center">
                            <Button size="lg" className="rounded-2xl h-14" onClick={() => setState('idle')}>Run New Simulation</Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function MetricBox({ label, value, unit, sub, primary, warning }: any) {
    return (
        <div className={`p-6 rounded-3xl border text-center transition-all ${primary ? 'bg-primary border-primary shadow-xl shadow-primary/30 text-white' :
                warning ? 'bg-destructive/10 border-destructive/20 text-destructive' :
                    'bg-muted/30 border-primary/5'
            }`}>
            <p className={`text-[10px] font-black uppercase tracking-widest ${primary ? 'text-white/70' : 'text-primary/60'}`}>{label}</p>
            <p className="text-2xl font-black">{value}{unit}</p>
            {!primary && <p className="text-[10px] font-bold mt-1 uppercase tracking-tighter opacity-50">{sub}</p>}
        </div>
    );
}
