'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Trophy, Timer, Crosshair, Zap, Activity, Flame, MousePointer2, ChevronRight, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type GameMode = 'static' | 'flick' | 'tracking';

interface GameTarget {
    x: number;
    y: number;
    id: number;
    size: number;
    vx?: number;
    vy?: number;
}

const MODES = [
    { id: 'static', name: 'Precision', icon: Crosshair, desc: 'Static targets, focus on accuracy.' },
    { id: 'flick', name: 'Flick Drills', icon: Zap, desc: 'Targets vanish quickly. Speed is key.' },
    { id: 'tracking', name: 'Pro Tracking', icon: MousePointer2, desc: 'Follow the moving orb. Zero misses.' },
] as const;

export default function FPSAimMaster() {
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [mode, setMode] = useState<GameMode>('static');
    const [score, setScore] = useState(0);
    const [hits, setHits] = useState(0);
    const [misses, setMisses] = useState(0);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [targets, setTargets] = useState<GameTarget[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(null);
    const lastTimeRef = useRef<number>(null);

    const spawnTarget = useCallback(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const size = mode === 'static' ? 40 : mode === 'flick' ? 35 : 50;
        const x = Math.random() * (rect.width - size - 60) + 30;
        const y = Math.random() * (rect.height - size - 60) + 30;

        const newTarget: GameTarget = {
            x, y, size, id: Math.random(),
            vx: mode === 'tracking' ? (Math.random() - 0.5) * 8 : undefined,
            vy: mode === 'tracking' ? (Math.random() - 0.5) * 8 : undefined,
        };

        if (mode === 'tracking') {
            setTargets([newTarget]);
        } else {
            setTargets(prev => [...prev.slice(-2), newTarget]);
        }
    }, [mode]);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setHits(0);
        setMisses(0);
        setCombo(0);
        setMaxCombo(0);
        setTimeLeft(30);
        setTargets([]);
        spawnTarget();
    };

    const endGame = useCallback(() => {
        setGameState('result');
        setTargets([]);
    }, []);

    // Game Loop for Tracking
    const update = (time: number) => {
        if (lastTimeRef.current !== undefined && mode === 'tracking' && gameState === 'playing' && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();

            setTargets(prev => prev.map(t => {
                let nx = t.x + (t.vx || 0);
                let ny = t.y + (t.vy || 0);
                let nvx = t.vx || 0;
                let nvy = t.vy || 0;

                if (nx < 0 || nx > rect.width - t.size) nvx *= -1;
                if (ny < 0 || ny > rect.height - t.size) nvy *= -1;

                // Randomly change direction slightly
                if (Math.random() < 0.02) nvx = (Math.random() - 0.5) * 8;
                if (Math.random() < 0.02) nvy = (Math.random() - 0.5) * 8;

                return { ...t, x: nx, y: ny, vx: nvx, vy: nvy };
            }));
        }
        lastTimeRef.current = time;
        requestRef.current = requestAnimationFrame(update);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(update);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [mode, gameState]);

    // Timer
    useEffect(() => {
        let timer: any;
        if (gameState === 'playing' && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            }), 1000);
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft, endGame]);

    const handleHit = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (gameState !== 'playing') return;

        setHits(h => h + 1);
        setCombo(c => {
            const nc = c + 1;
            if (nc > maxCombo) setMaxCombo(nc);
            return nc;
        });

        const multiplier = mode === 'static' ? 1 : mode === 'flick' ? 1.5 : 2;
        setScore(s => Math.floor(s + (100 * multiplier * (1 + combo * 0.05))));

        if (mode !== 'tracking') {
            setTargets(prev => prev.filter(t => t.id !== id));
            spawnTarget();
        }
    };

    const handleContainerClick = () => {
        if (gameState !== 'playing') return;
        setMisses(m => m + 1);
        setCombo(0);
    };

    // Tracking specific: constant hit detection
    const handleTrackingHover = () => {
        if (mode === 'tracking' && gameState === 'playing') {
            setScore(s => s + 5);
            setHits(h => h + 0.1);
        }
    };

    const accuracy = hits > 0 || misses > 0 ? (hits / (hits + misses)) * 100 : 0;

    return (
        <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
                        FPS AIM <span className="text-primary italic">MASTER</span>
                        <Trophy className="h-5 w-5 text-yellow-500 animate-pulse" />
                    </h2>
                    <p className="text-white/40 text-sm">Professional grade aim development suite.</p>
                </div>

                <div className="flex bg-zinc-950 p-1 rounded-2xl border border-white/5 gap-1">
                    {MODES.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setMode(m.id as GameMode)}
                            disabled={gameState === 'playing'}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest",
                                mode === m.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <m.icon className="h-4 w-4" />
                            <span className="hidden sm:inline">{m.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Visual Dashboard */}
                <div className="space-y-6 lg:col-span-1">
                    <Card className="bg-zinc-900/40 border-primary/20 shadow-none overflow-hidden rounded-[2rem]">
                        <CardContent className="p-0">
                            <div className="bg-primary/10 p-6 text-center border-b border-primary/10">
                                <Activity className="h-5 w-5 text-primary mx-auto mb-2 opacity-60" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 block">Live Score</span>
                                <motion.p
                                    key={score}
                                    initial={{ scale: 1.1, color: '#fff' }}
                                    animate={{ scale: 1, color: '#fff' }}
                                    className="text-4xl font-black tabular-nums"
                                >
                                    {score.toLocaleString()}
                                </motion.p>
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <span className="text-[10px] font-black p text-white/40 uppercase block mb-1">Accuracy</span>
                                    <p className="text-xl font-black">{Math.floor(accuracy)}%</p>
                                </div>
                                <div className="text-center">
                                    <span className="text-[10px] font-black text-white/40 uppercase block mb-1">Combo</span>
                                    <p className={cn("text-xl font-black", combo > 10 ? "text-orange-500" : "text-white")}>{combo}x</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-950 border-white/5 rounded-[2rem] h-32 flex items-center justify-center">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Timer className="h-4 w-4 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Chronograph</span>
                            </div>
                            <p className="text-5xl font-black tracking-tighter tabular-nums">{timeLeft}s</p>
                        </div>
                    </Card>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-2 block">Warmup Objective</label>
                        <div className="p-4 bg-zinc-900/50 rounded-3xl border border-white/5 space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-white/5 rounded-xl flex items-center justify-center">
                                    <Target className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-xs font-bold text-white/70">{MODES.find(m => m.id === mode)?.desc}</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={gameState === 'playing' ? endGame : startGame}
                        size="lg"
                        className={cn(
                            "w-full h-16 rounded-[2rem] font-black text-md transition-all",
                            gameState === 'playing' ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:scale-[1.02]"
                        )}
                    >
                        {gameState === 'playing' ? 'STOP TRAINING' : 'ENGAGE ARENA'}
                    </Button>
                </div>

                {/* Arena Area */}
                <div className="lg:col-span-3">
                    <div
                        ref={containerRef}
                        className="relative w-full h-[600px] bg-zinc-950 rounded-[3rem] border-4 border-zinc-900 overflow-hidden cursor-crosshair group shadow-2xl"
                        onClick={handleContainerClick}
                    >
                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

                        {/* Target Area */}
                        <AnimatePresence>
                            {gameState === 'playing' && targets.map(t => (
                                <motion.div
                                    key={t.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 1.5, opacity: 0 }}
                                    onMouseDown={(e) => handleHit(t.id, e)}
                                    onMouseEnter={mode === 'tracking' ? handleTrackingHover : undefined}
                                    style={{
                                        position: 'absolute',
                                        left: t.x,
                                        top: t.y,
                                        width: t.size,
                                        height: t.size
                                    }}
                                    className="group/target select-none"
                                >
                                    <div className="w-full h-full rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center relative shadow-[0_0_30px_rgba(var(--primary),0.3)]">
                                        <div className="w-3/4 h-3/4 rounded-full bg-primary/40 flex items-center justify-center border border-white/20">
                                            <div className="w-1/3 h-1/3 rounded-full bg-white shadow-lg" />
                                        </div>
                                        {/* Aim Assist Visual Hint */}
                                        <div className="absolute -inset-4 border border-primary/10 rounded-full scale-0 group-hover/target:scale-100 transition-transform duration-300" />
                                    </div>

                                    {mode === 'flick' && (
                                        <motion.div
                                            initial={{ width: '100%' }}
                                            animate={{ width: '0%' }}
                                            transition={{ duration: 0.8, ease: 'linear' }}
                                            onAnimationComplete={() => gameState === 'playing' && setTargets(prev => prev.filter(p => p.id !== t.id))}
                                            className="h-1 bg-red-500 absolute -bottom-3 left-0 rounded-full"
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Overlays */}
                        {gameState === 'idle' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm z-50">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center space-y-6 p-12"
                                >
                                    <div className="inline-flex h-24 w-24 bg-primary/10 rounded-[3rem] items-center justify-center border border-primary/20 mb-4">
                                        <Target className="h-12 w-12 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-5xl font-black text-white italic tracking-tighter">ELITE ARENA</h3>
                                        <p className="text-white/40 max-w-sm mx-auto">Master your muscle memory. Targets spawn based on your chosen mode below.</p>
                                    </div>
                                    <Button size="lg" onClick={startGame} className="rounded-3xl h-16 px-12 font-black text-xl shadow-2xl shadow-primary/40">
                                        INITIALIZE SQUAD
                                    </Button>
                                </motion.div>
                            </div>
                        )}

                        {gameState === 'result' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-2xl z-50 p-12">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-center space-y-8"
                                >
                                    <Trophy className="h-20 w-20 text-yellow-500 mx-auto drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]" />
                                    <div>
                                        <h3 className="text-5xl font-black text-white italic tracking-tighter">PERFORMANCE RECAP</h3>
                                        <p className="text-primary font-bold uppercase tracking-widest text-xs mt-2">Professional Grade Analysis</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-8 border-y border-white/5 py-10 w-full max-w-2xl">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Final Score</span>
                                            <p className="text-4xl font-black text-white">{score.toLocaleString()}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Avg Accuracy</span>
                                            <p className="text-4xl font-black text-primary">{Math.floor(accuracy)}%</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Max Streak</span>
                                            <p className="text-4xl font-black text-orange-500">{maxCombo}x</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 max-w-md mx-auto">
                                        <Button variant="outline" size="lg" className="flex-1 rounded-3xl h-16 font-black text-white border-white/10" onClick={() => setGameState('idle')}>
                                            MODIFY MODE
                                        </Button>
                                        <Button size="lg" className="flex-1 rounded-3xl h-16 font-black" onClick={startGame}>
                                            RETRY RUN
                                        </Button>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </div>

                    {/* Pro Controls Overlay */}
                    <div className="mt-6 flex justify-between items-center px-8 py-4 bg-zinc-900/40 rounded-[2.5rem] border border-white/5">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">SENSITIVITY</span>
                                <span className="text-xs font-bold text-white italic">MATCHED (1:1)</span>
                            </div>
                            <div className="w-px h-8 bg-white/5" />
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">FPS LIMIT</span>
                                <span className="text-xs font-bold text-white">UNCAPPED</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[9px] font-black text-white/30 uppercase">ELITE CALIBRATION ACTIVE</span>
                            <Settings className="h-4 w-4 text-white/20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
