'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Volume2, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SoundDirectionTest() {
    const [activeSide, setActiveSide] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const testSound = (side: 'left' | 'right' | 'center') => {
        setIsPlaying(true);
        setActiveSide(side);
        // Simulate audio
        setTimeout(() => {
            setIsPlaying(false);
            setActiveSide(null);
        }, 800);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
                    <Headphones className="h-4 w-4" />
                    Headphone Calibration
                </div>
                <h2 className="text-4xl font-black">Positional Audio</h2>
                <p className="text-muted-foreground">Test your spatial awareness and headphone stereo imaging.</p>
            </div>

            <div className="flex flex-col items-center gap-12 py-12">
                <div className="relative h-64 w-64 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-dashed border-muted rounded-full opacity-20 animate-spin-slow" />

                    <div className="relative h-32 w-32 bg-zinc-950 rounded-[2rem] border-4 border-zinc-900 flex items-center justify-center shadow-2xl">
                        <Headphones className="h-12 w-12 text-primary" />

                        {/* Sound Waves */}
                        {activeSide === 'left' && (
                            <motion.div
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="absolute right-full mr-4 w-12 h-24 border-l-8 border-primary rounded-full"
                            />
                        )}
                        {activeSide === 'right' && (
                            <motion.div
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="absolute left-full ml-4 w-12 h-24 border-r-8 border-primary rounded-full"
                            />
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full">
                    <Button
                        variant="outline"
                        size="lg"
                        className={`h-20 rounded-2xl flex flex-col gap-1 transition-all ${activeSide === 'left' ? 'ring-4 ring-primary bg-primary/5' : ''}`}
                        onClick={() => testSound('left')}
                    >
                        <Volume2 className="h-5 w-5 opacity-40" />
                        <span className="font-bold">LEFT</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className={`h-20 rounded-2xl flex flex-col gap-1 transition-all ${activeSide === 'center' ? 'ring-4 ring-primary bg-primary/5' : ''}`}
                        onClick={() => testSound('center')}
                    >
                        <Volume2 className="h-5 w-5 opacity-40" />
                        <span className="font-bold">CENTER</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className={`h-20 rounded-2xl flex flex-col gap-1 transition-all ${activeSide === 'right' ? 'ring-4 ring-primary bg-primary/5' : ''}`}
                        onClick={() => testSound('right')}
                    >
                        <Volume2 className="h-5 w-5 opacity-40" />
                        <span className="font-bold">RIGHT</span>
                    </Button>
                </div>
            </div>

            <Card className="bg-muted/30 border-none rounded-3xl p-8">
                <CardContent className="p-0 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Binaural Accuracy
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Competitive gamers rely on positional audio to detect enemy footsteps. This test helps verify if your headset&apos;s virtualization or stereo imaging is working correctly.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center p-4 bg-background rounded-2xl shadow-sm min-w-[100px]">
                            <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Cues</div>
                            <div className="text-2xl font-black">{score}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
