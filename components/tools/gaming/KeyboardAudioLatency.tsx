'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, Play, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function KeyboardAudioLatency() {
    const [latencies, setLatencies] = useState<number[]>([]);
    const [state, setState] = useState<'idle' | 'ready'>('idle');
    const startTimeRef = useRef(0);
    const audioCtxRef = useRef<AudioContext | null>(null);

    const initAudio = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    };

    const playBeep = () => {
        if (!audioCtxRef.current) return;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (state !== 'ready') return;
        const now = performance.now();
        const diff = Math.round(now - startTimeRef.current);

        setLatencies(prev => [diff, ...prev].slice(0, 5));
        playBeep();
        setState('idle');
        toast.info(`Audio Latency: ${diff}ms`);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state]);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Volume2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Keyboard Audio Latency Test</CardTitle>
                <p className="text-muted-foreground mt-2">Measure the delay between a keypress and hearing a sound cue.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="flex gap-6 justify-center">
                    <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/10 text-center flex-1">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Average Sync Delay</p>
                        <p className="text-7xl font-black">
                            {latencies.length > 0 ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0}
                            <span className="text-xl">ms</span>
                        </p>
                    </div>
                </div>

                <div
                    className={`h-64 rounded-[3rem] border-4 flex flex-col items-center justify-center cursor-pointer transition-all ${state === 'ready' ? 'bg-green-500/10 border-green-500/30 ring-4 ring-green-500/10' : 'bg-muted/10 border-primary/10'
                        }`}
                    onClick={() => {
                        initAudio();
                        setState('ready');
                        startTimeRef.current = performance.now();
                    }}
                >
                    {state === 'idle' ? (
                        <div className="text-center space-y-4">
                            <Play className="h-12 w-12 text-primary mx-auto fill-primary" />
                            <h3 className="text-3xl font-black">CLICK TO ARM</h3>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <Timer className="h-12 w-12 text-green-500 animate-spin mx-auto" />
                            <h3 className="text-3xl font-black uppercase">PRESS ANY KEY NOW</h3>
                        </div>
                    )}
                </div>

                <p className="text-center text-xs text-muted-foreground italic px-12">
                    Critical for rhythm game calibration (osu!, StepMania, Guitar Hero). This measures the system's total path from input scan to audio driver output.
                </p>
            </CardContent>
        </Card>
    );
}
