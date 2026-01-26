'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, AlertTriangle, CheckCircle2, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function KeyboardDebounceTester() {
    const [events, setEvents] = useState<any[]>([]);
    const [badKeys, setBadKeys] = useState<Record<string, number>>({});
    const lastPress = useRef<Record<string, number>>({});

    const handleKeyDown = (e: KeyboardEvent) => {
        const now = performance.now();
        const prev = lastPress.current[e.key] || 0;
        const diff = now - prev;

        if (diff > 0 && diff < 30) {
            setBadKeys(prevBad => ({
                ...prevBad,
                [e.key]: (prevBad[e.key] || 0) + 1
            }));
            setEvents(prevEv => [{ key: e.key, diff: Math.round(diff), time: new Date().toLocaleTimeString() }, ...prevEv].slice(0, 10));
            toast.error(`Chatter detected on key: ${e.key} (${Math.round(diff)}ms)`);
        }

        lastPress.current[e.key] = now;
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const clear = () => {
        setEvents([]);
        setBadKeys({});
        lastPress.current = {};
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Keyboard Debounce Test</CardTitle>
                <p className="text-muted-foreground mt-2">Detect "key chatter" or double-typing issues in your mechanical switches.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="bg-muted/10 p-12 rounded-[3rem] border-2 border-dashed border-primary/10 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-6 rounded-3xl bg-primary/10">
                        <h3 className="text-3xl font-black uppercase">Start Typing Fast...</h3>
                    </div>
                    <p className="text-muted-foreground max-w-md">Our algorithm monitors your press intervals at sub-millisecond precision to identify mechanical bounce.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-destructive" /> Suspect Keys
                            </h4>
                            <Button variant="ghost" size="sm" onClick={clear}>Reset Data</Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(badKeys).map(([key, count]) => (
                                <div key={key} className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex justify-between items-center">
                                    <span className="font-black text-2xl uppercase">{key}</span>
                                    <span className="bg-destructive text-white text-[10px] px-2 py-1 rounded-full font-bold">{count} CHATTERS</span>
                                </div>
                            ))}
                            {Object.keys(badKeys).length === 0 && (
                                <div className="col-span-2 p-8 rounded-2xl bg-green-500/5 border border-green-500/10 text-center">
                                    <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                    <p className="text-sm font-bold text-green-600">No issues detected yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold flex items-center gap-2">
                            <History className="h-4 w-4 text-primary" /> Chatter Log
                        </h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                            {events.map((ev, i) => (
                                <div key={i} className="flex justify-between p-3 rounded-xl bg-muted/40 text-xs border border-primary/5">
                                    <span className="font-bold">Key "{ev.key}" double-tapped</span>
                                    <span className="text-destructive font-black">{ev.diff}ms</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
