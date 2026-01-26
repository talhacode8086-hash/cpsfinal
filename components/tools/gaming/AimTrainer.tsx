'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Trophy, Timer, Crosshair, Zap, Activity, Flame, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TargetPosition {
    x: number;
    y: number;
    id: number;
    size: number;
}

const DIFFICULTIES = [
    { name: 'Easy', size: 60, time: 30 },
    { name: 'Standard', size: 45, time: 30 },
    { name: 'Hard', size: 30, time: 30 },
    { name: 'Elite', size: 20, time: 30 },
];

export default function AimTrainer() {
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [targetsHit, setTargetsHit] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [target, setTarget] = useState<TargetPosition | null>(null);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [difficulty, setDifficulty] = useState(DIFFICULTIES[1]);

    const containerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const spawnTarget = useCallback(() => {
        if (!containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        const size = difficulty.size;
        const x = Math.random() * (width - size - 40) + 20;
        const y = Math.random() * (height - size - 40) + 20;
        setTarget({ x, y, id: Date.now(), size });
    }, [difficulty]);

    const startTraining = () => {
        setIsActive(true);
        setIsFinished(false);
        setTargetsHit(0);
        setTotalClicks(0);
        setTimeLeft(difficulty.time);
        setScore(0);
        setCombo(0);
        setMaxCombo(0);
        spawnTarget();
    };

    const endTraining = useCallback(() => {
        setIsActive(false);
        setIsFinished(true);
        setTarget(null);
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        endTraining();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft, endTraining]);

    const handleContainerClick = (e: React.MouseEvent) => {
        if (!isActive) return;
        setTotalClicks(prev => prev + 1);
        setCombo(0); // Break combo on miss (if it's not on the target)
    };

    const handleTargetClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isActive) return;

        const newHits = targetsHit + 1;
        const newCombo = combo + 1;

        setTargetsHit(newHits);
        setTotalClicks(prev => prev + 1);
        setCombo(newCombo);
        if (newCombo > maxCombo) setMaxCombo(newCombo);

        // Score based on combo and difficulty
        const points = 100 * (1 + (newCombo * 0.1)) * (60 / difficulty.size);
        setScore(prev => Math.floor(prev + points));

        spawnTarget();
    };

    const accuracy = totalClicks > 0 ? (targetsHit / totalClicks) * 100 : 0;

    return (
        <div className="mx-auto max-w-6xl space-y-8">
            <div className="grid gap-6 lg:grid-cols-4">
                {/* Side Stats */}
                <div className="space-y-4">
                    <Card className="border-primary/20 bg-primary/5 shadow-inner">
                        <CardContent className="pt-6 text-center">
                            <Timer className="h-5 w-5 text-primary mx-auto mb-1 opacity-60" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Focus Time</p>
                            <p className="text-4xl font-black tabular-nums">{timeLeft}s</p>
                            <div className="w-full h-1 bg-primary/10 mt-3 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: '100%' }}
                                    animate={{ width: `${(timeLeft / difficulty.time) * 100}%` }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-3">
                        <Card className="border-primary/10 group">
                            <CardContent className="pt-6 text-center">
                                <Crosshair className="h-4 w-4 text-primary mx-auto mb-1 group-hover:scale-125 transition-transform" />
                                <p className="text-[9px] font-black uppercase text-muted-foreground">Accuracy</p>
                                <p className="text-2xl font-black">{accuracy.toFixed(0)}%</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/10 group">
                            <CardContent className="pt-6 text-center">
                                <Flame className={`h-4 w-4 mx-auto mb-1 transition-transform ${combo > 5 ? 'text-orange-500 scale-125 animate-bounce' : 'text-primary'}`} />
                                <p className="text-[9px] font-black uppercase text-muted-foreground">Combo</p>
                                <p className="text-2xl font-black">{combo}x</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-primary/10 bg-muted/20">
                        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-60">Session Info</CardTitle>
                            <Activity className="h-3 w-3 opacity-40" />
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground font-medium">Points</span>
                                <span className="font-black text-primary">{score.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground font-medium">Hits</span>
                                <span className="font-black">{targetsHit}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground font-medium">Max Combo</span>
                                <span className="font-black text-orange-500">{maxCombo}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Difficulty</p>
                        <div className="grid grid-cols-2 gap-2">
                            {DIFFICULTIES.map((d) => (
                                <Button
                                    key={d.name}
                                    variant={difficulty.name === d.name ? 'default' : 'outline'}
                                    size="sm"
                                    className="h-9 rounded-xl text-[10px] font-black"
                                    onClick={() => setDifficulty(d)}
                                    disabled={isActive}
                                >
                                    {d.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Training Area */}
                <Card className="lg:col-span-3 border-2 border-primary/20 bg-zinc-950 shadow-2xl relative overflow-hidden h-[600px] cursor-crosshair rounded-[2.5rem]">
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                    <div
                        ref={containerRef}
                        className="w-full h-full relative"
                        onClick={handleContainerClick}
                    >
                        <AnimatePresence>
                            {isActive && target && (
                                <motion.div
                                    key={target.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 1.5, opacity: 0 }}
                                    style={{
                                        position: 'absolute',
                                        left: target.x,
                                        top: target.y,
                                        width: target.size,
                                        height: target.size
                                    }}
                                    className="group"
                                    onClick={handleTargetClick}
                                >
                                    <div className="w-full h-full rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.5)] border-4 border-white/30 relative">
                                        <div className="w-[60%] h-[60%] rounded-full bg-white/40 border-2 border-white/60" />
                                        <div className="absolute -inset-1 rounded-full border border-primary animate-ping opacity-30" />
                                    </div>
                                    <motion.div
                                        initial={{ width: '100%' }}
                                        animate={{ width: '0%' }}
                                        transition={{ duration: 1.5, ease: 'linear' }}
                                        className="h-1 bg-primary absolute -bottom-3 left-0 rounded-full"
                                        onAnimationComplete={() => isActive && target && spawnTarget()}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!isActive && !isFinished && (
                            <div className="flex flex-col items-center justify-center h-full space-y-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                                    <div className="h-24 w-24 bg-primary rounded-[2rem] flex items-center justify-center relative shadow-2xl">
                                        <Target className="h-12 w-12 text-white" />
                                    </div>
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-3xl font-black text-white tracking-tight">Arena is Ready</h3>
                                    <p className="text-white/40 max-w-xs mx-auto">Targets will vanish in 1.5s. Accuracy and combos multiply your score.</p>
                                </div>
                                <Button size="lg" onClick={startTraining} className="rounded-2xl h-14 px-12 font-black text-lg shadow-xl shadow-primary/40">
                                    Enter Training
                                </Button>
                            </div>
                        )}

                        {isFinished && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-xl p-8"
                            >
                                <motion.div
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="max-w-md w-full text-center space-y-8"
                                >
                                    <div className="inline-flex h-20 w-20 bg-primary rounded-3xl items-center justify-center shadow-2xl shadow-primary/30 rotate-3">
                                        <Trophy className="h-10 w-10 text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-primary uppercase tracking-[0.3em]">Evaluation Complete</p>
                                        <h2 className="text-6xl font-black text-white tracking-tighter">GOOD RANGE!</h2>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-8">
                                        <div>
                                            <p className="text-[10px] font-black text-white/40 uppercase mb-1">Score</p>
                                            <p className="text-2xl font-black text-white">{score.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/40 uppercase mb-1">Accuracy</p>
                                            <p className="text-2xl font-black text-white">{accuracy.toFixed(1)}%</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/40 uppercase mb-1">Max Combo</p>
                                            <p className="text-2xl font-black text-orange-500">{maxCombo}x</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button variant="outline" size="lg" className="flex-1 rounded-2xl h-14 font-black border-2 border-white/20 text-white" onClick={() => setIsFinished(false)}>
                                            Review Area
                                        </Button>
                                        <Button size="lg" className="flex-1 rounded-2xl h-14 font-black shadow-xl" onClick={startTraining}>
                                            Restart
                                        </Button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Pro Benchmarks */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="rounded-3xl border-primary/10 bg-muted/20 p-6 flex flex-col items-center text-center gap-3">
                    <Zap className="h-6 w-6 text-yellow-500" />
                    <h4 className="font-black text-xs uppercase tracking-widest">Low Latency</h4>
                    <p className="text-xs text-muted-foreground">Sub-millisecond input registration for the most competitive practice environment.</p>
                </Card>
                <Card className="rounded-3xl border-primary/10 bg-muted/20 p-6 flex flex-col items-center text-center gap-3">
                    <MousePointer2 className="h-6 w-6 text-primary" />
                    <h4 className="font-black text-xs uppercase tracking-widest">Muscle Memory</h4>
                    <p className="text-xs text-muted-foreground">Consistent target scaling helps you translate mouse movements to real-game reflexes.</p>
                </Card>
                <Card className="rounded-3xl border-primary/10 bg-muted/20 p-6 flex flex-col items-center text-center gap-3">
                    <Trophy className="h-6 w-6 text-orange-500" />
                    <h4 className="font-black text-xs uppercase tracking-widest">Performance Tracking</h4>
                    <p className="text-xs text-muted-foreground">Session-based analysis tools to help you identify and eliminate aiming plateau.</p>
                </Card>
            </div>
        </div>
    );
}
