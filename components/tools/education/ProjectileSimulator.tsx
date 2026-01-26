'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RotateCcw, Target, MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function ProjectileSimulator() {
    const [velocity, setVelocity] = useState([50]); // m/s
    const [angle, setAngle] = useState([45]); // degrees
    const [gravity, setGravity] = useState([9.8]); // m/s^2
    const [isSimulating, setIsSimulating] = useState(false);
    const [path, setPath] = useState<{ x: number, y: number }[]>([]);
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
    const timerRef = useRef<any>(null);

    const reset = () => {
        setIsSimulating(false);
        setPath([]);
        setCurrentPos({ x: 0, y: 0 });
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const runSimulation = () => {
        reset();
        setIsSimulating(true);
        let t = 0;
        const dt = 0.05;
        const v0 = velocity[0];
        const a = (angle[0] * Math.PI) / 180;
        const g = gravity[0];

        const vx = v0 * Math.cos(a);
        const vy0 = v0 * Math.sin(a);

        const newPath: { x: number, y: number }[] = [];

        timerRef.current = setInterval(() => {
            t += dt;
            const x = vx * t;
            const y = vy0 * t - 0.5 * g * t * t;

            if (y < 0) {
                clearInterval(timerRef.current);
                setIsSimulating(false);
                return;
            }

            setCurrentPos({ x, y });
            newPath.push({ x, y });
            setPath([...newPath]);
        }, 20);
    };

    const stats = {
        maxHeight: (Math.pow(velocity[0] * Math.sin((angle[0] * Math.PI) / 180), 2) / (2 * gravity[0])).toFixed(2),
        range: ((Math.pow(velocity[0], 2) * Math.sin((2 * angle[0] * Math.PI) / 180)) / gravity[0]).toFixed(2),
        timeOfFlight: ((2 * velocity[0] * Math.sin((angle[0] * Math.PI) / 180)) / gravity[0]).toFixed(2),
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Projectile Simulator</CardTitle>
                <p className="text-muted-foreground mt-2">Visually analyze 2D motion with real-time kinematic derivations and trajectory mapping.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Controls Panel */}
                    <div className="w-full lg:w-80 space-y-8 animate-in slide-in-from-left-4">
                        <div className="space-y-6 bg-muted/20 p-8 rounded-[3rem] border border-primary/5 shadow-inner">
                            <SimControl label="Initial Velocity" value={velocity[0]} unit="m/s" min={1} max={100} onValueChange={setVelocity} />
                            <SimControl label="Launch Angle" value={angle[0]} unit="Â°" min={0} max={90} onValueChange={setAngle} />
                            <SimControl label="Gravity" value={gravity[0]} unit="m/sÂ²" min={1} max={25} step={0.1} onValueChange={setGravity} />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <Button onClick={runSimulation} disabled={isSimulating} className="h-16 rounded-2xl bg-primary shadow-xl shadow-primary/20 font-black text-lg">
                                <Play className="mr-2" /> LAUNCH PROJECTILE
                            </Button>
                            <Button variant="outline" onClick={reset} className="h-16 rounded-2xl border-primary/10 font-black">
                                <RotateCcw className="mr-2" /> RESET STAGE
                            </Button>
                        </div>
                    </div>

                    {/* Simulation Stage */}
                    <div className="flex-1 space-y-8">
                        <div className="relative h-[500px] w-full bg-slate-950 rounded-[4rem] border-4 border-primary/20 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />

                            {/* Static Grid */}
                            <svg className="absolute inset-0 w-full h-full opacity-10">
                                <defs>
                                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>

                            {/* Trajectory */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
                                <path
                                    d={`M 50,450 ${path.map(p => `L ${50 + p.x * 2},${450 - p.y * 2}`).join(' ')}`}
                                    fill="none"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                                />

                                {/* Current Projectile */}
                                {isSimulating && (
                                    <circle
                                        cx={50 + currentPos.x * 2}
                                        cy={450 - currentPos.y * 2}
                                        r="8"
                                        fill="white"
                                        className="shadow-xl"
                                    >
                                        <animate attributeName="r" values="8;10;8" dur="0.5s" repeatCount="indefinite" />
                                    </circle>
                                )}

                                <line x1="0" y1="450" x2="1000" y2="450" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
                            </svg>

                            <div className="absolute bottom-8 left-12 flex items-center gap-4">
                                <div className="px-4 py-2 rounded-xl bg-primary/20 backdrop-blur-md border border-primary/20 text-white text-[10px] font-black uppercase tracking-widest">
                                    X: {currentPos.x.toFixed(1)}m | Y: {currentPos.y.toFixed(1)}m
                                </div>
                            </div>
                        </div>

                        {/* Stats Readout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatBox label="Max Altitude" value={stats.maxHeight} unit="m" />
                            <StatBox label="Total Range" value={stats.range} unit="m" />
                            <StatBox label="Time of Flight" value={stats.timeOfFlight} unit="s" />
                        </div>
                    </div>
                </div>

                <div className="p-10 rounded-[4rem] bg-muted/10 border border-primary/5 flex items-start gap-6">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                        <MoveUpRight className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-black text-primary uppercase text-[10px] tracking-widest mb-2">Kinematic Context</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                            Vertical motion is independent of horizontal motion. In this simulator, horizontal velocity ($v_x$) remains constant while vertical velocity ($v_y$) is governed by the acceleration of gravity ($g$).
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function SimControl({ label, value, unit, min, max, step = 1, onValueChange }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-black uppercase text-primary/40 tracking-widest">{label}</span>
                <span className="text-lg font-black text-primary">{value}{unit}</span>
            </div>
            <Slider value={[value]} onValueChange={onValueChange} min={min} max={max} step={step} className="py-2" />
        </div>
    );
}

function StatBox({ label, value, unit }: any) {
    return (
        <div className="p-8 rounded-[2.5rem] bg-background border border-primary/5 shadow-xl flex flex-col items-center gap-1 hover:border-primary/20 transition-all group">
            <span className="text-[8px] font-black uppercase text-primary/40 tracking-widest">{label}</span>
            <h4 className="text-4xl font-black text-primary group-hover:scale-110 transition-transform">{value}<span className="text-sm ml-1 opacity-40 font-bold">{unit}</span></h4>
        </div>
    );
}
