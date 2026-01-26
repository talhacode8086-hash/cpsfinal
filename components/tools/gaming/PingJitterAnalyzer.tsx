'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Signal, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function PingJitterAnalyzer() {
    const [pings, setPings] = useState<any[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [stats, setStats] = useState({ avg: 0, jitter: 0, min: 0, max: 0 });
    const timerRef = useRef<any>(null);

    const runPing = async () => {
        const start = performance.now();
        try {
            // Use a small public file or just a fetch to test latency
            await fetch('/favicon.ico', { cache: 'no-store' });
            const end = performance.now();
            const latency = Math.round(end - start);

            setPings(prev => {
                const next = [...prev, { time: prev.length, ms: latency }].slice(-30);
                updateStats(next);
                return next;
            });
        } catch (e) {
            console.error(e);
        }
    };

    const updateStats = (data: any[]) => {
        if (data.length < 2) return;
        const msArr = data.map(d => d.ms);
        const avg = msArr.reduce((a, b) => a + b, 0) / msArr.length;

        // Jitter calculation (average difference between consecutive pings)
        let totalDiff = 0;
        for (let i = 1; i < msArr.length; i++) {
            totalDiff += Math.abs(msArr[i] - msArr[i - 1]);
        }
        const jitter = totalDiff / (msArr.length - 1);

        setStats({
            avg: Math.round(avg),
            jitter: parseFloat(jitter.toFixed(1)),
            min: Math.min(...msArr),
            max: Math.max(...msArr)
        });
    };

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(runPing, 500);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isRunning]);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Network Jitter Analyzer</CardTitle>
                <p className="text-muted-foreground mt-2">Measure your browser-to-server latency consistency.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatBox label="Avg Ping" value={`${stats.avg}ms`} icon={<Signal className="h-4 w-4" />} />
                    <StatBox
                        label="Jitter"
                        value={`${stats.jitter}ms`}
                        icon={<Activity className="h-4 w-4" />}
                        alarm={stats.jitter > 10}
                    />
                    <StatBox label="Min Ping" value={`${stats.min}ms`} />
                    <StatBox label="Max Ping" value={`${stats.max}ms`} />
                </div>

                <div className="h-[300px] w-full bg-muted/20 rounded-3xl p-6 border border-primary/5">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={pings}>
                            <XAxis dataKey="time" hide />
                            <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--primary)/0.1)' }}
                                itemStyle={{ color: 'hsl(var(--primary))' }}
                                labelStyle={{ display: 'none' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="ms"
                                stroke="hsl(var(--primary))"
                                strokeWidth={4}
                                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                                animationDuration={300}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <Button
                        size="lg"
                        className={`w-full max-w-sm h-16 rounded-2xl text-xl font-bold transition-all ${isRunning ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary shadow-xl shadow-primary/20'}`}
                        onClick={() => setIsRunning(!isRunning)}
                    >
                        {isRunning ? (
                            <><Zap className="mr-2 h-6 w-6 animate-pulse" /> Stop Test</>
                        ) : (
                            'Start Stability Test'
                        )}
                    </Button>

                    <div className="flex gap-8 text-sm">
                        <StatusIndicator label="Stable" color="text-green-500" icon={<CheckCircle2 />} active={stats.jitter <= 5 && isFound(pings)} />
                        <StatusIndicator label="Variable" color="text-amber-500" icon={<AlertTriangle />} active={stats.jitter > 5 && stats.jitter <= 15} />
                        <StatusIndicator label="Unstable" color="text-red-500" icon={<Activity />} active={stats.jitter > 15} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

const isFound = (arr: any[]) => arr.length > 5;

function StatBox({ label, value, icon, alarm }: any) {
    return (
        <div className={`p-6 rounded-2xl border transition-all ${alarm ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-muted/30 border-primary/5'}`}>
            <div className="flex items-center gap-2 mb-1 opacity-70">
                {icon}
                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <div className="text-2xl font-black">{value}</div>
        </div>
    );
}

function StatusIndicator({ label, color, icon, active }: any) {
    return (
        <div className={`flex items-center gap-2 transition-opacity ${active ? 'opacity-100' : 'opacity-20'}`}>
            <span className={color}>{icon}</span>
            <span className="font-bold">{label}</span>
        </div>
    );
}
