'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function MouseGlideTest() {
    const [isTesting, setIsTesting] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [stats, setStats] = useState({ consistency: 0, maxSpeed: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const lastTime = useRef(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isTesting) return;

        const now = performance.now();
        const dt = now - lastTime.current;
        if (dt < 10) return; // Sample at ~100Hz

        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = (dist / dt) * 1000; // pixels per second

        setData(prev => {
            const next = [...prev, { time: Math.round(now), speed }].slice(-100);
            calculateStats(next);
            return next;
        });

        lastPos.current = { x: e.clientX, y: e.clientY };
        lastTime.current = now;
    };

    const calculateStats = (points: any[]) => {
        if (points.length < 10) return;
        const speeds = points.map(p => p.speed);
        const max = Math.max(...speeds);

        // Calculate coefficient of variation as consistency metric
        const avg = speeds.reduce((a, b) => a + b, 0) / speeds.length;
        const variance = speeds.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / speeds.length;
        const stdDev = Math.sqrt(variance);
        const consistency = Math.max(0, 100 - (stdDev / (avg || 1) * 100));

        setStats({ consistency: Math.round(consistency), maxSpeed: Math.round(max) });
    };

    const toggleTest = () => {
        if (!isTesting) {
            setData([]);
            setStats({ consistency: 0, maxSpeed: 0 });
        }
        setIsTesting(!isTesting);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Mouse Glide Test</CardTitle>
                <p className="text-muted-foreground mt-2">Measure the smoothness and consistency of your mouse surface movement.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Consistency Score</p>
                        <p className="text-5xl font-black">{stats.consistency}%</p>
                        <p className="text-[10px] text-muted-foreground mt-2">Target: 90%+ for smooth aim</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Peak Glide Speed</p>
                        <p className="text-5xl font-black">{stats.maxSpeed}</p>
                        <p className="text-[10px] text-muted-foreground mt-2">Pixels per second</p>
                    </div>
                </div>

                <div
                    className={`relative h-64 rounded-3xl border-2 border-dashed transition-all duration-300 flex items-center justify-center ${isTesting ? 'bg-primary/5 border-primary/40' : 'bg-muted/10 border-primary/10'
                        }`}
                    onMouseMove={handleMouseMove}
                >
                    {!isTesting ? (
                        <div className="text-center">
                            <Button size="lg" className="rounded-2xl h-14 px-10 font-bold" onClick={toggleTest}>
                                Start Glide Test
                            </Button>
                            <p className="text-xs text-muted-foreground mt-4 italic">You will need to move your mouse in smooth, rapid circles.</p>
                        </div>
                    ) : (
                        <div className="absolute inset-0 pointer-events-none">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <YAxis hide domain={[0, 'auto']} />
                                    <Line
                                        type="monotone"
                                        dataKey="speed"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={3}
                                        dot={false}
                                        animationDuration={0}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="absolute top-4 right-4 animate-pulse flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full" />
                                <span className="text-[10px] font-bold text-red-500 uppercase">Recording...</span>
                            </div>
                            <Button
                                variant="outline"
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto rounded-xl"
                                onClick={toggleTest}
                            >
                                Stop and Analyze
                            </Button>
                        </div>
                    )}
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4 items-start">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-sm">
                        <p className="font-bold text-primary mb-1">How to test:</p>
                        <p className="text-muted-foreground italic">Click start and move your mouse in continuous, fluid circles or "Figure 8" motions. A jagged line or low consistency score indicates friction issues, worn-out mouse feet (PTFE), or a dirty mousepad.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
