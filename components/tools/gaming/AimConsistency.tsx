'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Target, TrendingUp, History, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Session {
    id: number;
    date: string;
    accuracy: number;
    targets: number;
}

export default function AimConsistency() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [targetsHit, setTargetsHit] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [target, setTarget] = useState<{ x: number; y: number; id: number } | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    // Load history from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('aim_history');
        if (saved) setSessions(JSON.parse(saved));
    }, []);

    const spawnTarget = useCallback(() => {
        if (!containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        const x = Math.random() * (width - 40);
        const y = Math.random() * (height - 40);
        setTarget({ x, y, id: Date.now() });
    }, []);

    const startSession = () => {
        setIsActive(true);
        setIsFinished(false);
        setTargetsHit(0);
        setTotalClicks(0);
        setTimeLeft(15);
        spawnTarget();
    };

    const endSession = useCallback(() => {
        setIsActive(false);
        setIsFinished(true);
        setTarget(null);

        const accuracy = totalClicks > 0 ? (targetsHit / totalClicks) * 100 : 0;
        const newSession: Session = {
            id: Date.now(),
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            accuracy: Math.round(accuracy),
            targets: targetsHit
        };

        setSessions(prev => {
            const next = [newSession, ...prev.slice(0, 9)];
            localStorage.setItem('aim_history', JSON.stringify(next));
            return next;
        });
    }, [targetsHit, totalClicks]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        endSession();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isActive, timeLeft, endSession]);

    const handleTargetClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isActive) return;
        setTargetsHit(prev => prev + 1);
        setTotalClicks(prev => prev + 1);
        spawnTarget();
    };

    const clearHistory = () => {
        setSessions([]);
        localStorage.removeItem('aim_history');
    };

    const averageAccuracy = sessions.length > 0
        ? sessions.reduce((a, b) => a + b.accuracy, 0) / sessions.length
        : 0;

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            <div className="grid gap-6 md:grid-cols-4">
                {/* Stats Column */}
                <div className="space-y-4">
                    <Card className="border-primary/10 bg-primary/5">
                        <CardContent className="pt-6 text-center">
                            <TrendingUp className="h-6 w-6 text-primary mx-auto mb-1" />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Avg accuracy</p>
                            <p className="text-3xl font-black text-primary">{Math.round(averageAccuracy)}%</p>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/10 h-80 overflow-hidden">
                        <CardHeader className="py-3 bg-muted/30 flex-row items-center justify-between">
                            <CardTitle className="text-xs font-bold uppercase">History</CardTitle>
                            <button onClick={clearHistory} className="text-[10px] font-bold text-destructive hover:underline">Clear</button>
                        </CardHeader>
                        <CardContent className="p-0 h-full overflow-y-auto">
                            {sessions.map((s) => (
                                <div key={s.id} className="flex justify-between items-center px-4 py-3 border-b text-xs">
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] text-muted-foreground">{s.date}</p>
                                        <p className="font-bold">{s.targets} Targets</p>
                                    </div>
                                    <div className={`px-2 py-1 rounded font-black ${s.accuracy > 80 ? 'bg-green-500/10 text-green-600' : 'bg-primary/10 text-primary'}`}>
                                        {s.accuracy}%
                                    </div>
                                </div>
                            ))}
                            {sessions.length === 0 && (
                                <div className="h-full flex items-center justify-center text-muted-foreground italic text-xs">No sessions yet</div>
                            )}
                        </CardContent>
                    </Card>

                    <Button size="lg" className="w-full h-14 rounded-2xl shadow-lg shadow-primary/20" onClick={startSession} disabled={isActive}>
                        {isActive ? 'Tracking...' : 'Start Tracker'}
                    </Button>
                </div>

                {/* Game Area */}
                <Card className="md:col-span-3 border-primary/20 bg-muted/20 relative overflow-hidden h-[500px] cursor-crosshair">
                    <div
                        ref={containerRef}
                        className="w-full h-full p-4"
                        onClick={() => isActive && setTotalClicks(prev => prev + 1)}
                    >
                        <AnimatePresence>
                            {isActive && target && (
                                <motion.div
                                    key={target.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 1.2, opacity: 0 }}
                                    style={{ position: 'absolute', left: target.x, top: target.y }}
                                    className="bg-primary h-10 w-10 rounded-full flex items-center justify-center shadow-lg shadow-primary/40 border-4 border-white/20"
                                    onClick={handleTargetClick}
                                >
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!isActive && !isFinished && (
                            <div className="flex flex-col items-center justify-center h-full space-y-4">
                                <LineChart className="h-16 w-16 text-primary opacity-20" />
                                <h3 className="text-2xl font-bold">Aim Consistency</h3>
                                <p className="text-muted-foreground text-center max-w-xs">Track how your accuracy changes across sessions to measure improvement.</p>
                            </div>
                        )}

                        {isFinished && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-full text-center p-8 bg-background/90 backdrop-blur-sm absolute inset-0 z-10"
                            >
                                <div className="h-20 w-20 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-primary/30">
                                    <Target className="h-10 w-10 text-white" />
                                </div>
                                <h2 className="text-4xl font-black mb-2">Session Ended</h2>
                                <div className="flex gap-12 my-8">
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-muted-foreground uppercase">Accuracy</p>
                                        <p className="text-4xl font-black text-primary">{sessions[0]?.accuracy}%</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-muted-foreground uppercase">Targets</p>
                                        <p className="text-4xl font-black text-primary">{sessions[0]?.targets}</p>
                                    </div>
                                </div>
                                <Button size="lg" onClick={startSession} className="rounded-full px-12">New Session</Button>
                            </motion.div>
                        )}
                    </div>

                    {/* In-game timer overlay */}
                    {isActive && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 font-black text-2xl">
                            <span className="text-primary">{timeLeft}s</span>
                            <div className="w-px h-6 bg-white/20" />
                            <span>{targetsHit}</span>
                        </div>
                    )}
                </Card>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Consistency is King
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Many players have "good days" and "bad days". The goal of tracking aim consistency is to
                    narrow the gap between your ceiling and your floor. Pro players are defined not by
                    their best shots, but by their high minimum performance.
                </p>
            </div>
        </div>
    );
}
