'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mouse, ArrowDown, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';

export default function ScrollSpeedTester() {
    const [isTesting, setIsTesting] = useState(false);
    const [scrolls, setScrolls] = useState<any[]>([]);
    const [stats, setStats] = useState({ peak: 0, current: 0 });
    const timerRef = useRef<any>(null);
    const scrollAcc = useRef(0);

    const handleScroll = (e: React.WheelEvent) => {
        if (!isTesting) return;
        scrollAcc.current += Math.abs(e.deltaY);
    };

    useEffect(() => {
        if (isTesting) {
            timerRef.current = setInterval(() => {
                const currentSpeed = Math.round(scrollAcc.current * 10); // pixels/sec
                setScrolls(prev => [...prev, { val: currentSpeed }].slice(-20));
                setStats(prev => ({
                    peak: Math.max(prev.peak, currentSpeed),
                    current: currentSpeed
                }));
                scrollAcc.current = 0;
            }, 100);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isTesting]);

    const toggleTest = () => {
        if (!isTesting) {
            setScrolls([]);
            setStats({ peak: 0, current: 0 });
            scrollAcc.current = 0;
        }
        setIsTesting(!isTesting);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Mouse className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Scroll Speed Tester</CardTitle>
                <p className="text-muted-foreground mt-2">Measure your scroll wheel velocity in pixels per second.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/10 text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Peak Scroll Velocity</p>
                        <p className="text-7xl font-black">{stats.peak}</p>
                        <p className="text-[10px] text-muted-foreground mt-2">Pixels per second</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-muted/30 border border-primary/5 text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Current Speed</p>
                        <p className="text-7xl font-black">{stats.current}</p>
                        <p className="text-[10px] text-muted-foreground mt-2">Real-time sampling</p>
                    </div>
                </div>

                <div
                    className={`relative w-full h-[400px] rounded-[3rem] border-4 transition-all duration-300 flex flex-col items-center justify-center cursor-ns-resize overflow-hidden ${isTesting ? 'bg-primary/5 border-primary/40' : 'bg-muted/10 border-primary/5'
                        }`}
                    onWheel={handleScroll}
                >
                    {!isTesting ? (
                        <div className="text-center z-10">
                            <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-black shadow-xl shadow-primary/20" onClick={toggleTest}>
                                Start Scroll Test
                            </Button>
                            <p className="text-muted-foreground mt-6 italic">Once started, scroll as fast as you can inside this box.</p>
                        </div>
                    ) : (
                        <div className="absolute inset-0 p-8 flex flex-col">
                            <div className="flex-1">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={scrolls}>
                                        <Bar dataKey="val">
                                            {scrolls.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={`rgba(var(--primary-rgb), ${0.3 + (index / 20) * 0.7})`} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Button variant="destructive" className="rounded-xl h-12 px-8 font-bold" onClick={toggleTest}>
                                    Finish & Save
                                </Button>
                            </div>
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-20 transition-all">
                                <ArrowDown className="h-48 w-48 text-primary animate-bounce" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-muted/20 p-6 rounded-2xl border border-primary/5 space-y-3">
                    <h4 className="font-bold flex items-center gap-2 text-primary">
                        <BarChart3 className="h-4 w-4" /> Why measure scroll speed?
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Competitive gamers use scroll speed for bunny-hopping (Minecraft/CS) and rapid weapon switching.
                        Digital creators and developers benefit from high scroll precision for navigating long documents and timelines.
                        A high speed with consistent reporting indicates a quality encoder in your mouse.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
