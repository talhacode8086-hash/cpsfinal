'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function Metronome() {
    const [bpm, setBpm] = useState(120);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
    const [count, setCount] = useState(0);

    const audioContext = useRef<AudioContext | null>(null);
    const nextTickTime = useRef(0);
    const timerID = useRef<number | null>(null);

    const playClick = (time: number, isStrong: boolean) => {
        if (!audioContext.current) return;
        const oscillator = audioContext.current.createOscillator();
        const envelope = audioContext.current.createGain();

        oscillator.frequency.value = isStrong ? 1000 : 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

        oscillator.connect(envelope);
        envelope.connect(audioContext.current.destination);

        oscillator.start(time);
        oscillator.stop(time + 0.1);
    };

    const scheduler = () => {
        while (nextTickTime.current < audioContext.current!.currentTime + 0.1) {
            playClick(nextTickTime.current, count % beatsPerMeasure === 0);
            nextTickTime.current += 60.0 / bpm;
            setCount(c => (c + 1) % beatsPerMeasure);
        }
        timerID.current = requestAnimationFrame(scheduler);
    };

    useEffect(() => {
        if (isPlaying) {
            audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            nextTickTime.current = audioContext.current.currentTime;
            scheduler();
        } else {
            if (timerID.current) cancelAnimationFrame(timerID.current);
            setCount(0);
        }
        return () => {
            if (timerID.current) cancelAnimationFrame(timerID.current);
        };
    }, [isPlaying, bpm, beatsPerMeasure]);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Music className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Professional Metronome</CardTitle>
                <p className="text-muted-foreground mt-2">Steady rhythm for your musical journey.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="space-y-4">
                    <h2 className="text-9xl font-black text-primary tracking-tighter">{bpm}</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Beats Per Minute</p>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl" onClick={() => setBpm(b => Math.max(20, b - 1))}><ChevronLeft /></Button>
                    <Slider value={[bpm]} onValueChange={(v) => setBpm(v[0])} min={20} max={250} step={1} className="w-64" />
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl" onClick={() => setBpm(b => Math.min(250, b + 1))}><ChevronRight /></Button>
                </div>

                <div className="flex justify-center gap-4">
                    {[2, 3, 4, 6].map((b) => (
                        <Button
                            key={b}
                            variant={beatsPerMeasure === b ? "default" : "outline"}
                            className="h-14 w-14 rounded-2xl font-black text-lg"
                            onClick={() => setBeatsPerMeasure(b)}
                        >
                            {b}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-8">
                    <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`h-28 w-28 rounded-full shadow-2xl transition-all ${isPlaying ? 'bg-destructive shadow-destructive/20 rotate-180' : 'bg-primary shadow-primary/20'}`}
                    >
                        {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12 ml-2" />}
                    </Button>

                    <div className="flex gap-4">
                        {Array.from({ length: beatsPerMeasure }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-4 w-4 rounded-full transition-all duration-75 ${isPlaying && (count === (i + 1) % beatsPerMeasure) ? 'bg-primary scale-125 shadow-lg shadow-primary/50' : 'bg-primary/10'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
