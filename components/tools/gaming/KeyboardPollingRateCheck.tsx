'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';

export default function KeyboardPollingRateCheck() {
    const [rate, setRate] = useState(0);
    const [isTesting, setIsTesting] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const lastTime = useRef(0);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isTesting) return;
        const now = performance.now();
        if (lastTime.current > 0) {
            const dt = now - lastTime.current;
            const hz = Math.round(1000 / dt);
            setRate(hz);
            setData(prev => [...prev, { val: hz }].slice(-30));
        }
        lastTime.current = now;
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isTesting]);

    const toggleTest = () => {
        if (!isTesting) {
            setRate(0);
            setData([]);
            lastTime.current = 0;
        }
        setIsTesting(!isTesting);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Keyboard Polling Rate Checker</CardTitle>
                <p className="text-muted-foreground mt-2">Measure the reporting frequency of your keyboard to ensure low latency.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-10 rounded-[2.5rem] bg-primary/10 border border-primary/10 text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Measured Frequency</p>
                        <p className="text-8xl font-black">{rate}<span className="text-xl">Hz</span></p>
                    </div>
                    <div className="flex flex-col justify-center gap-4">
                        <PollingBox label="Standard Office" value="125Hz" />
                        <PollingBox label="Gaming Grade" value="1000Hz" primary />
                        <PollingBox label="Ultra-Responsive" value="8000Hz" />
                    </div>
                </div>

                <div className="h-48 w-full bg-muted/10 rounded-3xl p-6 border border-primary/5">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <Area type="monotone" dataKey="val" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.1)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className={`p-16 rounded-[3rem] border-4 transition-all duration-300 flex flex-col items-center justify-center text-center ${isTesting ? 'bg-primary/5 border-primary/40' : 'bg-muted/10 border-primary/5'
                    }`}>
                    {!isTesting ? (
                        <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-bold" onClick={toggleTest}>Start Polling Test</Button>
                    ) : (
                        <div className="animate-in zoom-in-50">
                            <h3 className="text-3xl font-black mb-4">MASH MULTIPLE KEYS!</h3>
                            <p className="text-muted-foreground">The more keys you press, the more data we collect to calculate accurate Hz.</p>
                            <Button variant="ghost" className="mt-6" onClick={toggleTest}>Stop Test</Button>
                        </div>
                    )}
                </div>

                <div className="p-6 rounded-2xl bg-muted/20 flex gap-4">
                    <Info className="h-6 w-6 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Note:</b> We measure the interval between raw `keydown` events. For precise 1000Hz+ readings, browsers often require high-performance system settings.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function PollingBox({ label, value, primary }: any) {
    return (
        <div className={`flex justify-between items-center p-4 rounded-xl border ${primary ? 'bg-primary/20 border-primary/30' : 'bg-background/40 border-primary/5'}`}>
            <span className="text-xs font-bold text-muted-foreground">{label}</span>
            <span className="font-black text-primary">{value}</span>
        </div>
    );
}
