'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Timer, Target, Zap, MousePointer2, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Stage = 'idle' | 'clicks' | 'reaction' | 'precision' | 'finished';

export default function EsportsWarmup() {
    const [stage, setStage] = useState<Stage>('idle');
    const [timeLeft, setTimeLeft] = useState(60); // Total 60s mockup warmup
    const [score, setScore] = useState({ clicks: 0, reaction: 0, accuracy: 0 });
    const [target, setTarget] = useState<{ x: number; y: number; id: number } | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    const startWarmup = () => {
        setStage('clicks');
        setTimeLeft(10); // 10s clicking
        setScore({ clicks: 0, reaction: 0, accuracy: 0 });
    };

    const spawnTarget = useCallback(() => {
        if (!containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        const x = Math.random() * (width - 40);
        const y = Math.random() * (height - 40);
        setTarget({ x, y, id: Date.now() });
    }, []);

    const nextStage = useCallback(() => {
        if (stage === 'clicks') {
            setStage('reaction');
            setTimeLeft(15);
        } else if (stage === 'reaction') {
            setStage('precision');
            setTimeLeft(30);
            spawnTarget();
        } else if (stage === 'precision') {
            setStage('finished');
            setTimeLeft(0);
        }
    }, [stage, spawnTarget]);

    useEffect(() => {
        if (stage !== 'idle' && stage !== 'finished' && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        nextStage();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [stage, timeLeft, nextStage]);

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            {/* HUD */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="pt-6 text-center">
                        <Timer className="h-5 w-5 text-primary mx-auto mb-1" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground line-clamp-1">Stage Time</p>
                        <p className="text-3xl font-black">{timeLeft}s</p>
                    </CardContent>
                </Card>
                <Card className={`border-primary/10 ${stage === 'clicks' ? 'ring-2 ring-primary bg-primary/10' : ''}`}>
                    <CardContent className="pt-6 text-center">
                        <MousePointer2 className="h-5 w-5 mx-auto mb-1 opacity-40" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Clicks</p>
                        <p className="text-3xl font-black">{score.clicks}</p>
                    </CardContent>
                </Card>
                <Card className={`border-primary/10 ${stage === 'reaction' ? 'ring-2 ring-yellow-500 bg-yellow-500/10' : ''}`}>
                    <CardContent className="pt-6 text-center">
                        <Zap className="h-5 w-5 mx-auto mb-1 opacity-40" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Reaction</p>
                        <p className="text-3xl font-black">{score.reaction > 0 ? `${Math.round(score.reaction)}ms` : '--'}</p>
                    </CardContent>
                </Card>
                <Card className={`border-primary/10 ${stage === 'precision' ? 'ring-2 ring-blue-500 bg-blue-500/10' : ''}`}>
                    <CardContent className="pt-6 text-center">
                        <Target className="h-5 w-5 mx-auto mb-1 opacity-40" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Precision</p>
                        <p className="text-3xl font-black">{score.accuracy}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Area */}
            <Card className="border-primary/20 bg-muted/20 h-[500px] overflow-hidden relative">
                <div
                    ref={containerRef}
                    className="w-full h-full p-8"
                    onClick={() => stage === 'clicks' && setScore(s => ({ ...s, clicks: s.clicks + 1 }))}
                >
                    <AnimatePresence mode="wait">
                        {stage === 'idle' && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-full text-center space-y-6"
                            >
                                <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                                    <Flame className="h-12 w-12 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-4xl font-black tracking-tight">Ready to warm up?</h2>
                                    <p className="text-muted-foreground max-w-sm mx-auto">This 60-second routine covers clicking speed, visual reactions, and target precision.</p>
                                </div>
                                <Button size="lg" onClick={startWarmup} className="rounded-xl px-12 h-14 shadow-xl shadow-primary/20">
                                    Start Warm-Up
                                </Button>
                            </motion.div>
                        )}

                        {stage === 'clicks' && (
                            <motion.div
                                key="clicks"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-full text-center space-y-4 cursor-pointer select-none"
                            >
                                <h2 className="text-6xl font-black text-primary animate-bounce">CLICK FAST!</h2>
                                <p className="text-muted-foreground uppercase tracking-widest font-bold">Phase 1: Neural Response</p>
                            </motion.div>
                        )}

                        {stage === 'precision' && target && (
                            <motion.div
                                key={target.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{ position: 'absolute', left: target.x, top: target.y }}
                                className="h-10 w-10 bg-primary rounded-full shadow-lg border-2 border-white cursor-pointer"
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    setScore(s => ({ ...s, accuracy: s.accuracy + 1 }));
                                    spawnTarget();
                                }}
                            />
                        )}

                        {stage === 'finished' && (
                            <motion.div
                                key="finished"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center h-full text-center space-y-8 bg-background/80 backdrop-blur-md absolute inset-0 z-20"
                            >
                                <Trophy className="h-20 w-20 text-yellow-500" />
                                <h2 className="text-5xl font-black">Ready for Rank!</h2>
                                <div className="grid grid-cols-3 gap-8 w-full max-w-md">
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground">CLICKS</p>
                                        <p className="text-2xl font-black">{score.clicks}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground">PRECISION</p>
                                        <p className="text-2xl font-black">{score.accuracy}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground">STATUS</p>
                                        <p className="text-2xl font-black text-green-500">HOT</p>
                                    </div>
                                </div>
                                <Button size="lg" onClick={startWarmup} className="rounded-full px-12 h-14">Repeat Warm-Up</Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stage indicator */}
                    {stage !== 'idle' && stage !== 'finished' && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-6 py-3 bg-background rounded-2xl border border-primary/10 shadow-xl">
                            <span className={`text-[10px] font-bold ${stage === 'clicks' ? 'text-primary' : 'text-muted-foreground opacity-50'}`}>1. CLICKS</span>
                            <ArrowRight className="h-3 w-3 opacity-20" />
                            <span className={`text-[10px] font-bold ${stage === 'reaction' ? 'text-primary' : 'text-muted-foreground opacity-50'}`}>2. REACTIONS</span>
                            <ArrowRight className="h-3 w-3 opacity-20" />
                            <span className={`text-[10px] font-bold ${stage === 'precision' ? 'text-primary' : 'text-muted-foreground opacity-50'}`}>3. PRECISION</span>
                        </div>
                    )}
                </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="p-8 rounded-2xl border bg-muted/30 space-y-4">
                    <h3 className="text-xl font-bold">Why Warm up?</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Just like physical sports, your neural pathways and hand muscles need "activation"
                        before they reach peak efficiency. A quick 1-minute drill increases blood flow to
                        your fingers and sharpens focus.
                    </p>
                </div>
                <div className="p-8 rounded-2xl border bg-primary/5 space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        Routine Strategy
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Don't just click randomly. During Phase 3 (Precision), try to be as smooth as
                        possible. The goal isn't just a high score, but **clean movements**.
                    </p>
                </div>
            </div>
        </div>
    );
}
