'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Activity, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrackingTrainer() {
    const [isActive, setIsActive] = useState(false);
    const [score, setScore] = useState(0);
    const [isTracking, setIsTracking] = useState(false);
    const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
    const [velocity, setVelocity] = useState({ x: 0.5, y: 0.3 });
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(null);

    function update() {
        setTargetPos(prev => {
            let nextX = prev.x + velocity.x;
            let nextY = prev.y + velocity.y;
            let nextVelX = velocity.x;
            let nextVelY = velocity.y;

            if (nextX < 10 || nextX > 90) {
                nextVelX = -velocity.x * (1 + (Math.random() - 0.5) * 0.2);
                nextX = nextX < 10 ? 10 : 90;
            }
            if (nextY < 10 || nextY > 90) {
                nextVelY = -velocity.y * (1 + (Math.random() - 0.5) * 0.2);
                nextY = nextY < 10 ? 10 : 90;
            }

            // Occasional random direction change
            if (Math.random() < 0.02) {
                nextVelX += (Math.random() - 0.5) * 0.5;
                nextVelY += (Math.random() - 0.5) * 0.5;
            }

            // Cap velocity
            nextVelX = Math.max(Math.min(nextVelX, 1.5), -1.5);
            nextVelY = Math.max(Math.min(nextVelY, 1.5), -1.5);

            setVelocity({ x: nextVelX, y: nextVelY });
            return { x: nextX, y: nextY };
        });

        if (isTracking) {
            setScore(s => s + 1);
        }

        requestRef.current = requestAnimationFrame(update);
    }

    useEffect(() => {
        if (isActive) {
            requestRef.current = requestAnimationFrame(() => update());
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isActive, update]);

    const startGame = () => {
        setScore(0);
        setIsActive(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">Tracking Precision</h2>
                        <p className="text-xs text-muted-foreground">Keep your cursor on the target</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-muted rounded-xl text-center">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Score</div>
                        <div className="text-xl font-black">{Math.floor(score / 6)}</div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-center transition-colors ${isTracking ? 'bg-orange-500/20 text-orange-600' : 'bg-muted text-muted-foreground'}`}>
                        <div className="text-[10px] uppercase font-bold">Tracking</div>
                        <div className="text-xl font-black">{isTracking ? 'YES' : 'NO'}</div>
                    </div>
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative h-[500px] bg-zinc-950 rounded-[2.5rem] border-[12px] border-zinc-900 overflow-hidden cursor-crosshair shadow-inner"
            >
                {!isActive ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-30">
                        <Button
                            size="lg"
                            onClick={startGame}
                            className="h-16 px-12 rounded-full text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105"
                        >
                            START TRACKING
                        </Button>
                    </div>
                ) : (
                    <motion.div
                        className={`absolute h-12 w-12 -ml-6 -mt-6 rounded-full flex items-center justify-center transition-shadow ${isTracking ? 'ring-8 ring-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.6)]' : ''}`}
                        style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
                        onMouseEnter={() => setIsTracking(true)}
                        onMouseLeave={() => setIsTracking(false)}
                    >
                        <div className={`w-full h-full rounded-full border-2 ${isTracking ? 'bg-primary border-white' : 'bg-transparent border-primary'} flex items-center justify-center transition-colors`}>
                            <Target className={`h-6 w-6 ${isTracking ? 'text-white' : 'text-primary'}`} />
                        </div>
                    </motion.div>
                )}

                <div className="absolute top-6 right-6 opacity-20 flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Flame key={i} className="h-4 w-4 text-orange-500" />)}
                </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl flex gap-4 items-start">
                <Target className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Tracking is the ability to follow a moving target smoothly. This tool uses a dynamic physics model to simulate unpredictable enemy movements. Keep your score multiplier active by staying on target!
                </p>
            </div>
        </div>
    );
}
