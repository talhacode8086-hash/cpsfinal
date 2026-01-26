'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';

export default function MouseSensorJitterTest() {
    const [isTesting, setIsTesting] = useState(false);
    const [points, setPoints] = useState<any[]>([]);
    const [jitterScore, setJitterScore] = useState(0);
    const lastPos = useRef({ x: 0, y: 0 });
    const samples = useRef<any[]>([]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isTesting) return;

        const dx = e.movementX;
        const dy = e.movementY;

        // Jitter is often characterized by small, random micro-movements
        // even when moving in a straight-ish line.
        samples.current.push({ x: dx, y: dy });

        if (samples.current.length > 50) {
            analyzeJitter();
            setPoints([...samples.current]);
            samples.current = [];
        }
    };

    const analyzeJitter = () => {
        const s = samples.current;
        if (s.length < 10) return;

        // Calculate variance in micro-movements
        let totalJitter = 0;
        for (let i = 1; i < s.length; i++) {
            const angle1 = Math.atan2(s[i - 1].y, s[i - 1].x);
            const angle2 = Math.atan2(s[i].y, s[i].x);
            totalJitter += Math.abs(angle1 - angle2);
        }

        const avgJitter = (totalJitter / s.length) * 100;
        setJitterScore(Math.min(100, Math.round(avgJitter)));
    };

    const toggleTest = () => {
        if (!isTesting) {
            setPoints([]);
            setJitterScore(0);
            samples.current = [];
        }
        setIsTesting(!isTesting);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Sensor Jitter & Skip Test</CardTitle>
                <p className="text-muted-foreground mt-2">Detect micro-stuttering or sensor malfunctions at high DPI levels.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-8 rounded-[2rem] border-2 transition-all text-center ${jitterScore > 20 ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-green-500/10 border-green-500/20 text-green-500'
                        }`}>
                        <p className="text-xs font-black uppercase tracking-widest opacity-70">Jitter Index</p>
                        <p className="text-6xl font-black">{jitterScore}</p>
                        <p className="text-[10px] mt-2 font-bold">{jitterScore > 20 ? 'DETECTED' : 'CLEAN SENSOR'}</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-muted/30 border border-primary/5 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center gap-2 mb-2">
                            {jitterScore > 20 ? <AlertTriangle className="h-5 w-5 text-destructive" /> : <CheckCircle2 className="h-5 w-5 text-green-500" />}
                            <span className="font-bold uppercase tracking-tighter">Sensor Health</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {jitterScore > 20
                                ? 'Sensor shows signs of jitter. Clean your mousepad or lower DPi settings.'
                                : 'Motion is fluid and consistent. Your sensor is performing at spec.'}
                        </p>
                    </div>
                </div>

                <div
                    className={`relative h-[400px] rounded-[3rem] border-4 flex items-center justify-center overflow-hidden transition-all duration-300 ${isTesting ? 'bg-background/80 border-primary/40' : 'bg-muted/10 border-primary/10'
                        }`}
                    onMouseMove={handleMouseMove}
                >
                    {!isTesting ? (
                        <div className="text-center">
                            <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-bold" onClick={toggleTest}>
                                Start Analysis
                            </Button>
                            <p className="text-xs text-muted-foreground mt-4 italic">Move your mouse in straight lines across the pad.</p>
                        </div>
                    ) : (
                        <div className="absolute inset-0 pointer-events-none">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart>
                                    <XAxis type="number" dataKey="x" hide domain={[-50, 50]} />
                                    <YAxis type="number" dataKey="y" hide domain={[-50, 50]} />
                                    <ZAxis type="number" range={[20, 20]} />
                                    <Scatter data={points} fill="hsl(var(--primary))" />
                                </ScatterChart>
                            </ResponsiveContainer>
                            <Button
                                variant="destructive"
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto rounded-xl"
                                onClick={toggleTest}
                            >
                                Stop Test
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
